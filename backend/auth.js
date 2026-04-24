import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const USERS_FILE = join(__dirname, 'users.json');

const router = Router();

const readUsers  = () => JSON.parse(readFileSync(USERS_FILE, 'utf8'));
const writeUsers = (u) => writeFileSync(USERS_FILE, JSON.stringify(u, null, 2));

const sign = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: 'All fields are required.' });
  if (password.length < 6)
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });

  const users = readUsers();
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase()))
    return res.status(409).json({ error: 'An account with this email already exists.' });

  const hashed = await bcrypt.hash(password, 12);
  const user = { id: Date.now().toString(), name, email: email.toLowerCase(), password: hashed, createdAt: new Date().toISOString() };
  users.push(user);
  writeUsers(users);

  const { password: _, ...safe } = user;
  const token = sign({ id: user.id, email: user.email });
  res.status(201).json({ token, user: safe });
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required.' });

  const users = readUsers();
  const user  = users.find((u) => u.email === email.toLowerCase());
  if (!user) return res.status(401).json({ error: 'Invalid email or password.' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid email or password.' });

  const { password: _, ...safe } = user;
  const token = sign({ id: user.id, email: user.email });
  res.json({ token, user: safe });
});

// GET /api/auth/me  (verify token)
router.get('/me', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer '))
    return res.status(401).json({ error: 'No token.' });

  try {
    const payload = jwt.verify(auth.slice(7), process.env.JWT_SECRET);
    const users   = readUsers();
    const user    = users.find((u) => u.id === payload.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });
    const { password: _, ...safe } = user;
    res.json({ user: safe });
  } catch {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
});

export default router;
