const mongoose = require("mongoose");
const User = require("./models/user");

const sampleUsers = [
  { name: "Alice", age: 28, city: "Delhi" },
  { name: "Bob", age: 35, city: "Mumbai" },
  { name: "Charlie", age: 22, city: "Bangalore" }
];

async function seedDB() {
  await mongoose.connect("mongodb://127.0.0.1:27017/userDB");
  await User.deleteMany({});
  await User.insertMany(sampleUsers);
  console.log("Sample users inserted");
  mongoose.connection.close();
}
seedDB();
