const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    default: Date.now(),
  },
});

module.exports = mongoose.model("post", PostSchema);

// The mongoose.model function is used to define and create a Mongoose model. It's a way to create a blueprint for documents that will be stored in a MongoDB collection. This function takes two arguments:
// The first argument is the name of the model (also known as the collection name in MongoDB).
// The second argument is the schema that defines the structure and properties of the documents in the collection.
// The model name is "post," and Mongoose will automatically pluralize it to "posts" and use that as the collection name in the database.
