import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { checkDBConnection } from './config/db';
import { errorHandler } from './middleware/errorHandler';

import authRoutes from './routes/auth.routes';
import elevesRoutes from './routes/eleve.routes';
import scolariteRoutes from './routes/scolarite.routes';
import personnesRoutes from './routes/personnes.routes';
import financeRoutes from './routes/finance.routes';
import parametresRoutes from './routes/parametres.routes';
import evaluationsRoutes from './routes/evaluations.routes';

// Load env vars
dotenv.config();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Set security headers
app.use(helmet());

// Dev logging middleware
if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  app.use(morgan('dev'));
}

// API Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/eleves', elevesRoutes);
app.use('/api/scolarite', scolariteRoutes);
app.use('/api/personnes', personnesRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/parametres', parametresRoutes);
app.use('/api/evaluations', evaluationsRoutes);

// Error Handler (must be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  // Attempt to connect to DB at startup
  await checkDBConnection();
});
