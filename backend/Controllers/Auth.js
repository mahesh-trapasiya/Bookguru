const User = require("../Models/User");
const Book = require("../Models/Book");
const { validationResult } = require("express-validator");
const sendMail = require("../Helper/Mailer");
const md5 = require("md5");

exports.Signup = async (req, res, next) => {
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    const error = errs.array()[0].msg;
    return res.status(422).json({
      error,
    });
  }

  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.status(403).json({ error: "Email already exists" });
    }

    const OTP = Math.floor(100000 + Math.random() * 900000);
    console.log(OTP);

    const user = new User({
      username: req.body.username,
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: md5(req.body.password),

      role: req.body.role,
      intrest: req.body.intrest,
      country: req.body.country,
      plan: "none",
      verificationcode: OTP,
    });

    if (req.body.role === "Writer") {
      const book = new Book({
        category: req.body.bookName,
        name: req.body.bookName,
        pages: req.body.bookPages,
        reference: req.body.bookreference,
        upload: req.body.bookFile,
      });

      book
        .save()
        .then((result) => {
          res
            .status(201)
            .json({ msg: "Signup Successfully, Proceed to Login!" });
        })
        .catch((error) => {
          console.log("Error While Adding Book", error);
        });
    } else {
      user.plan = req.body.plan;
    }

    user
      .save()
      .then((error, result) => {
        sendMail(emailData);
        return res.status(200).json({
          message: ` Verification Code Has been Sent to ${req.body.email}`,
        });
      })
      .catch((err) => {
        console.log("Error While Creating user", err);
      });

    const emailData = {
      from: "mkt@narola.email",
      to: req.body.email,
      subject: "Bookguru Verification",
      html: `<p>Please use the following Otp For Verification</p><br/> <h1>${OTP}</h1>`,
    };
  } catch (error) {
    res.status(422).json({ msg: error });
  }
};

exports.VerifyOtp = async (req, res, next) => {
  const user = User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.json("User with this email does not exists");
    } else {
      if (user.verificationcode === req.body.verificationcode) {
        User.updateOne(
          { email: req.body.email },
          {
            $set: {
              verificationcode: "none",
              verified: true,
            },
          },
          (data) => {
            return res.json({
              msg: "Account Verified",
            });
          }
        );
      } else {
        return res.json({ msg: "Invalid Code" });
      }
    }
  });
};

exports.Signin = async (req, res, next) => {
  console.table(req.body);

  try {
    const userExists = await User.findOne({
      $and: [
        {
          email: req.body.email,
        },
        {
          password: md5(req.body.password),
        },
      ],
    });
    console.log(userExists);

    if (!userExists) {
      return res.status(422).json({
        error: "Username or Password is Incorrect..",
      });
    }

    /* Updatting isLoggedIn and lastLoggedIn fields */
    User.updateOne(
      { email: req.body.email },
      { isLoggedIn: true, lastLoggedIn: Date.now() }
    )
      .then((result) => {
        console.log("Logged in Flag updated");
      })
      .catch((err) => {
        if (err) {
          console.log("Loggedin flag not updated");
        }
      });

    let token;
    token = jwt.sign(
      {
        _id: userExists._id,
        fname: userExists.fname,
        lname: userExists.lname,
        email: userExists.email,
        role: userExists.role,
        token: token,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.json({
      msg: "Logged in!",
      user: {
        _id: userExists._id,
        fname: userExists.fname,
        lname: userExists.lname,
        email: userExists.email,
        role: userExists.role,
        lastLoggedIn: Date.now(),
        token: token,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
