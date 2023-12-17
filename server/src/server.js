const express = require('express')
const initDB = require('./db')
const cors = require('cors')

const setUpServer = () => {
const app = express()
let ContactForm;
app.use(express.json())
app.use(cors())
initDB()
.then((res) => {
    ContactForm = res
})
.catch((e) => {
    console.error('error: ', e)
})

app.get('/check', (req, res) => {
    res.send('Server is runing')
})

app.post('/addContactForm', async (req, res) => {
    try{
        const newDocument = {
            subject: req.body.subject,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message
        }
        const contactForm = new ContactForm(newDocument)
        await contactForm.save()
        res.send('created')
    } catch(e) {
        console.error('error is: ', e)
    }
})

app.get('/contactForms', async (req, res) => {
    try{
        const contactForm = await ContactForm.find()
        res.json(contactForm)
    } catch (error) {
        res.status(500).json({error})
    }
})

app.listen(5000, () => {
    console.log('sevrer is runing on port 5000')
})
}

module.exports = setUpServer