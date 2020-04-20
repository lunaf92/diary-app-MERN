const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const diaries = require('./routes/api/diaries');

const app = express();

// BodyParser Middleware
app.use(express.json());

// DB confg
const db = require('./config/keys').mongoURI;

// connect to mongo
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(()=> console.log('MongoDB connected..'))
    .catch(err=> console.log(err))

// Use routes
app.use('/api/diaries', diaries)

// Serve static assets if in production
if(process.env.NODE_ENV ==='production'){
    // set static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res)=> {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log('server started on port ' + port))