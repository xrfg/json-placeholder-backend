const mongoose = require("mongoose");
const Post = require("../modals/postSchema");

const faker = require("faker");

mongoose.connect(
  "mongodb://127.0.0.1:27017/json-placeholder",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("connected to DB");
  }
);

// seed data into database

async function seedData() {
  try {
    // purge/delete all users inside the user collection
    await Post.deleteMany({});

    const posts = Array(10)
      .fill(null)
      .map(() => {
        const post = new Post({
          userId: faker.datatype.number(),
          title: faker.company.catchPhrase(),
          body: faker.hacker.phrase(),
        });

        return post.save();
      });

    console.log(posts);

    // before closing the connection execute all promises
    await Promise.all(posts);
  } catch (err) {
    console.log(err.message);
  }
  // always close the connection
  mongoose.connection.close();
}

seedData();
