const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passpostJwt = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo')
// (session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle: 'extended',
    prefix : '/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());

//extract style and scripts from sub pages into the layout

app.use(express.static('./assets'));

// make the uploads available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//Set up the view engine
app.set('view engine','ejs');
app.set('views','./views');



app.use(session({
    name:'codeial',
    // TODO change the secret before deployement in production mode
    secret: 'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie: {
        maxAge: (1000 * 60 *100)
    },
    store: MongoStore.create(
        {
            // mongooseConnection: db,
            mongoUrl:'mongodb://0.0.0.0:27017/codeial_development'            ,

            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err} `);
    }
    console.log(`Server is running on port : ${port} `);
})