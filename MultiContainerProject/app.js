require('dotenv').config();
const express = require('express');
const { prisma } = require('./PrismaClient');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Simple GET route
app.get('/', (req, res) => {
  res.send('Welcome to the Express API!');
});

// Create a new user
app.post('/user', async (req, res) => {
  try {
    const { email, name } = req.body;
    
    // Validate input
    if (!email || !name) {
      return res.status(400).json({ error: 'Email and name are required' });
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Get user by ID
app.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Update user
app.put('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name } = req.body;

    // Validate input
    if (!email && !name) {
      return res.status(400).json({ error: 'At least one field (email or name) is required' });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...(email && { email }),
        ...(name && { name }),
      },
    });

    res.json(updatedUser);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Delete user
app.delete('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
