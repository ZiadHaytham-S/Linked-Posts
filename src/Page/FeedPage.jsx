import React, { useEffect, useState } from 'react'
import { getPostsApi } from '../Services/PostsApi'
import PostCard from '../Components/PostCard';
import LoadingScreen from '../Components/LoadingScreen';
import CreatePost from '../Components/CreatePost';

export default function FeedPage() {
 
 const [posts, setPosts] = useState([])

 async function getApi() {

  const response = await getPostsApi();
   setPosts(response.posts)

 }

 useEffect(()=> {

  getApi()

 } , [])

return <>
  

   <div className="w-2xl mx-auto">

        <CreatePost callback={getApi}/>
    
      {posts.length == 0 ? <LoadingScreen/> :posts.map((post) => <PostCard callback={getApi} commentLimit={1} post={post} key={post.id} /> )}
      

   
</div>

  </>
}
