// src/server.mjs
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { contactRouter } from './routes/contact.js';
import { authRouter } from './routes/auth.js';

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });

// Use the authRouter for handling authentication routes
app.use('/api', authRouter);  // Add '/api' prefix
app.use(contactRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
