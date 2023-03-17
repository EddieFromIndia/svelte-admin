<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import axios from 'axios';

    let permissions = [];
    let selectedPermissions = [];

    let name = '';

    onMount(async () => {
        const { data } = await axios.get('http://localhost:8000/api/permissions', { withCredentials: true });
        permissions = data;
    });

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
        let newRole = {
            name,
            permissions: selectedPermissions
        };

        await axios.post('http://localhost:8000/api/roles', newRole, { withCredentials: true });

        await goto('/roles');
    }
</script>

<h3>Create Role</h3>
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
                <input class="form-check-input" type="checkbox" name="permission" on:change={togglePermission(permission.id)}>
                <label class="form-check-label" for="permission">{permission.name}</label>
            </div>
            {/each}
        <div>
    </div>

    <button class="btn btn-outline-secondary" type="submit">Create</button>
</form>