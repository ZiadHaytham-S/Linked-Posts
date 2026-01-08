import React, { useContext, useState } from 'react'
import CardPostHeader from './Card/CardPostHeader'
import { AuthContext } from '../Contexts/AuthContext'
import DropDownList from './DropDownList'
import { Button } from '@heroui/react'
import { updateCommentApi } from '../Services/commentService'

export default function Comment({comment , postUserId , callback}) {
    const {userData} = useContext(AuthContext)
    const [isEditing, setIsEditing] = useState(false)
    const [editContent, setEditContent] = useState(comment.content)
    const [loading, setLoading] = useState(false)

    async function handleUpdateComment() {
      setLoading(true)
      const response = await updateCommentApi(editContent, comment._id)
      if (response.message) {
        setIsEditing(false)
        await callback()
      }
      setLoading(false)
    }

  return <>
  
          <div className="bg-gray-100 dark:bg-gray-700 p-4 -mx-3 -mb-3">


           <div className="w-full h-16  items-center flex justify-between ">
    
        <CardPostHeader photo={comment.commentCreator.photo}
         name={comment.commentCreator.name}
          date={comment.createdAt}/>


{ userData._id === comment.commentCreator._id && userData._id === postUserId &&  <DropDownList callback={callback} commentId={comment._id} setIsUpdating={setIsEditing}/>} 

  </div>

          {isEditing ? (
            <div className='p-2 pb-0 space-y-2'>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className='w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 dark:text-white'
                rows={3}
              />
              <div className='flex gap-2 justify-end'>
                <Button size='sm' onClick={() => setIsEditing(false)} variant='flat'>Cancel</Button>
                <Button size='sm' onClick={handleUpdateComment} isLoading={loading} color='primary'>Save</Button>
              </div>
            </div>
          ) : (
            <p className='p-2 pb-0 dark:text-gray-200'>{comment.content}</p>
          )}


      </div>
  
  </>
}
