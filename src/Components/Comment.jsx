import React, { useContext } from 'react'
import CardPostHeader from './Card/CardPostHeader'
import { AuthContext } from '../Contexts/AuthContext'
import DropDownList from './DropDownList'

export default function Comment({comment , postUserId , callback}) {
    const {userData} = useContext(AuthContext)
  return <>
  
          <div className="bg-gray-100 p-4 -mx-3 -mb-3">


           <div className="w-full h-16  items-center flex justify-between ">
    
        <CardPostHeader photo={comment.commentCreator.photo}
         name={comment.commentCreator.name}
          date={comment.createdAt}/>


{ userData._id === comment.commentCreator._id && userData._id === postUserId &&  <DropDownList callback={callback} commentId={comment._id}/>} 

  </div>

          <p className='p-2 pb-0'>{comment.content}</p>


      </div>
  
  </>
}
