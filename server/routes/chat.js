const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/authMiddleware');
const Chat = require('../models/Chat');

// @route   POST /api/chat/send
router.post('/send', auth, async (req, res) => {
    const { message } = req.body;
    const userId = req.user.id;

    try {
        let chat = await Chat.findOne({ user: userId });
        if (!chat) {
            chat = new Chat({ user: userId, messages: [] });
        }
        chat.messages.push({ role: 'user', content: message });
        
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: "mistralai/mistral-7b-instruct:free",
            messages: [{ role: 'user', content: message }],
        }, {
            headers: { 'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}` }
        });

        const aiResponse = response.data.choices[0].message.content;

        chat.messages.push({ role: 'assistant', content: aiResponse });
        await chat.save();
        
        res.json({ reply: aiResponse });
    } catch (err) {
        console.error('Error in chat route:', err.response ? err.response.data : err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/chat/history
router.get('/history', auth, async (req, res) => {
    try {
        const chat = await Chat.findOne({ user: req.user.id }).select('messages');
        if (!chat) return res.json([]);
        res.json(chat.messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;