const express = require("express");
const router = express.Router(); //In Express.js, a Router is a middleware that provides a way to modularize and organize route handlers.
const Posts = require("../model/Post");

//Get all post
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//Get post by Id
router.get("/:postId", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//save new post
router.post("/", async (req, res) => {
  // Creating a New Post Instance
  const post = new Posts({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }

  //   // Since the save() operation is asynchronous, it returns a promise. The .then() method is used to handle the successful completion of the promise.
  //   post
  //     .save()
  //     .then((data) => {
  //       res.json(data);
  //     })
  //     .catch((err) => {
  //       res.json({ message: err });
  //     });
});

// Update post
router.patch("/:postId", async (req, res) => {
  try {
    const updatePost = await Posts.updateOne(
      { _id: req.params.postId },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
        },
      }
    );
    if (!updatePost) res.json({ message: "Post not found" });
    else console.log(req.body.title + req.body.description);

    res.json(updatePost);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete a post
router.delete("/:postId", async (req, res) => {
  console.log(req.params.postId);
  try {
    const deletePost = await Posts.deleteOne({ _id: req.params.postId });
    res.json({
      acknowleged: deletePost.acknowledged,
      deletedCount: deletePost.deletedCount,
    });
    console.log(deletePost);
  } catch (err) {
    console.log(err.message);
    res.json({ message: err });
  }
});

module.exports = router;
