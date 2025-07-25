/**
 * @file controllers/contactController.js
 * @description Controller for handling contact form submissions.
 * Provides logic for sending emails and managing contact requests.
 * @author Bruno Paulon
 * @version 1.0.0
 */

const nodemailer = require("nodemailer");

// @route POST /api/contact
// @desc Send contact form email
// @access Public
exports.sendContactEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      message: "All fields are required: name, email, subject, message." 
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  try {
    // Create transporter (using environment variables for configuration)
    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST || "smtp.mailtrap.io",
      port: process.env.EMAIL_PORT || 2525,
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.RECIPIENT_EMAIL || "bfrpaulondev@gmail.com",
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-left: 4px solid #007bff; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This email was sent from your portfolio contact form.
          </p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      message: "Email sent successfully! Thank you for your message." 
    });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ 
      message: "Failed to send email. Please try again later." 
    });
  }
};

// @route POST /api/contact/sms
// @desc Send SMS notification (placeholder for future SMS integration)
// @access Public
exports.sendSMSNotification = async (req, res) => {
  const { phone, message } = req.body;

  // Check if SMS is enabled
  if (process.env.SMS_ENABLED !== "true") {
    return res.status(501).json({ 
      message: "SMS functionality is not currently enabled." 
    });
  }

  // Placeholder for SMS implementation
  // This would integrate with services like Twilio, Vonage, etc.
  res.status(501).json({ 
    message: "SMS functionality is not implemented yet." 
  });
};

