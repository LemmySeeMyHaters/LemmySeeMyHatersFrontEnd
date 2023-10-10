<script lang="ts">
	import { goto } from '$app/navigation';
	import { lemmyVotesParam } from '$lib/models';
	import { browser } from '$app/environment';

	if (browser) {
		localStorage.clear();
	}

	let search_query = '';
	const search_action = () => {
		if (!search_query.startsWith('https://')) {
			alert("URL must start with 'https://'");
			search_query = '';
			return;
		}
		lemmyVotesParam.update((val) => {
			return { ...val, url: search_query };
		});
		goto('/search_result');
	};
</script>

<main>
	<div style="grid-area: topbar;" />

	<div style="grid-area: ads;" />

	<div style="grid-area: content;">
		<div class="search-widget">
			<h1 class="heading-style">Find Your Haters</h1>
			<p style="color: white; font-size: 20px;">
				Find out who has downvoted on your Comment/Submission.
				<br /><br />
				Enter the Activity Pub URL of your Lemmy Comment or Submission.
			</p>
			<form>
				<input
					type="text"
					class="url-input"
					placeholder="https://lemmykekw.xyz/post/1"
					bind:value={search_query}
				/>
				<button class="search-button" on:click|preventDefault={search_action}> Search</button>
			</form>
		</div>
	</div>

	<div style="grid-area: sidebar;" />

	<div style="grid-area: footer;" />
</main>

<style>
	main {
		display: grid;
		grid-template-areas:
			'ads content sidebar'
			'footer footer footer';
		grid-template-columns: 1fr 3fr 1fr;
		grid-template-rows: 75vh 100px;
		height: 100vh;
		justify-items: center;
		align-items: center;
	}

	.search-widget {
		text-align: center;
	}

	.heading-style {
		color: white;
		font-size: 3rem;
		margin: 0;
	}

	.url-input {
		width: 70%;
		height: 3rem;
		border-width: 1px;
		background-color: black;
		border-radius: 10px;
		text-indent: 10px;
		font-size: 18px;
		border-color: violet;
		color: white;
	}

	input::placeholder {
		color: rgb(112, 112, 112);
	}

	.search-button {
		height: 3rem;
		width: 15%;
		background-color: violet;
		border-color: violet;
		font-weight: bold;
		font-size: 18px;
		border-radius: 5px;
		margin-left: 1%;
	}
</style>
