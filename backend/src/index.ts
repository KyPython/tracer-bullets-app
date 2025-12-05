import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks';

const app = express();
const PORT = process.env.PORT || 3001;

// Security: Disable X-Powered-By header
app.disable('x-powered-by');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', tasksRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});

