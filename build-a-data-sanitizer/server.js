
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { inputCleaner, inputValidator } from './middleware.js';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.redirect('/form');
});

app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', inputCleaner, inputValidator, (req, res) => {
  res.send(`Username: ${req.body.username}, Comment: ${req.body.comment}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
