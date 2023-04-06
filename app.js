const express = require("express");
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogsRouter = require('./routes/blogRoutes')

const app = express()
const hostname = '127.0.0.1';
const port = 3000;

//connect to mongoDB

const dbUri = 'mongodb+srv://cohoster:ZZjWkprNe0A8N1Cq@cohosternode.ss3fam3.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbUri)
    .then((result) => app.listen(port))
    .catch((error) => console.log(error))

app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

//blog routes

app.use('/blogs', blogsRouter)

app.get('/', (req, resp) => {
    resp.redirect('/blogs')
})

app.get('/about', (req, resp) => {
    resp.render('about', { title: 'About' })
})


app.use((req, resp) => {
    resp.status(404).render('404', { title: '404' })
})