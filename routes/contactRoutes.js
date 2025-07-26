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

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: API for handling contact form submissions
 */

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Send contact form email
 *     tags:
 *       - Contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - subject
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the sender
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the sender
 *               subject:
 *                 type: string
 *                 description: Subject of the message
 *               message:
 *                 type: string
 *                 description: Content of the message
 *             example:
 *               name: "John Doe"
 *               email: "john.doe@example.com"
 *               subject: "Inquiry about your services"
 *               message: "Hello Bruno, I'm interested in your web development services. Can we discuss a potential project?"
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       400:
 *         description: Invalid input (e.g., missing fields, invalid email format)
 *       500:
 *         description: Failed to send email
 */
// @route POST /api/contact
// @desc Send contact form email
// @access Public
router.post("/", sendContactEmail);

/**
 * @swagger
 * /api/contact/sms:
 *   post:
 *     summary: Send SMS notification (placeholder)
 *     tags:
 *       - Contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - message
 *             properties:
 *               phone:
 *                 type: string
 *                 description: Phone number to send SMS to
 *               message:
 *                 type: string
 *                 description: Content of the SMS message
 *             example:
 *               phone: "+1234567890"
 *               message: "This is a test SMS notification."
 *     responses:
 *       501:
 *         description: SMS functionality not implemented yet or not enabled
 */
// @route POST /api/contact/sms
// @desc Send SMS notification (placeholder for future SMS integration)
// @access Public
router.post("/sms", sendSMSNotification);

module.exports = router;


