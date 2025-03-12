import fs from 'fs';
import { fileURLToPath, URL } from 'node:url';
import path from 'path';

import { API_PORT } from '@mb/shared/constants';
import {
  validateEmail,
  validateName,
  validateDate,
  isCPFValid,
  isCNPJValid,
  validatePassword,
} from '@mb/shared/utils/validations';
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
  const { name, email, documentType, document, initialDate, phoneNumber, password } = req.body;
  let errors = {};

  if (!name) {
    errors.name = 'Por favor, insira seu nome.';
  } else if (!validateName(name)) {
    errors.name = 'O nome deve ter pelo menos 3 caracteres e conter apenas letras.';
  }

  if (!email) {
    errors.email = 'Por favor, insira um e-mail.';
  } else if (!validateEmail(email)) {
    errors.email = 'Por favor, insira um e-mail válido.';
  }

  if (!documentType) {
    errors.documentType = 'Por favor, selecione o tipo de pessoa.';
  }

  const doc = document ? document.replace(/\D/g, '') : '';
  if (!doc || (doc.length !== 11 && doc.length !== 14)) {
    errors.document = 'Por favor, insira um número de documento válido.';
  } else {
    if (doc.length === 11 && !isCPFValid(doc)) {
      errors.document = 'CPF inválido. Verifique e tente novamente.';
    }
    if (doc.length === 14 && !isCNPJValid(doc)) {
      errors.document = 'CNPJ inválido. Verifique e tente novamente.';
    }
  }

  if (!initialDate) {
    errors.initialDate = 'Por favor, insira uma data.';
  } else if (!validateDate(initialDate)) {
    errors.initialDate = 'Data inválida. Use o formato DD/MM/AAAA.';
  }

  const phone = phoneNumber ? phoneNumber.replace(/\D/g, '') : '';
  if (!phone) {
    errors.phoneNumber = 'Por favor, insira um número de telefone.';
  } else if (phone.length < 10 || phone.length > 11) {
    errors.phoneNumber = 'O número de telefone deve conter entre 10 e 11 dígitos.';
  }

  if (!password) {
    errors.password = 'Por favor, insira sua senha.';
  } else if (!validatePassword(password)) {
    errors.password =
      'A senha deve ter pelo menos 8 caracteres, incluindo um número, uma letra maiúscula e uma minúscula.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  console.log('Dados recebidos:', req.body);
  res.json({ success: true, message: 'Registro recebido com sucesso!', data: req.body });
});

app.listen(PORT, () => {
  console.log(`Acesse o desafio em: http://localhost:${PORT}/registration`);
});
