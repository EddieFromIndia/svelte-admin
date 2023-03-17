<script>
  import { page } from '$app/stores';

  let active = $page.url.pathname;
</script>

<nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="position-sticky pt-3 sidebar-sticky">
      <ul class="nav flex-column mt-3">
        <li class="nav-item">
          <a class="nav-link {active === '/dashboard' ? 'active' : ''}" aria-current="page" href="/dashboard">Dashboard</a>
        </li>
        <li class="nav-item">
          <a class="nav-link {active === '/users' ? 'active' : ''}" aria-current="page" href="/users">Users</a>
        </li>
        <li class="nav-item" on:select={() => active = 'roles'}>
          <a class="nav-link {active === '/roles' ? 'active' : ''}" aria-current="page" href="/roles">Roles</a>
        </li>
        <li class="nav-item" on:select={() => active = 'products'}>
          <a class="nav-link {active === '/products' ? 'active' : ''}" aria-current="page" href="/products">Products</a>
        </li>
        <li class="nav-item" on:select={() => active = 'orders'}>
          <a class="nav-link {active === '/orders' ? 'active' : ''}" aria-current="page" href="/orders">Orders</a>
        </li>
      </ul>
    </div>
</nav>