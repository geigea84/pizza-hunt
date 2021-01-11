//18.1.5
const express = require('express');
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

//18.1.5
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/pizza-hunt", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/* In the preceding code, mongoose.connect() tells Mongoose which database we want 
to connect to. If the environment variable MONGODB_URI exists, like on Heroku when 
we deploy later, it will use that. Otherwise, it will short-circuit to the local 
MongoDB server's database at mongodb://localhost/pizza-hunt. The second argument 
in the example is a set of configuration options Mongoose asks for more 
information about. */

//18.1.5 use this to log mongo queries being executed
mongoose.set("debug", true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
