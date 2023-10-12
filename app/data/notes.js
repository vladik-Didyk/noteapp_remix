import fs from "fs/promises";

// Utility function to read and write notes to a file
export async function getStoredNotes() {
  const rawFileContent = await fs.readFile("notes.json", { encoding: "utf-8" });
  const data = JSON.parse(rawFileContent);
  const storedNotes = data.notes ?? [];
  return storedNotes;
}

// Utility function to store notes to a file
export function storeNotes(notes) {
  return fs.writeFile("notes.json", JSON.stringify({ notes: notes || [] }));
}
