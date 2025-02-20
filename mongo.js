const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

//takes third argument when "node mongo.js password(password is the third argument)"
const password = process.argv[2];

const url = `mongodb+srv://masteruser:${password}@cluster0.1nwly.mongodb.net/noteApp?retryWrites=true&w=majority&appName=noteApp`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is easy",
  important: true,
});

// note.save().then((result) => {
//   mongoose.connection.close();
// });

Note.find({ important: true }).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
