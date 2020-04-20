// DEPENDENCIES
// ====================================================
// Load packages
const express = require("express");
const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const app = express();
const PORT = 3000;


// PARSING AND STATIC SERVING
// ====================================================
// Data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static file serving
app.use("/assets", express.static(path.join(__dirname,"/public","/assets")));
app.use(express.static("public"));


// ROUTES
// ====================================================
// Get routes
app.get("/api/notes", function(req, res) {
  let notes = fs.readFileSync("db/db.json","utf8");
  notes = JSON.parse(notes);
  return res.json(notes);
});

// Post routes
app.post("/api/notes", function(req, res) {
  let newNote = req.body; // req.body = JSON from user input
  console.log(chalk.cyan("Saving new note..."));
  let notes = JSON.parse(fs.readFileSync("db/db.json","utf8"));
  notes.push(newNote); // add new note to notes array
  notes.map((note, i) => { // reset unique IDs for each note
    note.id = i + 1;
  });
  fs.writeFileSync("db/db.json", JSON.stringify(notes, null, 2));
  res.json(newNote);
});

// Delete routes
app.delete("/api/notes/:id", function(req, res) {
  let noteNumber = +req.params.id;
  console.log(chalk.red(`Deleting note ${noteNumber}...`));
  let notes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
  // let deletedNote = notes.filter(note => {
  //   console.log(note); // filter deleted note from array
  //   return note.id === noteNumber;  
  // });
  // console.log(deletedNote);
  notes = notes.filter(note => { // filter deleted note from array
    return note.id !== noteNumber;
  });
  notes.map((note, i) => { // reset unique IDs for each note
    note.id = i + 1;
  });
  fs.writeFileSync("db/db.json", JSON.stringify(notes, null, 2));
  res.json(noteNumber);
});
// START SERVER
// =============================================================
app.listen(PORT, function() {
  console.log(chalk.green("App listening on PORT " + PORT));
});
