// Connect to the database
const mongoose = require('mongoose');

// Connect to the Mongo DB
mongoose.connect(process.env.MONOGDB_URI || '',{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

// Export the connection as a module
module.exports = mongoose.connection