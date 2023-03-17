<script>
	import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
	import axios from 'axios';
	import Paginator from '$lib/components/paginator.svelte';

	let page = 1;
	let lastPage = 1;
	let products = [{ id: 0, title:'', description:'', image:'', price: 0 }];

	onMount(async () => {
		await getProducts();
	});

	async function previous() {
		if (page === 1) {
			return;
		}

		page--;
		await getProducts();
	}

	async function next() {
		if (page === lastPage) {
			return;
		}

		page++;
		await getProducts();
	}

	async function getProducts() {
		try {
			const { data } = await axios.get(`http://localhost:8000/api/products?page=${page}`, {withCredentials: true});

			products = data.data;
			lastPage = data.meta.last_page;
		}
		catch {
			await goto('/login');
		}
	}

	/**
     * @param {number} id
     */
	async function deleteProduct(id) {
		if (confirm('Are you sure you want to delete this record?')) {
			await axios.delete(`http://localhost:8000/api/products/${id}`, {withCredentials: true});
			await getProducts();
		}
	}
</script>

<div class="pt-3 pb-2 mb-3 border-bottom">
	<a href="/products/create" class="btn btn-sm btn-outline-secondary">Add</a>
</div>

<div class="table-responsive">
	<table class="table table-striped table-sm">
	  <thead>
		<tr>
		  <th scope="col">Id</th>
		  <th scope="col">Image</th>
		  <th scope="col">Title</th>
		  <th scope="col">Price</th>
		  <th scope="col">Action</th>
		</tr>
	  </thead>
	  <tbody>
		{#each products as product}
		<tr>
		  <td>{product.id}</td>
		  <td><img src={product.image} height="50" alt={product.title} /></td>
		  <td>{product.title}</td>
		  <td>${product.price}</td>
		  <td>
			<div class="btn-group mr-2">
			  <a href={"/products/" + product.id + "/edit"} class="btn btn-sm btn-outline-secondary">Edit</a>
			  <a href={"#"} on:click={() => deleteProduct(product.id)} class="btn btn-sm btn-outline-secondary">Delete</a>
			</div>
		  </td>
		</tr>
		{/each}
	  </tbody>
	</table>

	<Paginator {previous} {next} />
</div>
