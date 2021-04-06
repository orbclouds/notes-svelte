import { writable } from 'svelte/store';

interface Note {
  id: string;
  name: string;
  contents: string;
}

export interface Notes {
  contents: Note[];
}

export const DEFAULT_NOTES = {
  contents: [] as Note[],
};

const notes = writable<Notes>(
  DEFAULT_NOTES,
  (set) => {
    const savedNotes = (() => {
      const notesFromStorage = localStorage.getItem(
        'notes'
      );

      if (!notesFromStorage)
        return DEFAULT_NOTES;
      try {
        return JSON.parse(
          notesFromStorage
        );
      } catch {
        alert(
          "Couldn't load saved notes, purging!"
        );
        localStorage.setItem(
          'notes',
          JSON.stringify(DEFAULT_NOTES)
        );
        return DEFAULT_NOTES;
      }
    })();

    set(savedNotes);
  }
);

notes.subscribe((value) => {
  localStorage.setItem(
    'notes',
    JSON.stringify(value)
  );
});

export default notes;
