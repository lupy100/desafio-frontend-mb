const path = require('path');

const cors = require('cors');
const express = require('express');

const app = express();
const PORT = 5000;
const vueDistPath = path.resolve(__dirname, '../../client/dist');

// @todo: dar uma olhada no warning ao rodar npm start
// WARNING no output files found for task server#build. Please check your `outputs` key in `turbo.json`
app.use(cors());
app.use(express.json());

app.get('/registration', (_req, res) => {
  res.sendFile(path.join(vueDistPath, 'index.html'));
});

app.use(express.static(vueDistPath));

app.post('/api/register', (req, res) => {
  console.log(req.body, res);
});

app.listen(PORT, () => {
  console.log(`Acesse o desafio em: http://localhost:${PORT}/registration`);
});
