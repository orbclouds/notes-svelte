<script lang="ts">
  import { Link, navigate } from "svelte-routing";
  import DOMPurify from "dompurify";
  import marked from "marked";

  import notes from "@app/notes";

  export let id: string;

  const note = $notes.contents.find(({ id: noteID }) => id === noteID);

  const edit = () => navigate(`/edit/${id}`);

  const goBack = () => navigate("/");
</script>

{#if !!note}
  <nav>
    <button type="button" on:click={goBack}>Back</button>
    <button type="button" on:click={edit}> Edit </button>
  </nav>
  <h1>
    Previewing {note.name}
  </h1>

  <hr />

  <article>
    {@html DOMPurify.sanitize(marked(note.contents))}
  </article>
{/if}

<style>
  nav :global(a),
  nav button {
    margin: 0 8px;
  }
  h1 {
    text-transform: capitalize;
  }
  hr {
    border: none;
    height: 3px;
    background: black;
    opacity: 0.1;
    border-radius: 2px;
  }
</style>
