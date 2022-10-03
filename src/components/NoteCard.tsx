import { NoteCardProps } from "../types";

function NoteCard({ note, onArchive, onDelete, onEdit, view }: NoteCardProps) {
  return (
    <div
      className={view == "active" ? "nes-container" : "nes-container is-dark"}
    >
      <div>
        <h3>{note.title}</h3>
        <p>Last edited: {note.lastEdited}</p>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <button
          className={
            view === "active" ? "nes-btn is-warning" : "nes-btn is-primary"
          }
          onClick={() => onArchive(note.id)}
        >
          {view == "active" ? "archive" : "unarchive"}
        </button>
        <button className="nes-btn" onClick={() => onEdit(note)}>
          Edit
        </button>
        <button className="nes-btn is-error" onClick={() => onDelete(note.id)}>
          delete
        </button>
      </div>
    </div>
  );
}
export default NoteCard;
