// Connect to the database
const mongoose = require('mongoose');

// Connect to the Mongo DB
mongoose.connect('mongodb://localhost:27017/social-network' || '',{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

// Export the connection as a module
module.exports = mongoose.connection