const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req,res) {

    try {
        let post = await Post.findById(req.body.post);
        
        if(post) {

            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();

            if (req.xhr){
                comment = await comment.populate('user', 'name');
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment created!"
                });
                
            }

            req.flash('success',"Comment published!");
            return res.redirect('back');
        }

    } catch(err) {
        req.flash('error',err);
        return res.redirect('back');
    }

    // Post.findById(req.body.post,function(err,post){
    //     if(err){
    //         console.log('error in finding a post'); return;
    //     }
    //     if(post){
    //         Comment.create({
    //             content: req.body.content,
    //             post: req.body.post,
    //             user: req.user._id
    //         },function(err,comment){
    //             // handel error
    //             if(err){
    //                 console.log('error in finding a comment'); return;
    //             }
    //             post.comments.push(comment);
    //             post.save();
    //             res.redirect('/');
    //         });
    //     }
    // });
}

module.exports.destroy = async function(req, res){

    try{

        let comment = await Comment.findById(req.params.id)

        if(comment.user == req.user.id) {

            let postId = comment.post;
            comment.remove();
            let post = Post.findByIdAndUpdate(postId,{ $pull:{comments:req.params.id}})

            if(req.xhr){
                
                return res.status(200).json({
                    data:{
                        comment_id:req.params.id
                    },
                    message: "Comment deleted successfully"
                })
            }
                
            req.flash('success',"Comment deleted!");
            return res.redirect('back');

        } else {
            req.flash('error','You cannot delete this comment');
            return res.redirect('back');
        }

    } catch(err) {
        req.flash('error',err);
        return res.redirect('back');
    }

    // Comment.findById(req.params.id,function(err,comment){
    //     if(comment.user == req.user.id){
    //         let postId = comment.post;
    //         comment.remove();
    //         Post.findByIdAndUpdate(postId,{ $pull:{comments:req.params.id}},function(err,post){
    //             return res.redirect('back');
    //         });
    //     } else {
    //         return res.redirect('back');
    //     }
    // });
}