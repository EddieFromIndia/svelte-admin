<script>
	export let previous = () => {};

	export let next = () => {};
</script>

<nav>
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href={""} on:click|preventDefault={previous}>Previous</a>
      </li>
      <li class="page-item">
        <a class="page-link" href={""} on:click|preventDefault={next}>Next</a>
      </li>
    </ul>
</nav>