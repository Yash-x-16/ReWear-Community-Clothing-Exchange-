// admin.js – ReWear Admin Panel (Full-Stack Ready: Prisma + JWT + WebSocket + Error Handling)

import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors()); // Allow frontend cross-origin
app.use(express.json());

// --- Middleware: Admin Auth ---
function verifyAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

// --- Routes ---

// Fetch all items (optionally filter by status)
app.get('/api/items', verifyAdmin, async (req, res) => {
  try {
    const { status } = req.query;
    const items = await prisma.item.findMany({
      where: status ? { status } : {},
      include: { uploader: true },
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// Approve item
app.put('/api/items/:id/approve', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const item = await prisma.item.update({
      where: { id: Number(id) },
      data: { status: 'approved' },
    });
    io.emit('itemsUpdated');
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to approve item' });
  }
});

// Reject item
app.put('/api/items/:id/reject', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const item = await prisma.item.update({
      where: { id: Number(id) },
      data: { status: 'rejected' },
    });
    io.emit('itemsUpdated');
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to reject item' });
  }
});

// Remove item
app.delete('/api/items/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.item.delete({ where: { id: Number(id) } });
    io.emit('itemsUpdated');
    res.json({ message: 'Item removed' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Fetch all users
app.get('/api/users', verifyAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Update user status (active/suspended)
app.put('/api/users/:id/status', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await prisma.user.update({
      where: { id: Number(id) },
      data: { status },
    });
    io.emit('usersUpdated');
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user status' });
  }
});

// --- WebSocket Connection ---
io.on('connection', (socket) => {
  console.log('✅ Admin connected:', socket.id);
});

// --- Start Server ---
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Admin Panel Server running at http://localhost:${PORT}`);
});

export default app;
