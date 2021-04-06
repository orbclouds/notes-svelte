<script lang="ts">
  import {
    navigate,
    Link,
  } from 'svelte-routing';

  import notes, {
    DEFAULT_NOTES,
  } from '@app/notes';

  const createNote = () => {
    const id = btoa(
      crypto
        .getRandomValues(
          new Uint8Array(2)
        )
        .join('')
    );

    notes.update((prev) => {
      return {
        contents: [
          ...prev.contents,
          {
            id,
            name: '',
            contents: '',
          },
        ],
      };
    });

    navigate(`/edit/${id}`);
  };

  const deleteAll = () => {
    notes.set(DEFAULT_NOTES);
  };

  const deleteNote = (
    id: string
  ) => () => {
    notes.update((prev) => ({
      contents: prev.contents.filter(
        ({ id: noteID }) =>
          id !== noteID
      ),
    }));
  };
</script>

<h1>A Great Notes App</h1>

<button
  type="button"
  class="create"
  on:click={createNote}
>
  New Note
</button>
{#if $notes.contents.length > 0}
  <button
    type="button"
    class="delete"
    on:click={deleteAll}
  >
    Delete All
  </button>
{/if}

<nav>
  {#each $notes.contents as { id, name }}
    <div class="container">
      <div class="name">
        {name || 'New Note'}
      </div>
      <div class="actions">
        <Link
          to={`/edit/${id}`}
          title={`Edit ${name}`}
          >Edit</Link
        >
        <Link
          to={`/preview/${id}`}
          title={`Preview ${name}`}
          >Preview</Link
        >
        <button
          type="button"
          on:click={deleteNote(id)}
        >
          Delete
        </button>
      </div>
    </div>
  {/each}
</nav>

<style>
  button.create::before {
    content: '+ ';
  }
  button.delete::before {
    content: '- ';
  }
  nav div.container {
    border: solid 1px #ccc;
    padding: 8px 16px;
    margin: 16px 0;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(0, 0, 0, 0);
    transition: background 0.1s
      cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  nav div.container:hover {
    background: rgba(0, 0, 0, 0.02);
  }
  div.name {
    text-transform: capitalize;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  div.actions {
    min-width: 225px;
  }
  div.actions :global(a),
  div.actions button {
    margin: 0 8px;
  }
</style>
