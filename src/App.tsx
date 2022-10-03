import { useEffect, useMemo, useState } from "react";
import { api } from "./api";
import type { Note } from "./types";
import NoteCard from "./components/NoteCard";
import NoteModal from "./components/NoteModal";

function App() {
  const [notes, setNotes] = useState<Note[]>(api.notes.list);
  const [draft, setDraft] = useState<null | Partial<Note>>(null);
  const [view, setView] = useState<"active" | "archived">("active");
  const matches = useMemo(() => {
    return notes.filter((note) => {
      if (view === "active") {
        return !note.archived;
      } else if (view === "archived") {
        return note.archived;
      }
    });
  }, [notes, view]);

  const handleArchived = (id: Note["id"]) => {
    setNotes((notes) =>
      notes.map((note) => {
        if (note.id !== id) return note;
        return { ...note, archived: !note.archived };
      })
    );
  };
  const handleDelete = (id: Note["id"]) => {
    setNotes((notes) => notes.filter((note) => note.id !== id));
  };
  const handleEdit = (note: Note) => {
    setDraft(note);
  };
  const handleDraftChange = (field: string, value: string) => {
    setDraft((draft) => ({
      ...draft,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (draft?.id) {
      setNotes((notes) =>
        notes.map((note) => {
          if (note.id !== draft.id) return note;
          return {
            ...draft,
            lastEdited: new Date().toLocaleDateString(),
          } as Note;
        })
      );
    } else {
      setNotes((notes) =>
        notes.concat({
          id: String(+new Date()),
          lastEdited: new Date().toLocaleDateString(),
          ...(draft as Omit<Note, "id" | "lastEdited">),
        })
      );
    }
    setDraft(null);
  };

  useEffect(() => {
    api.notes.set(notes);
  }, [notes]);

  return (
    <main
      style={{
        minHeight: "90vh",
        minWidth: "664px",
        border: "4px solid black",
      }}
    >
      <div style={{ marginBottom: 24, display: "flex", gap: 24, padding: 24 }}>
        <h1>My{view === "archived" && " archived"} notes</h1>
        {view === "active" && (
          <button className="nes-btn" onClick={() => setDraft({})}>
            Create note
          </button>
        )}
        <button
          className="nes-btn"
          onClick={() =>
            setView((view) => (view === "active" ? "archived" : "active"))
          }
        >
          {view === "active" ? "Archived notes" : "Go back to unarchived notes"}
        </button>
      </div>
      <div
        style={{
          display: "grid",
          padding: 16,
          gap: 16,
          gridTemplateColumns: "repeat(auto-fill, minmax(450px, 1fr))",
        }}
      >
        {matches.length
          ? matches.map((note) => (
              <NoteCard
                onArchive={handleArchived}
                onDelete={handleDelete}
                onEdit={handleEdit}
                view={view}
                key={note.id}
                note={note}
              />
            ))
          : ""}
      </div>
      {!matches.length && (
        <section
          className="message -right"
          style={{
            marginTop: 250,
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "row",
            gap: 20,
          }}
        >
          {view === "active" ? (
            <>
              <div className="nes-balloon from-right">
                <p>Create your first note!</p>
              </div>
              <i className="nes-kirby" style={{ paddingRight: 100 }}></i>
            </>
          ) : (
            <>
              <div className="nes-balloon from-right">
                <p>no notes filed yet</p>
              </div>
              <i className="nes-charmander" style={{ paddingRight: 100 }}></i>
            </>
          )}{" "}
        </section>
      )}

      {draft && (
        <NoteModal
          note={draft}
          onChange={handleDraftChange}
          onSave={handleSave}
          onClose={() => setDraft(null)}
        />
      )}
    </main>
  );
}

export default App;
