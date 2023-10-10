<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { lemmyVotesParam } from '$lib/models';

	let lvp = {};
	lemmyVotesParam.subscribe((val) => (lvp = val));

	export let data;
	$: votesResponse = data.votesResponse;
	$: voteRatio = votesResponse.upvotes / (votesResponse.upvotes + votesResponse.downvotes);

	function formatUnixTimestamp(unixTimestamp: number): string {
		const date = new Date(unixTimestamp * 1000);
		return date.toLocaleString(undefined, { timeZoneName: 'short' });
	}

	let votesFilter = 'All';
	let sortBy = 'datetime_desc';
	let username = '';
	let page_no = 0;
	const searchClick = () => {
		lemmyVotesParam.update((val) => {
			return { ...val, votes_filter: votesFilter, sort_by: sortBy, username: undefined };
		});

		if (username !== '') {
			lemmyVotesParam.update((val) => {
				return { ...val, username: username, offset: '0'};
			});
		}
		invalidateAll();
	};

	const updateOffset = (e) => {
		let buttonText = e.target.textContent;
		if (buttonText === 'Next') {
			let nextOffsetValue = votesResponse.next_offset;
			if (nextOffsetValue === null) {
				return;
			}
			lemmyVotesParam.update((val) => {
				return { ...val, offset: nextOffsetValue!.toString() };
			});
			invalidateAll();
		} else if (buttonText === 'Previous') {
			let currOffset = parseInt(lvp.offset);
			let pageLimit = parseInt(lvp.limit);
			if (currOffset <= 0) {
				return;
			}

			lemmyVotesParam.update((val) => {
				return { ...val, offset: (currOffset - pageLimit).toString() };
			});
			invalidateAll();
		}
		console.log(lvp);
	};
</script>

<div class="results-div">
	<div class="filter-div">
		<div>
			<input
				type="text"
				id="username-filter"
				placeholder="Username (Optional)"
				bind:value={username}
			/>
		</div>
		<div>
			<label for="votes_filter">Votes Filter:</label>
			<select id="votes_filter" bind:value={votesFilter}>
				<option value="All">All</option>
				<option value="Upvotes">Upvotes</option>
				<option value="Downvotes">Downvotes</option>
			</select>
		</div>
		<div>
			<label for="sort_by">Sort by:</label>
			<select id="sort_by" bind:value={sortBy}>
				<option value="datetime_desc">DateTime Descending</option>
				<option value="datetime_asc">DateTime Ascending</option>
			</select>
		</div>
		<div>
			<button class="custom-btn" on:click={searchClick}>Apply</button>
		</div>
	</div>

	<div>
		<p style="font-weight: bold;">
			URL: <a href={lvp.url} style="color: white; text-decoration: none;">{lvp.url}</a> <br /><br />
			Upvotes: {votesResponse.upvotes}, Downvotes: {votesResponse.downvotes}, Upvote Percentage:
			{(voteRatio * 100).toFixed(2)}%
		</p>
	</div>

	{#each votesResponse.votes as vote}
		<div class="vote-card">
			{#if vote.score === 1}
				<div>
					<img src="/chad.png" alt="Logo" width="50" style="vertical-align: middle;" />
				</div>
			{:else}
				<div>
					<img src="/favicon.png" alt="Logo" width="50" style="vertical-align: middle;" />
				</div>
			{/if}
			<div style="flex-grow: 1; text-align: left;">
				<a href={vote.actor_id} target="_blank" style="color: white; text-decoration: none;"
					>{vote.name}</a
				>
			</div>
			<div style="font-size: 12px;">
				{formatUnixTimestamp(vote.created_utc)}
			</div>
		</div>
	{/each}

	<div>
		<p>
			Showing {parseInt(lvp.offset) + 1} to {votesResponse.next_offset === null
				? votesResponse.total_count
				: votesResponse.next_offset} of {votesResponse.total_count}
			Entries
		</p>
		<button class="custom-btn" on:click={updateOffset}>Previous</button>
		<button class="custom-btn" on:click={updateOffset}>Next</button>
	</div>
</div>

<style>
	#username-filter {
		background-color: black;
		border-radius: 10px;
		text-indent: 10px;
		border-color: violet;
		color: white;
		height: 2rem;
	}

	#votes_filter,
	#sort_by {
		background-color: black;
		border-radius: 10px;
		border-color: violet;
		color: white;
		height: 2rem;
	}

	.filter-div {
		/* background-color: rgba(211, 211, 211, 0.5); */
		display: flex;
		justify-content: right;
		align-items: center;
		flex-wrap: wrap;
		border-radius: 10px;
		color: white;
		gap: 15px;
	}

	.custom-btn {
		height: 2rem;
		background-color: violet;
		border-color: violet;
		border-radius: 5px;
		font-weight: bold;
	}

	.vote-card {
		background-color: black;
		width: 100%;
		border-radius: 15px;
		display: flex;
		flex-wrap: wrap;
		gap: 15px;
		padding: 15px;
		align-items: center;
	}

	.results-div {
		background-color: rgba(211, 211, 211, 0.5);
		width: 900px;
		margin: 20px auto;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		min-height: 15vh;
		color: white;
		flex-direction: column;
		gap: 15px;
		padding: 20px 30px 20px 30px;
	}

	@media (max-width: 1000px) {
		.results-div {
			width: 70%;
			max-width: none;
		}
	}
</style>
