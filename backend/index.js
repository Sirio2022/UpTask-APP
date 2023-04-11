import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';

const app = express();

dotenv.config();
connectDB();

// Routing
app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
