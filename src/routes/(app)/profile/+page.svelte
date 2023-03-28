<script>
	import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
	import userStore from '../../../store'
	import axios from 'axios';
    
    $: user = $userStore;

    let first_name = '';
    let last_name = '';
    let email = '';
    let password = '';
    let password_confirm = '';

    onMount(async () => {

        if (user.email === undefined) {
            await goto('/login');
        }
        else {
            first_name = user.first_name;
            last_name = user.last_name;
            email = user.email;
        }
    });

    async function submitInfo() {
        let newUser = user;

        newUser.first_name = first_name;
        newUser.last_name = last_name;
        newUser.email = email;

        const { data } = await axios.put('users/info', newUser, { withCredentials: true });

        userStore.update(() => {
          return data;
        });
    }

    async function submitPassword() {
        await axios.put('users/password', { password, password_confirm } , { withCredentials: true });
    }

</script>

<h3>Account Information</h3>
<form on:submit|preventDefault={submitInfo}>
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

    <button class="btn btn-outline-secondary" type="submit">Save</button>
</form>

<h3 class="mt-4">Change Password</h3>
<form on:submit|preventDefault={submitPassword}>
    <div class="mb-3">
        <label for="password">Password</label>
        <input type="password" bind:value={password} class="form-control" name="password">
    </div>
    <div class="mb-3">
        <label for="password_confirm">Password Confirm</label>
        <input type="password" bind:value={password_confirm} class="form-control" name="password_confirm">
    </div>

    <button class="btn btn-outline-secondary">Save</button>
</form>
