import type { Note } from "./types";

export const api = {
  notes: {
    list: (): Note[] => {
      try {
        return JSON.parse(localStorage.getItem("todos") || "[]");
      } catch (err) {
        return [];
      }
    },
    set: (notes: Note[]) => {
      localStorage.setItem("todos", JSON.stringify(notes));
    },
  },
};
