<script lang="ts">
	import '../../app.postcss';
    export let data;
</script>
<nav>
    <p>Welcome {data.user?.email} </p>
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