<script>
	import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
	import axios from 'axios';
    import Paginator from '$lib/components/paginator.svelte';

	let page = 1;
	let lastPage = 1;
	let users = [{id: 0, first_name:'', last_name:'', email:'', role:{id: 0, name: ''}}];

	onMount(async () => {
		await getUsers();
	});

	async function previous() {
		if (page === 1) {
			return;
		}

		page--;
		await getUsers();
	}

	async function next() {
		if (page === lastPage) {
			return;
		}

		page++;
		await getUsers();
	}

	async function getUsers() {
		try {
			const { data } = await axios.get(`users?page=${page}`);

			users = data.data;
			lastPage = data.meta.last_page;
		}
		catch {
			await goto('/login');
		}
	}

	/**
     * @param {number} id
     */
	async function deleteUser(id) {
		if (confirm('Are you sure you want to delete this record?')) {
			await axios.delete(`users/${id}`);
			await getUsers();
		}
	}
</script>

<div class="pt-3 pb-2 mb-3 border-bottom">
	<a href="/users/create" class="btn btn-sm btn-outline-secondary">Add</a>
</div>

<div class="table-responsive">
	<table class="table table-striped table-sm">
	  <thead>
		<tr>
		  <th scope="col">Id</th>
		  <th scope="col">Name</th>
		  <th scope="col">Email</th>
		  <th scope="col">Role</th>
		  <th scope="col">Action</th>
		</tr>
	  </thead>
	  <tbody>
		{#each users as user}
		<tr>
		  <td>{user.id}</td>
		  <td>{user.first_name} {user.last_name}</td>
		  <td>{user.email}</td>
		  <td>{user.role.name}</td>
		  <td>
			<div class="btn-group mr-2">
			  <a href={"/users/" + user.id + "/edit"} class="btn btn-sm btn-outline-secondary">Edit</a>
			  <a href={"#"} on:click={() => deleteUser(user.id)} class="btn btn-sm btn-outline-secondary">Delete</a>
			</div>
		  </td>
		</tr>
		{/each}
	  </tbody>
	</table>

	<Paginator {previous} {next} />
</div>
