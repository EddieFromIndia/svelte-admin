<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import axios from 'axios';
    import { Product } from '../../../models/Product';

    let product = new Product();

    onMount(async () => {
        const { data } = await axios.get('http://localhost:8000/api/products', { withCredentials: true });
        product = data;
    });

    async function submit() {
        let newProduct = product;

        await axios.post('http://localhost:8000/api/products', newProduct, { withCredentials: true });

        await goto('/products');
    }
</script>

<h3>Create User</h3>
<form on:submit|preventDefault={submit}>
    <div class="mb-3">
        <label for="title">Title</label>
        <input bind:value={product.title} class="form-control" name="title">
    </div>
    <div class="mb-3">
        <label for="description">Description</label>
        <textarea bind:value={product.description} class="form-control" name="description" />
    </div>
    <div class="mb-3">
        <label for="image">Image</label>
        <input bind:value={product.image} class="form-control" name="image">
    </div>
    <div class="mb-3">
        <label for="price">Price</label>
        <input bind:value={product.price} class="form-control" name="price">
    </div>

    <button class="btn btn-outline-secondary" type="submit">Create</button>
</form>