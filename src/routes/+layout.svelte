<script>
	import './styles.css';
	import Navbar from '$lib/components/navbar.svelte'
	import axios from 'axios';

	axios.defaults.baseURL = 'http://localhost:8000/api/';
	axios.defaults.withCredentials = true;
</script>

<Navbar />
<slot />

<style>

</style>
