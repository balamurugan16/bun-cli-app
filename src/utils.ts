import { Note } from "./types";

export const interpolate_html = (html: string, data: string) => {
  return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, placeholder) => {
    return data[placeholder] || "";
  })
}

export const format_notes = (notes: Note[]) => {
  return notes.map(note => {
    return `
      <div class="note">
        <p>${note.note}</p>
      </div>`
  }).join("\n")
}

