// console.log('home post comment')


// {
//     let createComment = function(){
//         let newCommentForm = $('#new-comment-form');

//         newCommentForm.submit(function(e){
//             e.preventDefault();

//             $.ajax({
//                 type: 'post',
//                 url: '/comments/create',
//                 data: newCommentForm.serialize(),
//                 success: function(data){
//                     console.log(data);
//                     let newComment = newCommentDom(data.data.comment);
                    

//                     $('#post-comments-list').prepend(newComment);
//                     deleteComment($(' .delete-comment-button', newComment));

//                     new Noty({
//                         theme: 'relax',
//                         text: "Comment published !!!",
//                         type: 'success',
//                         layout: 'topRight',
//                         timeout: 1500
                        
//                     }).show();
                    
//                 }, error: function(error){
//                     console.log(error.responseText);
//                 }
//             });
//         });
//     }

//     // Method to create comment in dom 
//     let newCommentDom = function(comment) {
//         console.log('new comment dom')
//         return $(`  <li id="comment-${comment._id}">
//                         <p>
//                             <small>
//                                 <a class='delete-comment-button' href="comments/destroy/${comment._id}">X</a>
//                             </small>

//                             ${comment.content}

//                             <br>
//                             <small>
//                                 ${comment.user.name}
//                             </small>
//                         </p>
//                     </li>`);
//     }

//     // method to delete a comment from DOM
//     let deleteComment = function(deleteLink){
//         $(deleteLink).click(function(e){
//             e.preventDefault();

//             $.ajax({
//                 type: 'get',
//                 url: $(deleteLink).prop('href'),
//                 success: function(data){
//                     $(`#comment-${data.data.comment_id}`).remove();

//                     new Noty({
//                         theme: 'relax',
//                         text: "Comment Deleted !!!",
//                         type: 'success',
//                         layout: 'topRight',
//                         timeout: 1500
                        
//                     }).show();
//                 },error: function(error){
//                     console.log(error.responseText);
//                 }
//             });

//         });
//     }

//     createComment();
// }

 

console.log('home post comment');

{
    let createComment = function(){
        let newCommentForm = $('#new-comment-form');

        newCommentForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newComment = newCommentDom(data.data.comment);
                    $('#post-comments-list>ul').prepend(newComment);
                    deleteComment($('.delete-comment-button', newComment));

                    new Noty({
                        theme: 'relax',
                        text: "Comment published !!!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                    
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // Method to create comment in dom 
    let newCommentDom = function(comment) {
        console.log('new comment dom')
        return $(`  <li id="comment-${comment._id}">
                        <p>
                            <small>
                                <a class='delete-comment-button' href="comments/destroy/${comment._id}">X</a>
                            </small>

                            ${comment.content}

                            <br>
                            <small>
                                ${comment.user.name}
                            </small>
                        </p>
                    </li>`);
    }

    // method to delete a comment from DOM
    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted !!!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

    createComment();
}