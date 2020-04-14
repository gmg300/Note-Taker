// DEPENDENCIES
// ====================================================
// Load packages
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

// Set up Express data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ROUTES
// ====================================================
// AJAX page routes
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

// Displays API JSON
app.get("/api/notes", function(req, res) {
  let notes = fs.readFileSync("../db/db.json","utf8");
  return res.json(notes);
});

// Request handling
app.post("/api/waitlist", function(req, res) {
    let newReservation = req.body;
  
    newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newReservation);
  
    waitlist.push(newReservation);
  
    res.json(newReservation);
  });


app.post("/api/tables", function(req, res) {
  let newReservation = req.body;

  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);

  tables.push(newReservation);

  res.json(newReservation);
});

app.get("/api/tables", function(req, res) {
    tables.length = 0;
    console.log(tables);
    res.json(tables);
});

// START SERVER
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
