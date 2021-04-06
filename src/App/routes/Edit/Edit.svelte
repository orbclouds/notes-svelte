<script lang="ts">
  import {
    Link,
    navigate,
  } from 'svelte-routing';

  import notes from '@app/notes';

  export let id: string;

  const note = $notes.contents.find(
    ({ id: noteID }) => id === noteID
  );

  const originalNote = note
    ? { ...note }
    : null;

  $: saved =
    note &&
    originalNote &&
    note.name === originalNote.name &&
    note.contents ===
      originalNote.contents;

  const persist = () => {
    const serialized = JSON.stringify(
      $notes
    );
    alert('Your note has saved!');
    localStorage.setItem(
      'notes',
      serialized
    );
  };

  const save = () => {
    persist();
    navigate('/');
  };

  const preview = () => {
    persist();
    navigate(`/preview/${id}`);
  };

  const goBack = () => {
    if (!saved) {
      alert('Save your work first!');
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
      return;
    }
    navigate('/');
  };
</script>

{#if note}
  <nav>
    <button
      type="button"
      on:click={goBack}
    >
      Back
    </button>
    <button
      type="button"
      on:click={preview}
    >
      Preview
    </button>
  </nav>

  <h1>
    Editing {note.name}
  </h1>

  <form on:submit|preventDefault={save}>
    <section>
      <label for="name"> Title: </label>
      <br />
      <input
        id="name"
        type="text"
        bind:value={note.name}
      />
    </section>
    <section>
      <label for="content">
        Content:
      </label>
      <br />
      <textarea
        id="content"
        bind:value={note.contents}
      />
    </section>
    <button type="submit" role="button">
      Save
    </button>
  </form>
{/if}

<style>
  nav :global(a),
  nav button {
    margin: 0 8px;
  }
  h1 {
    text-transform: capitalize;
  }
  form {
    border: solid 1px #ccc;
    border-radius: 4px;
    padding: 16px;
  }
  form section {
    border-radius: 4px;
    margin: 16px 0;
  }
  textarea {
    height: 600px;
  }
</style>
