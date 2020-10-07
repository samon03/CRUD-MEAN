const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CrudDB', (err) => {
    if (!err) {
        console.log('===== Connected!! =====');
    } else {
        console.log('===== Error!! =====' + JSON.stringify(err, undefined, 2));
    }
});

module.exports = mongoose;