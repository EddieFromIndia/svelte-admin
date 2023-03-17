<script>
    import { goto } from '$app/navigation';
    import axios from 'axios';
    import { User } from '../../models/User';
    import userStore from '../../store'

    $: user = $userStore

    const logout = async () => {

      const { data } = await axios.post('http://localhost:8000/api/logout', {}, {withCredentials: true});

      if (data.message === 'success') {

        userStore.update(() => {
          return new User();
        });

        await goto('/login');
      }
    }
</script>

<header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="/">Company name</a>
    <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <input class="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search">
    <div class="navbar-nav">
      <div class="nav-item text-nowrap">
        <a class="nav-link px-3" href="/profile">{user.first_name ?? ''} {user.last_name ?? ''}</a>
        <a class="nav-link px-3" href={"#"} on:click={logout}>{user.email === undefined ? '' : 'Sign out'}</a>
      </div>
    </div>
</header>
