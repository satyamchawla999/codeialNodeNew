const { Console } = require('console');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String 
    }
},{
    timestamps: true
});


// let storage = multer.diskStorage ( {
//     destination: function( req, file, cb) {
//         cb(null,path.join(__dirname,'..',AVTAR_PATH));
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

//   let imageUpload = multer({
//     storage: storage,
//     limits: {
//       fileSize: 1000000 // 1000000 Bytes = 1 MB
//     },
//     fileFilter(req, file, cb) {
//       if (!file.originalname.match(/\.(png|jpg)$/)) { 
//          // upload only png and jpg format
//          return cb(new Error('Please upload a Image'))
//        }
//      cb(undefined, true)
//   }
// }) 
// console.log(imageUpload);

// statics methods 
userSchema.statics.uploadedAvatar = multer({storage :storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;
// userSchema.statics.imageUpload = imageUpload

const User = mongoose.model('User',userSchema);

module.exports = User