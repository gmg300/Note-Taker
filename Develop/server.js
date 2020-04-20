// DEPENDENCIES
// ====================================================
// Load packages
const express = require("express");
const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;


// PARSING AND STATIC SERVING
// ====================================================
// Data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Static file serving
app.use("/assets", express.static(path.join(__dirname,"/public","/assets"))); // serves css and js files

// ROUTES
// ====================================================
// Get routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname,"/public","index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname,"/public","notes.html"));
});

app.get("/api/notes", function(req, res) {
  let notes = fs.readFileSync("db/db.json", "utf8");
  notes = JSON.parse(notes);
  return res.json(notes);
});
// Post route
app.post("/api/notes", function(req, res) {
  let newNote = req.body; // get new note data
  let notes = JSON.parse(fs.readFileSync("db/db.json","utf8"));
  notes.push(newNote); // add new note to notes array
  notes.map((note, i) => { // reset unique IDs for each note
    note.id = i + 1;
  });
  console.log(chalk.cyan("---- New note saved! ----")); // user feedback
  fs.writeFileSync("db/db.json", JSON.stringify(notes, null, 2)); // Re-write file
  res.json(newNote);
});
// Delete route
app.delete("/api/notes/:id", function(req, res) {
  let noteNumber = +req.params.id; // get note id and change to integer
  let notes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
  notes = notes.filter(note => { // filter deleted note from array
    return note.id !== noteNumber;
  });
  notes.map((note, i) => { // reset unique IDs for each note
    note.id = i + 1;
  });
  console.log(chalk.red(`---- Note ${noteNumber} deleted! ----`)); // user feedback
  fs.writeFileSync("db/db.json", JSON.stringify(notes, null, 2)); // Re-write file
  res.json(noteNumber);
});

// START SERVER
// =============================================================
app.listen(PORT, function() {
  console.log(chalk.green(`---- App listening on PORT ${PORT} ----`));
});
