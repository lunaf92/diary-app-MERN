const mongoose = require('mongoose');
const schema = mongoose.Schema;

const getTodayDate = () => {
    let today = [];
    today.push(new Date().getFullYear());
    today.push(new Date().getMonth() + 1);
    today.push(new Date().getDate());
    return (today = today.join("-"));
  };

// Create a Schema
const DiarySchema = new schema({
    author:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('diary', DiarySchema);