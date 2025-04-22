import axios from 'axios';
import Chat from '../models/Chat.js';

export const sendMessage = async (req, res) => {
  const { message } = req.body;
  const userId = req.user.id;

  try {
    // ✅ Use the correct v1 API and a valid model name
    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: 'user',
            parts: [{ text: message }]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";

    const chat = await Chat.create({
      userId,
      messages: [
        { role: 'user', content: message },
        { role: 'assistant', content: reply }
      ]
    });

    res.json({ reply, chatId: chat._id });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data?.error?.message || 'Gemini Chat failed' });
  }
};