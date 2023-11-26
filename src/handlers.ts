import { format } from "path"
import { create_new_note, delete_all_notes, get_all_note, search_note } from "./db"
import { interpolate_html, format_notes } from "./utils"
import { open } from "fs"

export function create_note_handler(note: string) {
  try {
    create_new_note(note)
    console.log(`${note} added successfully`)
  } catch (err) {
    console.error(err)
    console.error("Oops, Error!")
  }
}

export function get_notes_handler(pretty?: boolean) {
  const notes = get_all_note()
  if (pretty) {
    console.dir(notes)
  } else {
    notes.forEach((note) => console.log(note.note))
  }
}

export function clean_notes(): void {
  delete_all_notes()
}

export function search_note_handler(search_pattern: string) {
  const note = search_note(search_pattern)
  if (note) {
    console.log(note)
  } else {
    console.log("Note not found")
  }
}

export async function open_web_ui(port?: string) {
  if (!port) port = process.env.PORT
  const template_file = Bun.file("./src/template.html");
  const template_content = await template_file.text();
  const notes = get_all_note();
  const html = interpolate_html(template_content, { notes: format_notes(notes) })
  Bun.serve(
    {
      port,
      fetch(req) {
        return new Response(html, {
          status: 200,
          headers: {
            "Content-Type": "text/html"
          }
        });
      }
    }
  )
}
