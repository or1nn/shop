import express from 'express';
import rootRouter from './routes';
import path from 'path';
import cors from 'cors'
import errorHandler from './middlewares/errorHandlingMiddleware';
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use('/api', rootRouter);
app.use(errorHandler);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
