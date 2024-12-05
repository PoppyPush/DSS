const express = require('express');
const bodyParser = require('body-parser');
const dssRoutes = require('./routes/dss');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Template Engine
app.set('view engine', 'ejs');

// Routes
app.use('/', dssRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
