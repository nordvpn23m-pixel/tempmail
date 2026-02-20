const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = 'mtienv25102025';
const BASE_URL = 'http://api.mtien.online/public/GetMailCode.aspx';

// ১. নতুন জিমেইল পাওয়ার জন্য রুট
app.get('/get-mail', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}?key=${API_KEY}&act=get-mail`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch email' });
    }
});

// ২. OTP বা কোড চেক করার রুট (Query parameter: email)
app.get('/get-otp', async (req, res) => {
    const email = req.query.email;
    if (!email) return res.status(400).json({ error: 'Email parameter is required' });

    try {
        const response = await axios.get(`${BASE_URL}?key=${API_KEY}&email=${email}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch OTP' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
