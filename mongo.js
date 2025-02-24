require("dotenv").config();
const mongoose = require("mongoose");

//USING TEST DATABASE
const url = process.env.TEST_MONGODB_URI;

//sets that that queries sent to database doesnt have to be in schema for the query to return data.
mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5,
  },
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: `${process.argv[3]}`,
  important: `${process.argv[4]}`,
});

//if no arguments passed other than "node mongo.js <password>" it will list all stored notes
if (process.argv.length < 5) {
  Note.find().then((notes) => {
    notes.map((note) =>
      console.log("content:", `${note.content},`, "important:", note.important)
    );

    mongoose.connection.close();
  });
  return;
}

//save new note to mongo with "node mongo.js <password> content important" and returns the result to console
note.save().then((result) => {
  console.log(result);
  mongoose.connection.close();
});
