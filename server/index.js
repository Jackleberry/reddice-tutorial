import express from 'express';
import open from 'open';
import path from 'path';

let port = 3003;
let app = express();

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
  open(`http://localhost:${port}`);
});
