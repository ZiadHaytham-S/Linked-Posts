import axios from "axios";

export  function getComment(postId,commmentContent) {

    return axios.post(`https://linked-posts.routemisr.com/comments` , {
        content : commmentContent,
        post : postId
    }, {
        headers: {
            token : localStorage.getItem('token')
        }
    })
    
    
}
export async function deleteCommentApi(commentId) {
    try { 
        const {data} = await axios.delete(`https://linked-posts.routemisr.com/comments/` + commentId , {
            headers:{
                token: localStorage.getItem('token')
            }
        })
        console.log(data);
        return data ;
        
    } catch (err){ 
        console.log(err);
        
    }
}
export async function getPostCommentsApi (postId) {
    try {
        const {data} = await axios.get(`https://linked-posts.routemisr.com/posts/`+postId+'/comments' , {
            headers:{
                token:localStorage.getItem('token')
            }
        })
        console.log(data);
        return data ;
    }catch (err) {
        console.log(err);
        
    }
}
export async function updateCommentApi(body,commentId) {
    try {
        let {data} = await axios.put(`https://linked-posts.routemisr.com/comments/${commentId}`,{
          content:body
        },{
headers:{
    token:localStorage.getItem('token')
}
        })
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        
        
    }
    
} 