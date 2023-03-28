<script>
    import { goto } from '$app/navigation';
    import axios from 'axios'

    let email = '';
    let password = '';

    $: submit = async () => {
        const { data } = await axios.post('login', {
            email,
            password
        }, {withCredentials: true});

        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

        // Setting replaceState to true clears the route history,
        // so you won't go back to /register on clicking back.
        await goto('/', { replaceState: true });
    }
</script>

<form on:submit|preventDefault={submit} class="form-signin m-auto">
	<h1 class="h3 mb-3 fw-normal">Please Login</h1>

	<div class="form-floating">
        <input type="email" bind:value={email} class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Email address</label>
	</div>
	<div class="form-floating">
        <input type="password" bind:value={password} class="form-control" id="password" placeholder="Password">
        <label for="password">Password</label>
	</div>

	<button class="w-100 btn btn-lg btn-primary mt-2" type="submit">Login</button>
</form>

