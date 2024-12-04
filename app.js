const express = require("express");
const configdata = require("./config/db.config");
const userModule = require("./module/user.modul");
const twitModule = require("./module/twit");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const expressSession = require("express-session");
const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: flash,
    secret: "hehahchachapapanani",
  })
);

app.use(flash());

app.get("/", (req, res) => {
  res.render("welcome");
});

app.get("/profile", isLoggedIn , async  (req , res) => {
const  user = await userModule.findOne({ username : req.user.username })
  res.render("profile" , {user});
});

app.get("/register", (req, res) => {
  res.render("register", { error: req.flash("error")[0] });
});

app.post("/register", async (req, res) => {
  const { name, username, password } = req.body;
  const user = await userModule.findOne({ username });
  if (user){
    req.flash("error" , "acount already exists, please login.");
    return res.redirect("/register");
  }

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
  res.render("login" , {"error" : req.flash("error")[0]});
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userModule.findOne({ username });

  if (!user) {
   req.flash("error" , "username and password incurrect.");
   return res.redirect("/login");
  } 

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ username }, "shhhh");
      res.cookie("token", token);
      res.redirect("profile");
    } else {
      req.flash("error" , "username or password is incorrect.");
      res.redirect("login");
    }
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("login");
});

function isLoggedIn(req, res, next) {
  if (!req.cookies.token) {
    req.flash("error" , "you must be loggedin.");
   return res.redirect("/login"); 
  } ;


  jwt.verify(req.cookies.token, "shhhh", (err, decoded) => {
    if (err) {
      res.cookie("token", "");
      res.redirect("login");
    } else {
      req.user = decoded;
      next();
    }
  });
}

app.listen(3000);
