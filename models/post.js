const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  image: String,
  creator: String,
  title: String,
  postInfo: String,
  // comments: [ String ],
  likes: [String],
  }, 
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post