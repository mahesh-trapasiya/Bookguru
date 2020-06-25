const User = require("../Models/User");
const Book = require("../Models/Book");
const jwt = require("jsonwebtoken");
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

    const OTP = Math.random()
      .toString(36)
      .replace(/[^a-z0-9]+/g, "")
      .substr(0, 6);

    const user = new User({
      username: req.body.username,
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      intrest: req.body.intrests,
      country: req.body.country,
      plan: response.body.plan || "",
      verificationcode: OTP,
    });

    user
      .save()
      .then((error, result) => {
        const destProfile = path.join(
          __dirname,
          "..",
          "upload",
          String(user._id),
          "books"
        );
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
      if (user.verificationcode === req.body.code) {
        User.updateOne(
          { email: req.body.email },
          {
            $set: {
              verificationcode: "",
              verified: true,
            },
          },
          (data) => {
            return res.json({
              message: "Account Verified",
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
  try {
    const userExists = await User.findOne({
      $and: [
        {
          email: req.body.email,
        },
        {
          password: req.body.password,
        },
      ],
    });

    if (!userExists) {
      return res.status(422).json({
        error: "Username or Password is Incorrect..",
      });
    }

    if (userExists.verified) {
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
          token: token,
        },
      });
    } else {
      res.json({
        error: "Your Account Is Not Verified",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.json("User with this email does not exists");
    }
    //sign token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: 300,
    });

    const emailData = {
      from: "mkt@narola.email",
      to: email,
      subject: "Password Reset Instructions",
      text: `Please use the following link to reset your password: ${process.env.CLIENT_URL}/resetpassword/${token}`,
      html: `<p>Please use the following link to reset your password:</p> <a href='${process.env.CLIENT_URL}/resetpassword/${token}'>click here.</a>`,
    };

    user.updateOne(
      {
        resetPasswordLink: token,
      },
      (err, data) => {
        if (err) {
          return res.json({ error: err });
        } else {
          sendMail(emailData);
          return res.status(200).json({
            message: `Email has been sent to ${email}. Follow the instructions to reset your password.`,
          });
        }
      }
    );
  });
};

exports.resetPassword = async (req, res) => {
  const errs = validationResult(req);
  if (!errs.isEmpty()) {
    const err = errs.array()[0].msg;
    return res.status(422).json({
      msg: err,
    });
  }
  const { resetPasswordLink, newPassword } = req.body;

  try {
    const user = await User.findOne({ resetPasswordLink });

    const updatedFields = {
      password: newPassword,
      resetPasswordLink: "",
    };
    user.updated = Date.now();

    const userData = _.extend(user, updatedFields);

    await userData.save();
    res.json({
      message: `Great! Now you can login with your new password.`,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong...." });
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ password: req.body.oldPassword });
    if (!user) {
      return res.status(422).json({
        errors: [
          {
            param: "old Password",
            msg: "Old Password Does Not Matched.",
          },
        ],
      });
    }

    User.updateOne(
      { _id: req.auth._id },
      {
        $set: {
          password: req.body.password,
        },
      },
      (data) => {
        return res.json({
          message: "Password Changed Successfully",
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Something went wrong...." });
  }
};
