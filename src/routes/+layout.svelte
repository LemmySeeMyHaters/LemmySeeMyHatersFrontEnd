<main>
	<div class="navbar">
		<div style="flex-grow: 1;">
			<img src="/favicon.png" alt="Logo" />
			<div class="navbar-text">Lemmy See My Haters</div>
		</div>
		<a class="github-link" href="https://github.com/LemmySeeMyHaters"
			><img src="/github-mark-white.svg" alt="GitHub Logo" class="github-img" />
			LemmySeeMyHaters Github
		</a>
	</div>
	<slot />
</main>

<style>
	.navbar {
		background-color: black;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px;
		border-radius: 10px;
	}

	.navbar img {
		float: left;
		margin-right: 10px;
		margin-left: 10px;
		height: 2rem;
		border-radius: 40%;
	}

	.navbar .navbar-text {
		color: white;
		font-size: 18px;
		font-weight: bold;
		line-height: 2rem;
	}

	.github-img {
		width: 30px;
		height: auto;
		object-fit: contain;
	}

	.github-link {
		display: flex;
		align-items: center;
		color: white;
		text-decoration: none;
		font-weight: bold;
	}

	@media (max-width: 540px) {
		.github-link {
			display: none;
		}
	}

	.github-link:hover {
		background-color: rgba(211, 211, 211, 0.5);
		border-radius: 10px;
	}
</style>
