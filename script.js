const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
var nodemailer = require('nodemailer');
// const { response } = require('express');
mongoose.connect("mongodb://localhost:27017/Project");
app.use(bodyparser.urlencoded({ extended: true }));

// Saving the data into data base (Part -> 1)
const notesSchema = {
  formname: String,
  email: String,
  msg: String,
}
const Form = mongoose.model('Form', notesSchema);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html")
});
app.post("/", function (req, res) {
  const client_result = `
  <p>Client Details as follows</p>
  <h3>Details</h3>
  <ul>
  <li>Name: ${req.body.n1}</li> 
  <li>Email: ${req.body.gmail}</li> 
  <li>Message: ${req.body.msg}</li> 
  </ul>   
  `
  let newform = new Form({
    formname: req.body.n1,
    email: req.body.gmail,
    msg: req.body.msg
  });
  newform.save();

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "your host email",
      pass: "your host app password",
    }
  });

  var mailOptions = {
    from: 'host email',
    to: 'your host email',
    subject: 'Someone Contected You Throw Portfolio',
    text: "NodeJs Nodemailer is working fine below that you will find the data Related to the client who has contected you",
    html: client_result
  }
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email send: " + info.response);
    }
      });

      const client_data = `
      <h3>Thanks For Reaching Me.. I will contact You Shortly....</h3>

      <p>Following you will find Details you have feild on that form</p>
  <h3>Details</h3>
  <ul>
  <li>Name: ${req.body.n1}</li> 
  <li>Email: ${req.body.gmail}</li> 
  <li>Message: ${req.body.msg}</li> 
  </ul>   
      `

  var Transportar_client = nodemailer.createTransport({
    service: 'gmail',
    auth: {
       user: "your host email",
      pass: "your host app password",
    }
  });

  var mailOptions_cleint = {
    from: 'your host email',
    to: req.body.gmail,
    subject: 'Auto Generated Mail from Portfolio',
    html: client_data
    
  }
  Transportar_client.sendMail(mailOptions_cleint, function (error, info1) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email send: " + info1.response);
    }
  })
  res.redirect('/');

});

app.listen(8080, function () {
  console.log("server is running on port 8080");
});

