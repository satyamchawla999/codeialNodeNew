// const passport = require('passport');

// const LocalStrategy = require('passport-local').Strategy;

// const User = require('../models/user');

// //authentication using passport
// passport.use(new LocalStrategy({
//         usernameField: 'email',
//         passReqToCallback:true

//     },

//     function(req,email,password,done){
//         // find a user and estabilish the identity
//         User.findOne({email: email},function(err,user){
//             if(err){
//                 console.log('Error in finding user --> Passport');
//                 return done(err);
//             }

//             if (!user || user.password != password ){
//                 console.log('Invalid Username/Password');
//                 return done(null, false);
//             }
            
//             return done(null, user);
//         });
//     }
// ));

// // serializin g the user to decide which key is to be kept in the cookies
// passport.serializeUser(function(user,done){
//     console.log(user.id)
//     done(null, user.id);
// });

// // deserializing the user from the key in the cookies

// passport.deserializeUser(function(id,done){
//     User.findById(id, function(err,user){
//         if(err){
//             console.log("Error in finding user --> Passport");
//             return done(err);
//         }
        
//         return done(null, user);
//     });
// });

// // check if the user is authenticated
// passport.checkAuthentication = function(req,res,next){
//     // if the user is signes in, then pass on the request to the next function(controller's action)
//     if(req.isAuthenticated()){
//         return next();
//     }
//     // if the user is not signed in
//     return res.redirect('/users/sign-in');
// }

// passport.setAuthenticatedUser = function(req,res,next){
//     if(req.isAuthenticated()){
//         //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
//         res.locals.user = req.user;
//         console.log(res.locals.user);
//     }
//     next();
// }

// module.exports = passport;


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true

    },function(req,email,password,done){
        //find user and establish identity
        User.findOne({email:email},function(err,user){
            if(err){
                req.flash('error',err);
                // console.log("error in finding user at passport"); 
            return done(err);
            }

            if(!user || user.password != password){
                req.flash('error','Invalid Username/Password');
                // console.log("invaid username password");
                return done(null,false);
            }

            return done(null,user);
        });
    }
));

//serializing the user to decide  which key is to be ket in cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("error at deserialize");
            return done(err);

        }
        return done(null,user);
    });
})

//check if user is authenticated
passport.checkAuthentication = function(req,res,next){
//used as middleware
//if user is signed in then pass to next function(controllers action)
//console.log("hello1");
    if(req.isAuthenticated()){
    return next();
    }    
    //if not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
//    console.log("hello");
//    console.log("-------",req.user);
    if(req.isAuthenticated()){
        //req user contains curret signed in user from session cookie , we are sening it to locals for views
       
        res.locals.user = req.user;
    //    console.log(res.locals.user);
        

    }
      return next();
}

module.exports=passport;