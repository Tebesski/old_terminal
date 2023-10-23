const { validationResult } = require("express-validator")
const nodemailer = require("nodemailer")

// @desc FEEDBACK
// @Route POST /feedback
// @Access Public
const feedback = async (req, res) => {
   console.log(req.body)
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
   }
   // NodeMailer proccessing ...

   let transporter = nodemailer.createTransport({
      service: "gmail",
      scope: "https://mail.google.com/",
      auth: {
         type: "OAuth2",
         user: "tebesski@gmail.com",
         pass: process.env.PASS,
         clientId:
            "94581750660-a2blvnpfnpbvtq7hpmqn8qrgtf6qgu14.apps.googleusercontent.com",
         clientSecret: "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",
         refreshToken:
            "1//04_FLw3JL3ELCCgYIARAAGAQSNwF-L9IrK5-0RTqSQ4zRk8YpurNVPDbQFvCegDfReAOzKIhADnO5U6MPlCLnbfSm2m4bmBnt03k",
         accessToken:
            "ya29.a0AfB_byD19rPwhB9iL7YI6AAjyMVPDzWg573N4_h7eS9-SaBOdTp4F8FMIlmZidjTiZ-Tgk6g9Gtkn_CPg6k_kWru-J2SD0XNRZ_Crgdbx5x0eJeMJFTViBUcn_wlf-275ikXRAGiGn4lwNx22IvYvg_o-imDjHOVKuHJaCgYKATsSARISFQGOcNnCfaPOhf-4GhRc11Oo82jOXA0171",
      },
   })
   let mailOptions = {
      from: req.body.email,
      to: "tebesski@gmail.com",
      subject: `${process.env.SUBJECTPREFIX}: ${req.body.subject}`,
      html: `<div>
    <p>From: ${req.body.email}</p>
    <p>Subject: ${req.body.subject}</p>
    <p>${req.body.text}</p>
    </div>`,
   }
   transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
         console.log(error)
         return res.json({ message: "Error: Message is not sent" })
      } else {
         console.log("Email sent: " + info)
         return res.json({ message: "Message sent with success" })
      }
   })
}

module.exports = { feedback }
