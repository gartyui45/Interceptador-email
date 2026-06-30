const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let caixasDeEntrada = {};

app.post('/webhook-email', (req, res) => {
    const { para, de, assunto, corpo } = req.body;
    if (!para) return res.status(400).send("Formato inválido.");
    const loginId = para.split('@')[0];
    caixasDeEntrada[loginId] = { from: de, subject: assunto, textBody: corpo };
    res.status(200).send("Mensagem recebida!");
});

app.get('/api/check-inbox', (req, res) => {
    const { login } = req.query;
    res.json(caixasDeEntrada[login] ? [caixasDeEntrada[login]] : []);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
