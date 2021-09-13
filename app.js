const express = require('express'); // express for server //
const app = express(); // Express App initiate //
const PORT = process.env.PORT || 3001; // server PORT //
const path = require('path');
app.use(express.json());    // incoming request as JSON OBJECTS //
app.use(express.urlencoded({ extended: true }));    // incoming POST/PUT as STRINGS or ARRAYS //
app.use(express.static(path.join(__dirname, 'assets')));    // set directory as static //


app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
