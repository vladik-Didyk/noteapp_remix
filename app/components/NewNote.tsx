import styles from "./NewNote.css";
import type { LinksFunction } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";

function NewNote() {
  const data = useActionData();
  const navigation: Navigation = useNavigation();
  const isSubmitting: boolean = navigation.state === "submitting";

  return (
    <Form method="post" id="note-form">
      {data?.message && <p className="error">{data.message}</p>}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows="5" required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Note"}
        </button>
      </div>
    </Form>
  );
}

export default NewNote;

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};
