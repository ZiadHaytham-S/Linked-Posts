
import CardPostBody from './Card/CardPostBody'
import CardPostFooter from './Card/CardPostFooter'
import Comment from './Comment'
import CardPostHeader from './Card/CardPostHeader'
import { Button , Input } from '@heroui/react'
import { useContext, useState } from 'react'
import { getComment, getPostCommentsApi } from '../Services/commentService'
import { AuthContext } from '../Contexts/AuthContext'
import DropDownList from './DropDownList'
import CreatePost from './CreatePost'


export default function PostCard({post , commentLimit , callback}) {

  const [commentContent, setCommentContent] = useState('')
  const [Loading, setLoading] = useState(false)
  const [comment, setComment] = useState(post.comments)
  const [isUpdating, setIsUpdating] = useState(false)

 const {userData} = useContext(AuthContext)
  
  async function createComment(e) {

    e.preventDefault();
    setLoading(true)
      const response = await getComment(post.id, commentContent);
      

      if (response.message) {
          setComment(response.comments)
        // await callback()
        setCommentContent('')
      }
      
    setLoading(false)

  }



  async function getPostComments() {
      const response =await  getPostCommentsApi(post.id);
      setComment(response.comments)
  }
  

  return <>

{isUpdating ? <CreatePost callback={callback} isUpdating={isUpdating} setIsUpdating={setIsUpdating} post={post}/> : 
<div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5 overflow-hidden">
    <div className="w-full h-16  items-center flex justify-between ">
     
       <CardPostHeader photo={post.user.photo} name={post.user.name} date={post.createdAt}/>
       
{ userData._id === post.user._id &&   <DropDownList postId={post.id} callback={callback} isUpdating={isUpdating} setIsUpdating={setIsUpdating} />  } 
</div>
  <CardPostBody body={post.body} image={post.image}/>
    <CardPostFooter postId={post.id} commentsNumber={comment.length}/>
     <form onSubmit={createComment} className='flex gap-4 mb-4' >

       <Input value={commentContent} onChange={(e)=> setCommentContent(e.target.value)}  variant='bordered' placeholder='Comment....'/>
      <Button isLoading={Loading} type='submit' disabled={commentContent.length < 2 }  color='primary'>Add Comment</Button>

     </form>
      {comment.length > 0 && 
       comment.slice(0,commentLimit).map((comment)=> 
       <Comment setComment={setComment}  callback={getPostComments} postUserId={post.user._id} comment={comment} key={comment._id}/>)}
    
  </div> } 
 


  </>
}
