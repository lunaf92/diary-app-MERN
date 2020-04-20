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
const PageSchema = new schema({
    diary:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    date:{
        type: String,
        default: getTodayDate()
    }
});

module.exports = mongoose.model('page', PageSchema);