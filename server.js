const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const quizRoutes = require('./routes/quizRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/quizzes', quizRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8012;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});