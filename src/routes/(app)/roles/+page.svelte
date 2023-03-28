<script>
	import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
	import axios from 'axios';

	let roles = [{id: 0, name:''}];

	onMount(async () => {
		await getRoles();
	});

	async function getRoles() {
		try {
			const { data } = await axios.get(`roles`, {withCredentials: true});

			roles = data;
		}
		catch {
			await goto('/login');
		}
	}

	/**
     * @param {number} id
     */
	async function deleteRole(id) {
		if (confirm('Are you sure you want to delete this record?')) {
			await axios.delete(`roles/${id}`, {withCredentials: true});
			await getRoles();
		}
	}
</script>

<div class="pt-3 pb-2 mb-3 border-bottom">
	<a href="/roles/create" class="btn btn-sm btn-outline-secondary">Add</a>
</div>

<div class="table-responsive">
	<table class="table table-striped table-sm">
	  <thead>
		<tr>
		  <th scope="col">Id</th>
		  <th scope="col">Name</th>
		  <th scope="col">Action</th>
		</tr>
	  </thead>
	  <tbody>
		{#each roles as role}
		<tr>
		  <td>{role.id}</td>
		  <td>{role.name}</td>
		  <td>
			<div class="btn-group mr-2">
			  <a href={"/roles/" + role.id + "/edit"} class="btn btn-sm btn-outline-secondary">Edit</a>
			  <a href={"#"} on:click={() => deleteRole(role.id)} class="btn btn-sm btn-outline-secondary">Delete</a>
			</div>
		  </td>
		</tr>
		{/each}
	  </tbody>
	</table>
</div>
