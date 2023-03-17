<script>
//@ts-nocheck

    import { page } from '$app/stores'
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import axios from 'axios';

    let permissions = [];
    let selectedPermissions = [];

    let name = '';

    onMount(async () => {
        const { data } = await axios.get('http://localhost:8000/api/permissions', { withCredentials: true });
        permissions = data;

        await getRole();
    });

    async function getRole() {
        const { data } = await axios.get(`http://localhost:8000/api/roles/${$page.params.id}`, { withCredentials: true });

        name = data.name;
        selectedPermissions = data.permissions.map(p => p.id);
    }

    function togglePermission(id) {
        if (selectedPermissions.includes(id)) {
            selectedPermissions = selectedPermissions.filter(p => p !== id);
        }
        else {
            selectedPermissions = [...selectedPermissions, id];
            selectedPermissions.sort();
        }
    }

    async function submit() {
        let role = {
            name,
            permissions: selectedPermissions
        };

        await axios.put(`http://localhost:8000/api/roles/${$page.params.id}`, role, { withCredentials: true });

        await goto('/roles');
    }
</script>

<h3>Edit Role</h3>
<form on:submit|preventDefault={submit}>
    <div class="mb-3 mt-3 row">
        <label class="col-sm-2 col-form-label" for="name">Name</label>
        <div class="col-sm-10">
            <input bind:value={name} class="form-control" name="name">
        </div>
    </div>

    <div class="mb-3 row">
        <label class="col-sm-2 col-form-label" for="permission">Permissions:</label>
        <div class="col-sm-10">
            {#each permissions as permission}
            <div class="form-check form-check-inline col-3">
                <input class="form-check-input" type="checkbox" name="permission" checked={selectedPermissions.includes(permission.id)} on:change={togglePermission(permission.id)}>
                <label class="form-check-label" for="permission">{permission.name}</label>
            </div>
            {/each}
        <div>
    </div>

    <button class="btn btn-outline-secondary" type="submit">Update</button>
</form>