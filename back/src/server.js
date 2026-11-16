const express = require("express");
const dotenv  = require("dotenv");
const cors    = require("cors");
const path    = require("path");

const uploads = require("./utils/upload.js");
const routes  = require("./view/routes");

dotenv.config();

const Port = process.env.API_PORT || 3600;
const app  = express();

const { db } = require('./databases/DatabaseContext.js');

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use(express.static(path.resolve(__dirname, '..', '..')));

// ─── ROTAS DA API ────────────────────────────────────────────
app.use(routes);

// ─── UPLOADS ────────────────────────────────────────────────
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.post('/upload', uploads.single('avatar'), (req, res) => {
    if (!req.file) {
        res.status(400).send('Erro ao fazer upload do arquivo!');
    } else {
        res.send('Arquivo enviado com sucesso!');
    }
});

// ─── INICIA SERVIDOR ────────────────────────────────────────
async function startServer() {
    //console.log(`Iniciando banco de dados: ${process.env.DB_TYPE}`);
    console.log(`Iniciando banco de dados: `);
    await db.init();

    app.listen(Port, () => {
        console.log(`\n Servidor rodando!`);
        console.log(`   back   → http://localhost:${Port}`);
        console.log(`   web → http://localhost:${Port}`);
        console.log(`\n   Pressione CTRL+C para parar.\n`);
        console.log(`\n   Desenvolvido por Henrique`);
    });
}

startServer();