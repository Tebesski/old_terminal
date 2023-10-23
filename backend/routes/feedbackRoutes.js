const express = require("express")
const router = express.Router()
const feedbackController = require("../controllers/feedbackController")
const rateLimiter = require("../middlewares/rateLimiter")
const feedbackValidation = require("../validation/expressValidator")

router
   .route("/reviews")
   .post(rateLimiter, feedbackValidation, feedbackController.feedback)

module.exports = router
