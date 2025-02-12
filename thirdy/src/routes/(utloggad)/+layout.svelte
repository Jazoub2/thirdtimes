<script lang="ts">
	import '../../app.postcss';
</script>
<nav>
	<button class="btn"><a href="/register"><em>Register</em></a></button>
	<button class="btn"><a href="/login"><em>Sign in</em></a></button>
	<button class="btn"><a href="/help"><em>Help</em></a></button>
</nav>
<slot />

<style>
	nav{
		display: flex;
		place-items: center;
		place-content: center;
		background-color: rgba(255, 255, 255, 0.1)
	}
</style>