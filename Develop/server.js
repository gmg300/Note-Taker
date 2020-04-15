// DEPENDENCIES
// ====================================================
// Load packages
const express = require("express");
const fs = require("fs");
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
  console.log(newNote);
  let notes = JSON.parse(fs.readFileSync("db/db.json","utf8"));
  notes.push(newNote);
  fs.writeFileSync("db/db.json", JSON.stringify(notes));
  res.json(newNote);
});

// Delete routes
app.delete("/api/notes/:id", function(req, res) {

});
// START SERVER
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
