/**
 * @file routes/contactRoutes.js
 * @description Express routes for contact-related endpoints.
 * Defines API routes for contact form and communication.
 * @author Bruno Paulon
 * @version 1.0.0
 */

const express = require("express");
const router = express.Router();
const { sendContactEmail, sendSMSNotification } = require("../controllers/contactController");

// @route POST /api/contact
// @desc Send contact form email
// @access Public
router.post("/", sendContactEmail);

// @route POST /api/contact/sms
// @desc Send SMS notification (placeholder for future SMS integration)
// @access Public
router.post("/sms", sendSMSNotification);

module.exports = router;

