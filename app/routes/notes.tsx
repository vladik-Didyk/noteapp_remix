// Import necessary utilities and components from external libraries and modules.
import { redirect } from "@remix-run/node";
import {
  Link,
  // useActionData,
  useLoaderData,
} from "@remix-run/react";

import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import NoteList, { links as noteListLinks } from "~/components/NoteList";
import { getStoredNotes, storeNotes } from "~/data/notes"; // Define the default export function for this module which represents the NotesPage component.

// Define the default export function for this module which represents the NotesPage component.
export default function NotesPage() {
  const notes = useLoaderData();

  // Instea of using the useLoaderData hook, we can use the useActionData hook to access the data returned from the action function.
  // const data = useActionData();

  // Render the main content of the page.
  return (
    // The main HTML element that wraps the page content.
    <main>
      {/*Render the NewNote component inside the main content.*/}
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

// Never showen in the browser, only executed on the server side.
export async function loader() {
  // Fetch the existing notes from storage.
  const notes = await getStoredNotes();
  // Return the notes as the data for this route.
  return notes;
}

// Define the action function which is executed on the backend side when a form submission or similar action occurs.
export async function action(data: any) {
  // Parse the form data from the incoming request.
  const formData = await data.request.formData();

  // The next section demonstrates two ways to extract and format the incoming note data: a longer, explicit method and a shorter, concise method.

  // Long way
  // Construct an object from the form data by manually extracting 'title' and 'content'.
  // const noteData = {
  //   title: formData.get("title"),
  //   content: formData.get("content"),
  // };

  // Short way
  // Use the Object.fromEntries utility to convert the form data into an object.
  const noteData = Object.fromEntries(formData);

  // Validate the incoming note data.
  if (noteData.title.trim().length < 5) {
    return { message: "Invalid title - must be at least 5 characters long." };
  }

  // Fetch the existing notes from storage.
  const existtingNotes = await getStoredNotes();

  // Assign a unique ID to the new note based on the current timestamp.
  noteData.id = new Date().toISOString();

  // Combine the existing notes with the new note to create an updated list.
  // The next two lines show two ways to achieve this: spread syntax or the concat method.

  // const updatedNotes = [...existtingNotes, noteData];
  const updatedNotes = existtingNotes.concat(noteData);

  // Save the updated list of notes to storage.
  await storeNotes(updatedNotes);

  // Redirect the user to the '/notes' route after the operation is complete.
  return redirect("/notes");
}

// Define the links function which provides style references for this module.
export function links() {
  // Return an array of links (style references) that are sourced from the NewNote component.
  return [...newNoteLinks(), ...noteListLinks()];
}

export function ErrorBoundary({ error }: { error: any }) {
  return (
    <main className="error">
      <h1>An error related to your notes occured!</h1>
      <p>{error.message}</p>
      <p>
        Back to <Link to="/">safety</Link>!
      </p>
    </main>
  );
}
