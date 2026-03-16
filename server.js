const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// MongoDB connection (cloud)
mongoose.connect('mongodb+srv://hassan81456:<db_password>@e-website.a2lxjqz.mongodb.net/?retryWrites=true&w=majority&appName=E-Website',)

.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // serve HTML, CSS, JS from root folder

// Sample Schema + Model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// Test Route to Save Data
app.post('/save-contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    res.json({ message: "Contact saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error saving contact" });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
