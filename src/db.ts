import { Database, SQLQueryBindings } from "bun:sqlite"
import { Note as Note } from "./types";

const db = new Database("../db.sqlite")
db.exec("PRAGMA journal_mode = WAL;")

export const note_table_query = db.prepare(`CREATE TABLE IF NOT EXISTS note (
  note_id INTEGER PRIMARY KEY AUTOINCREMENT,
  note TEXT NOT NULL
)`)

export function create_new_note(note: string): void {
  const query = db.query(`INSERT INTO note (note) VALUES (?)`);
  query.run(note);
}

export function get_all_note(): Note[] {
  const query = db.query<Note, SQLQueryBindings[]>(`SELECT * FROM note;`);
  return query.all();
}

export function search_note(note: string): Note | null {
  const query = db.query<Note, SQLQueryBindings[]>(`
    SELECT * FROM note WHERE note LIKE '%${note}%'
  `);
  return query.get()
}

export function delete_all_notes(): void {
  const query = db.query("DELETE FROM note")
  query.run();
}

