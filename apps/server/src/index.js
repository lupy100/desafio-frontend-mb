import fs from 'fs';
import { fileURLToPath, URL } from 'node:url';
import path from 'path';

import { API_PORT } from '@mb/shared-constants';
import cors from 'cors';
import express from 'express';

const app = express();
const PORT = API_PORT;
const __dirname = fileURLToPath(new URL('.', import.meta.url));

const vueDistPath = path.resolve(__dirname, '../../client/dist');

// @todo: dar uma olhada no warning ao rodar npm start
// WARNING no output files found for task server#build. Please check your `outputs` key in `turbo.json`
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/registration', (_req, res) => {
  // @todo: Se sobrar tempo melhorar essa validação para verificar se existe o arquivo index.html
  if (fs.existsSync(vueDistPath)) {
    res.sendFile(path.join(vueDistPath, 'index.html'));
  } else {
    // @todo: Improve this html message
    res.send(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <body>
        <p>O build do Vue não foi encontrado.</p>
      </body>
      </html>
    `);
  }
});

app.use(express.static(vueDistPath));

app.post('/api/register', (req, res) => {
  // @todo: Add validation to the request body (Talvez dê para usar algo compartilhado com o vue)
  console.log(req.body);
  res.json({ success: true, message: 'Registro recebido com sucesso!', data: req.body });
});

app.listen(PORT, () => {
  console.log(`Acesse o desafio em: http://localhost:${PORT}/registration`);
});
