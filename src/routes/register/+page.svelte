<script>
    import { goto } from '$app/navigation';
    import axios from 'axios'

    let first_name = '';
    let last_name = '';
    let email = '';
    let password = '';
    let password_confirm = '';

    $: submit = async () => {
        await axios.post('register', {
            first_name,
            last_name,
            email,
            password,
            password_confirm
        });

        // Setting replaceState to true clears the route history,
        // so you won't go back to /register on clicking back.
        await goto('/login', { replaceState: true }); 
    }
</script>

<form on:submit|preventDefault={submit} class="form-signin m-auto">
	<h1 class="h3 mb-3 fw-normal">Please Register</h1>

	<div class="form-floating">
		<input bind:value={first_name} class="form-control" id="firstName" placeholder="John">
		<label for="firstName">First name</label>
	</div>
	<div class="form-floating">
		<input bind:value={last_name} class="form-control" id="lastName" placeholder="Doe">
		<label for="lastName">Last name</label>
	</div>
	<div class="form-floating">
        <input type="email" bind:value={email} class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Email address</label>
	</div>
	<div class="form-floating">
        <input type="password" bind:value={password} class="form-control" id="password" placeholder="Password">
        <label for="password">Password</label>
	</div>
	<div class="form-floating">
		<input type="password" bind:value={password_confirm} class="form-control" id="passwordConfirm" placeholder="Confirm password">
		<label for="passwordConfirm">Confirm password</label>
	</div>

	<button class="w-100 btn btn-lg btn-primary mt-2" type="submit">Submit</button>
</form>

