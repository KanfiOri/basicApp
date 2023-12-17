const mongoose = require('mongoose')

const initDB = async () => {
    const mongoDB = "mongodb://localhost:27017/my_database"
    mongoose.connect(mongoDB)
    .then(() => {
        console.log('conected to db')
    })
    .catch((error) => {
        console.log('Error is: ', error)
    })

    const contactFormSchema = new mongoose.Schema({
        subject: String,
        email: String,
        phone: String,
        message: String
      });  
    return ContactForm = mongoose.model('ContactForm', contactFormSchema)
}

module.exports = initDB