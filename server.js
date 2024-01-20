const express =  require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Set environment variables
const PORT = process.env.PORT || 3001;
const app = express();

// Sse middlerware to parese JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use api routes
app.use(routes);

// Connect to database and server
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
