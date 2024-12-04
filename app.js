const express = require("express");
const configdata = require("./config/db.config");
const userModule = require("./module/user.modul");
const twitModule = require("./module/twit");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("welcome");
});

app.get("/profile", (req, res) => {
  res.render("profile");
});

app.get("/register",  (req, res) => {
  res.render("register");
});

app.post("/register",   async (req, res) => {
  const { name, username, password } = req.body;
  const user = await userModule.findOne({ username });
  if (user) return res.status(500).send("user alredy logged din");

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      const user = await userModule.create({
        name,
        username,
        password: hash,
      });

      const token = jwt.sign({ username }, "shhhh");
      res.cookie("token", token);
      res.redirect("profile");
    });
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userModule.findOne({ username });

  if (!user) return res.status(500).send("username and password incurrect");

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ username }, "shhhh");
      res.cookie("token", token);
      res.redirect("profile");
    } else {
      res.redirect("login");
    }
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("login");
});

function isLoggedIn(req, res, next) {
  if (!req.cookies.token) return res.redirect("/login");
  jwt.verify(req.cookies.token, "shhhh", (err, decoded) => {
     if(err){
        res.cookie("token" , "");
        res.redirect("login");
     }else{
        req.user = decoded ;
        next();
     }
  });
}

app.listen(3000);
