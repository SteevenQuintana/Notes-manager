import type { NoteModalProps } from "../types";

function NoteModal({ note, onClose, onChange, onSave }: NoteModalProps) {
  return (
    <section
      className="nes-dialog"
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          backgroundColor: "rgba(0,0,0,0.2)",
          width: "100%",
          height: "100%",
        }}
      />
      <form
        method="dialog"
        style={{
          backgroundColor: "white",
          zIndex: 1,
          padding: 12,
          border: "4px solid black",
        }}
      >
        <h2 className="title">Create / Edit note</h2>
        <div className="nes-field">
          <label htmlFor="title">Title</label>
          <input
            value={note.title || ""}
            type="text"
            id="title"
            className="nes-input"
            onChange={(event) => {
              event.preventDefault();
              onChange("title", event.target.value);
            }}
          />
        </div>
        <div className="nes-field">
          <label htmlFor="content">Content</label>
          <textarea
            value={note.content}
            id="content"
            className="nes-textarea"
            onChange={(event) => onChange("content", event.target.value)}
          />
        </div>
        <div
          className="dialog-menu"
          style={{
            marginTop: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button className="nes-btn" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="nes-btn is-primary" type="button" onClick={onSave}>
            Save
          </button>
        </div>
      </form>
    </section>
  );
}

export default NoteModal;
