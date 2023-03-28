<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import axios from 'axios';

    /**
     * @type {any[]}
     */
    let roles = [];

    let first_name = '';
    let last_name = '';
    let email = '';
    let role_id = 1;

    onMount(async () => {
        const { data } = await axios.get('roles');
        roles = data;
    });

    async function submit() {
        let newUser = {
            first_name,
            last_name,
            email,
            role_id
        };

        await axios.post('users', newUser);

        await goto('/users');
    }
</script>

<h3>Create User</h3>
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

    <button class="btn btn-outline-secondary" type="submit">Create</button>
</form>