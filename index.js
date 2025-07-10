const mongoose=require("mongoose");
const express=require("express");
const path=require("path");
const app=express();
app.set("view engine","ejs");
app.use(express.urlencoded({ extended: true }));
const User = require("./models/user");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/userDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

let port=3000;
app.listen(port,()=>{
    console.log("listening sucessfully");
}) 

app.get("/",(req,res)=>{
    res.redirect("/users");
}) 

app.get("/users",async (req,res)=>{
    const users = await User.find();
    res.render("users/index",{users});
})

app.get("/users/:id/edit", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.render("users/edit.ejs", { user });
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, city } = req.body;
  await User.findByIdAndUpdate(id, { name, age, city });
  res.redirect("/users");
});

app.get("/users/new" ,async (req,res)=>{
    res.render("users/new.ejs");
})

app.post("/users", async (req, res) => {
  const { name, age, city } = req.body;
  const user = await User.create({ name, age, city });
  res.redirect("/users");
}); 

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.redirect("/users");
});