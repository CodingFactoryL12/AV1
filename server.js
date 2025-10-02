const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// 🔐 Token-Schutz
const TOKEN = "meinSuperGeheimerToken123";
let lastCommand = "x";

// 📦 Middleware
app.use(express.json());

// 📄 Website direkt aus Hauptverzeichnis servieren
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ✅ API zum Setzen des Befehls
app.post('/api/control', (req, res) => {
  const { token, cmd } = req.body;
  if (token !== TOKEN) return res.status(403).send("Ungültiger Token");
  lastCommand = cmd;
  res.send("Befehl empfangen");
});

// ✅ API zum Abfragen durch Raspberry Pi
app.get('/api/state', (req, res) => {
  res.send(lastCommand);
});

// 🚀 Server starten
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
