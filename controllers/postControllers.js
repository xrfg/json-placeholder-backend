const PostModel = require("../modals/postSchema");
const createError = require("http-errors");

exports.getPosts = async (req, res, next) => {
  try {
    let posts = await PostModel.find({}).select("-__v -_id");
    res.json({ success: true, data: posts });
  } catch (err) {
    next(err);
  }
};

exports.getSinglePost = async (req, res, next) => {
  console.log(req.params);
  try {
    const { userId } = req.params;
    // const post = await PostModel.findById(id);
    const post = await PostModel.findOne({ userId: userId }).select(
      "-__v -_id"
    );
    if (post) {
      return res.json({ success: true, data: post });
    } else {
      next(new createError.BadRequest("no such post found in our collection"));
    }
  } catch (err) {
    next(err);
  }
};

exports.postPost = async (req, res, next) => {
  try {
    const post = new PostModel(req.body);
    await post.save();
    res.send({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

exports.patchPost = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const post = await PostModel.findOneAndUpdate({ userId: userId }, req.body);
    res.send({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const post = await PostModel.findOneAndDelete({ userId: userId });
    res.send({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};
