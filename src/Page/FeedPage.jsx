import React, { useEffect, useState } from 'react'
import { getPostsApi } from '../Services/PostsApi'
import PostCard from '../Components/PostCard';
import LoadingScreen from '../Components/LoadingScreen';
import CreatePost from '../Components/CreatePost';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@heroui/react';

export default function FeedPage() {
 
//  const [posts, setPosts] = useState([])

//  async function getApi() {

//   const response = await getPostsApi();
//    setPosts(response.posts)

//  }

//  useEffect(()=> {

//   getApi()

//  } , [])

  const {data : posts , isLoading , isFetching , isError , error , refetch} = useQuery({
    queryKey : ['posts'] , 
    queryFn : getPostsApi , 
    select : (data) => data?.data.posts,
    retry: 0 ,
    refetchOnMount : false ,
    refetchOnReconnect : false ,
    refetchOnWindowFocus: false , 
    gcTime : 5000,
    // enabled : false
    

  })



return <>
     {/* <Button onPress={refetch}>Connecting</Button>
   <div className="text-center text-3xl mb-4">
    <h2>isLoading :{''+ isLoading}</h2>
    <h2>isFetching :{''+ isFetching}</h2>
    <h2>isError :{''+ isError}</h2>
   </div> */}


{/* 
   <div className="w-2xl mx-auto">

        <CreatePost callback={getApi}/>
    
      {posts.length == 0 ? <LoadingScreen/> :posts.map((post) => <PostCard callback={getApi} commentLimit={1} post={post} key={post.id} /> )}
      

   
</div> */}
        <div className="w-full max-w-2xl mx-auto px-4 md:px-0 min-h-screen bg-gray-50 dark:bg-gray-900">
          <CreatePost callback={refetch}/>

        {isLoading ? <LoadingScreen/> : isError? <div className="text-center">
          <h2 className='text-center text-red-500 text-2xl md:text-5xl dark:text-red-400 '>
            {error.message}
          </h2>
            <Button onPress={refetch}>Retry</Button>
        </div> :
        posts?.map((post) => <PostCard commentLimit={1} post={post} key={post.id} callback={refetch} /> )}

        </div>

    


  </>
}
