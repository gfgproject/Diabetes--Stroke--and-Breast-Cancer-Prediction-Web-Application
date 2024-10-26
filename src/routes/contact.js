// src/routes/contact.js
import express from 'express';
import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

const contactRouter = express.Router();

contactRouter.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL,
        subject: `Contact from ${name}`,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send("Message sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Failed to send message");
    }
});

export { contactRouter };
