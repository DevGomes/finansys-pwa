const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;
const URI_DIST_APP = `${__dirname}/dist/finansys`;

app.use(express.static(URI_DIST_APP));

app.get('/*', (_, res) => {
    res.sendFile(`${URI_DIST_APP}/index.html`)
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});