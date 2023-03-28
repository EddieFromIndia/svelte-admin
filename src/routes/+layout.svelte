<script>
	import './styles.css';
	import Navbar from '$lib/components/navbar.svelte'
	import axios from 'axios';

	axios.defaults.baseURL = 'http://localhost:8000/api/';
</script>

<Navbar />
<slot />

<style>

</style>
