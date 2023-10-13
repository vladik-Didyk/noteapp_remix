import { json, redirect } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";

import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import NoteList, { links as noteListLinks } from "~/components/NoteList";
import { getStoredNotes, storeNotes } from "~/data/notes";

export default function NotesPage() {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function loader() {
  const notes = await getStoredNotes();

  if (!notes || notes.length === 0) {
    throw json(
      { message: "Could not find any notes." },
      { status: 404, statusText: "Not Found" }
    );
  }
  return notes;
}

export async function action(data: any) {
  const formData = await data.request.formData();
  const noteData = Object.fromEntries(formData);

  if (noteData.title.trim().length < 5) {
    return { message: "Invalid title - must be at least 5 characters long." };
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);

  return redirect("/notes");
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <NewNote />
        <main className="error">
          <p>{error.data.message}</p>
          <p>
            Back to <Link to="/">safety</Link>!
          </p>
        </main>
      </>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export const meta: MetaFunction = () => {
  return [
    { title: "All Notes" },
    {
      name: "description",
      content: "A list of all notes.",
    },
  ];
};

export function CatchBoundary() {
  console.log("Route-level CatchBoundary triggered");

  const caughtResponse = useRouteError();
  const message = caughtResponse.data?.message || "Data not found.";
  return (
    <main className="error">
      <NewNote />
      <p className={"info-message"}>{message}</p>
    </main>
  );
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}
