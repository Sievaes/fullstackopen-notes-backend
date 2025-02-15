const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.static("dist")); //show dist folder in case connected to the root
app.use(cors()); // <-- This allows connection from all origins
app.use(express.json());

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

//GET root
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

//GET notes
app.get("/api/notes", (request, response) => {
  response.json(notes);
});

//GET specific note with Id
app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    //if not not found, send 404 status.
    response.statusMessage = "Page not found";
    response.status(404).end();
  }
});

//DELETE note with specific Id
app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

//POST note
app.post("/api/notes", (request, response) => {
  const body = request.body;
  console.log(request.body);

  if (!body.content) {
    return response.status(400).json({
      error: `content missing`,
    });
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  };

  notes = notes.concat(note);

  console.log(note);
  response.json(note);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
