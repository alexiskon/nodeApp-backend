const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1"27017/wishlist', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true ,
    useFindAndModify: false
})
// fsafasfas