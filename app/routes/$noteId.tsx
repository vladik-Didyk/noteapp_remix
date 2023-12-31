import { Link, useLoaderData } from "@remix-run/react";

import styles from "~/styles/note-details.css";
import { getStoredNotes } from "~/data/notes";

export default function NoteDetailPage() {
  const note = useLoaderData();
  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note ? note.title : "NOTE TITLE"}</h1>
      </header>
      <p id="note-details-content">{note ? note.content : "NOTE CONTENT"}</p>
    </main>
  );
}

export async function loader({ params }: { params: { noteId: string } }) {
  const notes = await getStoredNotes();
  const noteId = params.noteId;
  const selectedNote = notes.find((note: any) => note.id === noteId);

  if (!selectedNote) {
    throw json(
      { message: "Could not find any notes." + noteId },
      { status: 404, statusText: "Not Found" }
    );
  }
  return selectedNote;
}

export const meta: MetaFunction = ({ data }: { data: any }) => {
  return [
    { title: data.title },
    {
      content: data.content,
    },
  ];
};

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
