import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {
  // Grab the MongoDB ObjectId directly
  const userId = req.user._id;
  const { to, text } = req.body;

  try {
    const message = await Message.create({
      sender:   userId,
      receiver: to,
      text,
    });
    return res.status(201).json(message);

  } catch (err) {
    console.error('SendMessage error:', err);
    return res.status(500).json({ message: 'Error sending message' });
  }
};

export const getMessages = async (req, res) => {
  const userId = req.user._id;
  const { to } = req.query;

  try {
    const messages = await Message.find({
      $or: [
        { sender: userId,   receiver: to },
        { sender: to,       receiver: userId },
      ]
    }).sort({ createdAt: 1 });

    return res.json(messages);

  } catch (err) {
    console.error('GetMessages error:', err);
    return res.status(500).json({ message: 'Error fetching messages' });
  }
};
