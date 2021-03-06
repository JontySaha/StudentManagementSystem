require("dotenv").config();
const express = require("express");
const router = express.Router();
const Login = require("../models/login");
const student_profile = require("../models/student_profile");
const bodyParser = require("body-parser");
//const mongoose = require("mongoose")

const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
router.use(bodyParser.json());
// router.use(session({
//     secret: 'Our secret',
//     resave: true,
//     saveUninitialized: true
// }));

// router.use(passport.initialize());
// router.use(passport.session());

//passport.use("login", Login.createStrategy());

passport.serializeUser(function (Login, done) {
  return done(null, Login.id);
});
passport.deserializeUser(function (id, done) {
  Login.findById(id, function (err, Login) {
    return done(err, Login);
  });
});

const LocalStrategy = require("passport-local").Strategy;
passport.use("login", new LocalStrategy(Login.authenticate()));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:9000/login/auth/google/secrets",
    },
    function (accessToken, refreshToken, profile, cb) {
      Login.findOrCreate(
        {
          googleId: profile.id,
          username: profile.emails[0].value,
          name: profile.name.givenName + " " + profile.name.familyName,
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/secrets",
  passport.authenticate("google", { failureRedirect: "/auth/google" }),
  async function (req, res) {
    // Successful authentication, redirect home.
    //var sess = req.session;
    //sess.username = profile.emails[0].value;
    //res.end('done');
    console.log(req.user);
    res.cookie("userid", req.user.id);
    res.cookie("username", req.user.username);
    // res.json({ userid: req.user.id, username: req.user.username });
    // res.redirect("http://localhost:3000/welcome");

    // console.log(req.user);
    // res.json({ userid: req.user.id, username: req.user.username });

    // var student =  student_profile.findOne({ userid: req.user.id });
    // console.log(student.name)
    // //if(student == undefined){
    // const newstudent = new student_profile({
    //   email: req.user.username,
    //   name: req.user.name,
    //   userid: req.user.id,

    // });
    //console.log(newstudent)
    //let student;
    try {
      let student;
      student = await student_profile.findOne({ email: req.user.username });
      if (student === null) {
        const newstudent = new student_profile({
          email: req.user.username,
          name: req.user.name,
          userid: req.user.id,
        });
        student = newstudent.save();
      }
      console.log(student + "student");
    } catch (err) {
      console.log(err);
    }

    // res.status(200).json({ userid: req.user.id, username: req.user.username });
    res.redirect("http://localhost:3000/welcome");
  }
);

router.post("/register", function (req, res) {
  Login.register(
    { username: req.body.username, name: req.body.name },
    req.body.password,

    function (err, user) {
      if (err) {
        res.send("Already registereed");
      } else {
        passport.authenticate("login")(req, res, function () {
          res.send("1");
          const newstudent = new student_profile({
            email: req.body.username,
            name: req.body.name,
            userid: req.user.id,
            // email: req.params.email,
          });

          const student = newstudent.save();
          // res.status(201).json(newstudent);
          //res.student = newstudent;
          //next();
          //res.json({ student });
          // } catch (err) {
          //   res.status(400).json({ message: err.message });
          // }
        });
      }
    }
  );
});

router.post("/login", function (req, res) {
  const user = new Login({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      res.send("/login");
    } else {
      passport.authenticate("login")(req, res, function () {
        console.log("in else");
        res
          .status(200)
          .json({ userid: req.user.id, username: req.user.username });
      });
    }
  });
});

router.get("/ses", function (req, res) {
  var sess = req.session;
  /*
   * Here we have assigned the 'session' to 'sess'.
   * Now we can create any number of session variables we want.
   * in PHP we do as $_SESSION['var name'].
   * Here we do like this.
   */
  //sess.email; // equivalent to $_SESSION['email'] in PHP.
  res.json({ session: req.session.user }); // equivalent to $_SESSION['username'] in PHP.
});

router.get("/logout", function (req, res) {
  req.logout();
  res.clearCookie("userid");
  res.clearCookie("username");
  res.redirect("http://localhost:3000/");
});

router.get("/sess", (req, res) => {
  const sess = req.user.username;
  res.json(req.session);
  res.redirect("/student_profile");
});

// const SESSION = session;
// module.exports = SESSION
module.exports = router;
