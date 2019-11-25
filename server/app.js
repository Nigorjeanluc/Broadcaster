import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import morgan from 'morgan';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Broadcaster App' });
});

app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Endpoint not found' });
});

app.listen(port, () => {
    process.stdout.write(`Broadcaster App running on ${port}\n`);
});

export default app;