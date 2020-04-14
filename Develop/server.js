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
  return res.json(notes);
});
// Post routes
app.post("/api/notes", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  var newNote = req.body;
  // // Using a RegEx Pattern to remove spaces from newCharacter
  // newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
  console.log(newNote);
  fs.appendFileSync("db/db.json", JSON.stringify(newNote));
  res.json(newNote);
});

// START SERVER
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
