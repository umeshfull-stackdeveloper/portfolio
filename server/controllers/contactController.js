const Contact = require('../models/contact');
const nodemailer = require('nodemailer');

// @desc    Create contact message
// @route   POST /api/contact
// @access  Public
const createContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    let contact = null;
    try {
      contact = await Contact.create({
        name,
        email,
        subject,
        message,
      });
    } catch (dbErr) {
      console.warn('Database save failed. Continuing with email dispatch:', dbErr.message);
    }

    // Send email using Nodemailer
    const emailUser = process.env.EMAIL_USER || 'dunnaumesh2006@gmail.com';
    const emailPass = process.env.EMAIL_PASS;

    if (emailUser && emailPass && emailPass !== 'your_gmail_app_password_here') {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: emailUser,
            pass: emailPass,
          },
        });

        const mailOptions = {
          from: `"${name} (Portfolio)" <${emailUser}>`,
          to: emailUser,
          replyTo: email,
          subject: `Portfolio Contact: ${subject}`,
          text: `New message from ${name} (${email}):\n\nSubject: ${subject}\n\nMessage:\n${message}`,
          html: `
            <h3>New Message from Portfolio Contact Form</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <br/>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 1rem; border-left: 4px solid #6366f1; border-radius: 4px;">${message}</p>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email successfully dispatched to ${emailUser} for: ${name}`);
      } catch (emailErr) {
        console.error('SMTP email dispatch failed (please check credentials):', emailErr.message);
        res.status(500);
        return next(new Error(`Failed to send email to ${emailUser}: ${emailErr.message}. Please check your EMAIL_PASS / App Password.`));
      }
    } else {
      console.warn('SMTP credentials (EMAIL_USER & EMAIL_PASS) not fully configured in .env.');
      res.status(400);
      return next(new Error('Email service is not configured. Please set EMAIL_PASS in server/.env with a valid Google App Password.'));
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. Thank you!',
      data: contact,
    });
  } catch (error) {
    // Check if error is validation error and send user-friendly message
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      res.status(400);
      return next(new Error(messages.join(', ')));
    }
    next(error);
  }
};

module.exports = {
  createContact,
};
