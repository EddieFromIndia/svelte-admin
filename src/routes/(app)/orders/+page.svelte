<script>
// @ts-nocheck

	import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
	import axios from 'axios';
	import Paginator from '$lib/components/paginator.svelte';

	let page = 1;
	let lastPage = 1;
	let orders = [{id: 0, name: '', email: '', total: 0, order_items: [{id: 0, product_title: '', quantity: 0, price: 0}]}];
    let selectedOrder = 0;

	onMount(async () => {
		await getOrders();
	});

	async function previous() {
		if (page === 1) {
			return;
		}

		page--;
		await getOrders();
	}

	async function next() {
		if (page === lastPage) {
			return;
		}

		page++;
		await getOrders();
	}

    async function exportCsv() {
        try {
			const res = await axios.post('export', {}, {withCredentials: true, responseType: 'blob'});
            const blob = new Blob([res.data], {type: 'text/csv'});
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = 'orders.csv';
            link.click();
		}
		catch {
			await goto('/login');
		}
    }

	async function getOrders() {
		try {
			const { data } = await axios.get(`orders?page=${page}`, {withCredentials: true});

			orders = data.data;
			lastPage = data.meta.last_page;
		}
		catch {
			await goto('/login');
		}
	}
</script>

<div class="pt-3 pb-2 mb-3 border-bottom">
	<a href={""} class="btn btn-sm btn-outline-secondary" on:click={exportCsv}>Export</a>
</div>

<div class="table-responsive">
	<table class="table table-sm">
	  <thead>
		<tr>
		  <th scope="col">Id</th>
		  <th scope="col">Name</th>
		  <th scope="col">Email</th>
		  <th scope="col">Total</th>
		  <th scope="col">Action</th>
		</tr>
	  </thead>
	  <tbody>
		{#each orders as order}
		<tr>
		  <td>{order.id}</td>
		  <td>{order.name}</td>
		  <td>{order.email}</td>
		  <td>{order.total}</td>
		  <td>
			<div class="btn-group mr-2">
			  <a href={""} class="btn btn-sm btn-outline-secondary" on:click={() => selectedOrder = selectedOrder === order.id ? 0 : order.id}>View</a>
			</div>
		  </td>
		</tr>
        <tr><!-- hidden={order.id !== selectedOrder}> -->
            <td colspan="5">
              <div class="overflow-hidden {order.id === selectedOrder ? 'showDiv' : 'hideDiv'}">
                <table class="table table-sm">
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Product Title</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                    </tr>
                    </thead>
                    <tbody>
                        {#each order.order_items as item}
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.product_title}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                        </tr>
                        {/each}
                    </tbody>
                </table>
              </div>
            </td>
        </tr>
		{/each}
	  </tbody>
	</table>

	<Paginator {previous} {next} />
</div>

<style>
    .showDiv {
        max-height: 150px;
        transition: max-height 0.5s ease-out;
    }

    .hideDiv {
        max-height: 0px;
        transition: max-height 0.5s ease-in;
    }
</style>
