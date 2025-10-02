const express = require('express');
const app = express();
const port = 3000;

const TOKEN = "meinSuperGeheimerToken123";
let lastCommand = "x";

app.use(express.json());

app.post('/api/control', (req, res) => {
  const { token, cmd } = req.body;
  if (token !== TOKEN) return res.status(403).send("Ungültiger Token");
  lastCommand = cmd;
  res.send("Befehl empfangen");
});

app.get('/api/state', (req, res) => {
  res.send(lastCommand);
});
app.listen(port, () => console.log(`API läuft auf Port ${port}`));
