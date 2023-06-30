const User = require('../models/user')
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res){
    User.findById(req.params.id,function(err, user){
        return res.render('user_profile', {
            title: "User Profile",
            user: req.user,
            profile_user: user
        });    
    });

    
    
    // if(req.cookies.user_id){
    //     User.findById(req.cookies.user_id, function(err,user){
    //         if (user){
    //             return res.render('user_profile', {
    //                 title: "User Profile",
    //                 user: user
    //             })
    //         }else{
    //             return res.redirect('/users/sign-in');

    //         }
            
    //     });
        
    // } else { return res.redirect('/users/sign-in'); }
}

module.exports.update = async function(req,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
    //         return res.redirect('back');
    //     });
    // } else{
    //     return res.status(401).send('Unauthorized');
    // }
    
    if(req.user.id == req.params.id){

        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar (req, res , function (err) {
                if(err) {console.log('*******Multer ERROR : ',err);}
                

                // console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    // if (user.avatar){
                    //     fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    // }

                    
                    // this is saving the path of uploaded file in the avtar fields in the user

                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        } catch (err) {
            req.flash('error',err);
            return res.redirect('back');
        }

    } else {
        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorized');
    }
}
// module.exports.explorer = function(req,res){
//     res.end('<h1>Users Explorer</h1>')
// }

// render the sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }

    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    })
}

// render the sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }

    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    });
}



// get the sign up data
module.exports.create = function(req,res){
    
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    
    User.findOne({email: req.body.email}, function(err,user){
        if(err){console.log('error in finding user in signing up'); return;}
        if(!user){
            
            User.create(req.body, function(err,user){
                if(err){console.log('error in finding user in signing up'); return;}
                
                return res.redirect('/users/sign-in');
            });
        }

        else{

            return res.redirect('back');
        }
    });
    
}

// SIGN IN AND CREATE A SESSION FOR THE USER
module.exports.createSession = function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');

}

// module.exports.signOut =function(req,res){
//     User.findByIdAndDelete(req.body.user_id, function(err,user)
//     {
//         if(err){console.log('error in finding user in signing up'); return;}
//         if(!user){
            
            
//                 if(err){console.log('error in finding user in signing up'); return;}
                
//                 return res.redirect('/users/sign-in');
            
//         }

//         else{
//             return res.redirect('back');
//         }
//     });
// }

module.exports.destroySession = async function(req,res,next){
    
    await req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'You have logged out!'); 

        res.redirect('/');
    });

    
}