const notesRouter = require("express").Router();
const Note = require("../models/note");

//GET
notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

//GET BY ID
notesRouter.get("/:id", async (request, response) => {
  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

//POST
notesRouter.post("/", async (request, response) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  const savedNote = await note.save();
  response.status(201).json(savedNote);
});

//DELETE
notesRouter.delete("/:id", async (request, response) => {
  await Note.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

//UPDATE
notesRouter.put("/:id", (request, response) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true }).then(
    (updatedNote) => {
      response.json(updatedNote);
    }
  );
});

module.exports = notesRouter;
