const mongoose = require('mongoose');
const User = require("../models/user.model.js");
// const AutoInc = require('../models/autoinc.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error("Passwords do no match.");
    err.status = 401;
    return res.status(err.status).json(err); //myFlag
    // return next(err); //myFlag
  }

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.log("Hashing error: " + err);
      return res.status(500).json(err);
    }
    // db.foo.find().sort({_id:1}).limit(50);
    User.find({}).sort({
      _id: -1
    }).limit(1).select('employeeCode').then(result => {
      console.log(result);
      const newEmployeeCode = +(result[0].employeeCode) + 1;
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        employeeCode: newEmployeeCode,
        // email: req.body.email,
        password: hash,
        username: req.body.username,
        usertype: req.body.usertype
      });

      user.save().then(result => {
        console.log("Saving response: " + result);
        res.status(201).json({
          message: "User saved successfully"
        });
      }).catch(error => {
        console.log(error);
        res.status(500).json(error);
      });
      // res.json({
      //   message: "kdjkdfjjd"
      // });
    }).catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
  });
}


//required fields for login are: 
exports.login = (req, res, next) => {
  if (!req.body.password || !req.body.username) {
    return res.status(400).json({
      message: "Please provice both the password and the username."
    });
  }

  User.findOne({
    username: req.body.username
  }).exec().then(result => {
    if (!result) {
      return res.status(401).json({
        message: "Auth Failed"
      });
    }
    console.log(result);
    const usertype = result.usertype;
    bcrypt.compare(req.body.password, result.password, (err, result) => {
      if (result) {
        return res.status(202).json({
          message: "Auth success",
          usertype: usertype,
          token: jwt.sign({
            email: req.body.email,
            userType: req.body.userType
          }, "MySuperSecretPrivateKey", {
            expiresIn: '1h'
          })
        });
      } else {
        return res.status(401).json({
          message: "Wrong username/password!"
        })
      }
    });
  }).catch(error => {
    console.log(error);
    res.status(500).json(error);
  });

}





















// exports.signup = (req, res, next) => {
//   console.log("Procesing the login request");

//   if (req.body.password !== req.body.passwordConf) {
//     var err = new Error("Passwords do no match.");
//     err.status = 400;
//     res.send("Passwords don't match");
//     return next(err);
//   }

//   bcrypt.hash(req.body.password, 10, (err, hash) => {
//     if (err) {
//       return res.status(500).json({
//         message: "Password encryption failure",
//         error: err
//       });
//     }

//     var newEmployeeCode;

//     AutoInc.findOne({
//       _id: "employeeCode"
//     }).then((res) => {
//       newEmployeeCode = (+res.lastId) + 1;
//       AutoInc.update({
//         _id: "employeeCode"
//       }, {
//         $set: {
//           lastId: +newEmployeeCode
//         }
//       }).exec().then((resp) => {
//         console.log("updation response" + resp);
//       }).catch(err => {
//         console.log();
//         return res.status(500).json(err);
//       });
//     }).then(() => {
//       const user = new User({
//         _id: new mongoose.Types.ObjectId(),
//         employeeCode: newEmployeeCode,
//         email: req.body.email,
//         password: hash,
//         username: req.body.username
//       });
//       console.log("User to be saved: " + user);
//       user.save().then(result => {
//         console.log("Saved successfully! Saved object: " + result);
//         return res.status(201).json(result);
//       }).catch(err => {
//         return res.status(500).json(error)
//       });
//     }).catch(err => {
//       console.log(err)
//       res.status(500).json(err);
//     });
//   });
// };