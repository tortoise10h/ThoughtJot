const express = require('express');

const app = express();

const path = require('path');

const exphdbs = require('express-handlebars');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const methodOverride = require('method-override');

const PORT = 5000;
//router
const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const ideasRouter = require('./routes/ideas');
const usersRouter = require('./routes/users');

//MIDDLEWARES
//handlebars middleware
app.engine('handlebars',exphdbs({defaultLayout: 'main'}));
app.set('view engine','handlebars');

//body parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//static folder
app.use(express.static(path.join(__dirname,'public')));

//method override middleware
app.use(methodOverride('_method'));

//CONNECT DB
mongoose.connect('mongodb://localhost/thoughtjot',{
    useMongoClient: true
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

//PAGE ROUTES
app.use('/',indexRouter);
app.use('/about',aboutRouter);
app.use('/ideas',ideasRouter);
app.use('/users',usersRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
