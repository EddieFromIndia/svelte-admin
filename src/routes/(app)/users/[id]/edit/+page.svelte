<script>
    import { page } from '$app/stores'
    import { onMount, tick } from 'svelte';
    import { goto } from '$app/navigation';
    import axios from 'axios';

    /**
     * @type {any[]}
     */
    let roles = [];

    let first_name = '';
    let last_name = '';
    let email = '';
    let role_id = 0;

    onMount(async () => {
        const { data } = await axios.get('roles');
        roles = data;

        await getUser();
    });

    async function getUser() {
        const { data } = await axios.get(`users/${$page.params.id}`);

        first_name = data.first_name;
        last_name = data.last_name;
        email = data.email;
        role_id = data.role.id;
    }

    async function submit() {
        let user = {
            first_name,
            last_name,
            email,
            role_id
        };

        await axios.put(`users/${$page.params.id}`, user);

        await goto('/users');
    }
</script>

<h3>Edit User</h3>
<form on:submit|preventDefault={submit}>
    <div class="mb-3">
        <label for="first_name">First Name</label>
        <input bind:value={first_name} class="form-control" name="first_name">
    </div>
    <div class="mb-3">
        <label for="last_name">Last Name</label>
        <input bind:value={last_name} class="form-control" name="last_name">
    </div>
    <div class="mb-3">
        <label for="email">Email</label>
        <input bind:value={email} class="form-control" name="email">
    </div>

    <div class="mb-3">
        <label for="role_id">Role</label>
        <select bind:value={role_id} class="form-control" name="role_id">
            {#each roles as role}
            <option value="{role.id}">{role.name}</option>
            {/each}
        </select>
    </div>

    <button class="btn btn-outline-secondary" type="submit">Update</button>
</form>