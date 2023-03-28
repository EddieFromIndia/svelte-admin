<script lang="ts">

    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import axios from 'axios';
    import { Product } from '../../../../../models/Product';
    import { page } from '$app/stores';

    let product = new Product();

    onMount(async () => {
        const { data } = await axios.get(`products/${$page.params.id}`);
        product = data;
    });

    const upload = async (e: Event) => {
        if (e.target === null) return;

        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('image', file);

        const {data} = await axios.post('upload', formData);

        product.image = data.url;
    }

    async function submit() {
        let newProduct = product;

        await axios.put(`products/${$page.params.id}`, newProduct);

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
        <div class="input-group">
            <input bind:value={product.image} class="form-control" name="image">
            <label class="btn btn-primary">Upload
                <input type="file" hidden on:change={e => upload(e)}>
            </label>
        </div>
    </div>
    <div class="mb-3">
        <label for="price">Price</label>
        <input bind:value={product.price} type="number" class="form-control" name="price">
    </div>

    <button class="btn btn-outline-secondary" type="submit">Update</button>
</form>