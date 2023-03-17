<script>
	import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
	import userStore from '../store'
	import axios from 'axios';

	onMount(async () => {
		try {
			const { data } = await axios.get('http://localhost:8000/api/user', {withCredentials: true});
    
			userStore.update(() => {
				return data;
			});

			await goto('/dashboard');
		}
		catch {
			await goto('/login');
		}
	});
</script>
