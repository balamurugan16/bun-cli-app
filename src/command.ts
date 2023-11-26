import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { clean_notes, create_note_handler, get_notes_handler, open_web_ui, search_note_handler } from "./handlers";

yargs(hideBin(process.argv))
  .command(
    "new <note>",
    "Creates a new Note",
    (yargs) => yargs.positional("note", {
      description: "The content of the note",
      type: "string",
    }),
    (argv) => create_note_handler(argv.note.toString())
  )
  .command(
    "show",
    "gets all notes",
    (yargs) => yargs.option("pretty", {
      alias: "p",
      type: "boolean",
      describe: "Get all notes"
    }),
    (argv) => get_notes_handler(argv?.pretty)
  )
  .command(
    "search <search_pattern>",
    "searches for a note",
    (yargs) => yargs.positional("search_pattern", {
      type: "string",
      describe: "Search pattern for the note"
    }),
    (argv) => search_note_handler(argv.search_pattern as string)
  )
  .command(
    "clean",
    "Deletes all notes",
    () => { },
    () => {
      clean_notes();
    })
  .command("ui [port]", "open a web ui", (yargs) => yargs.option("port", {
    type: "string",
    description: "The port to open the ui"
  }), (argv) => {
    open_web_ui(argv.port)
  })
  .parse()

