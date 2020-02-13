import path from 'path'
import express from 'express'
import sockets from "./sockets/index.js"

const app = express();

const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const server = app.listen(port, () => console.log('App listening on port: ' + port));

app.use(express.static(DIST_DIR));

sockets(server)

app.get('*', (req, res) => {
	res.sendFile(HTML_FILE);
});