import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from "./Layouts/MainLayout"
import AuthLayout from "./Layouts/AuthLayout"
import FeedPage from "./Page/FeedPage"
import ProfileDetailsPage from "./Page/ProfileDetailsPage"
import PostDetailsPage from "./Page/PostDetailsPage"
import NotFoundPage from "./Page/NotFoundPage"
import Register from "./Page/Register"
import Login from "./Page/Login"
import ProductedRoute from "./Page/ProductedRoute"
import AuthProductedRoute from "./Page/AuthProductedRoute"
import TestHook from "./Page/TestHook"

const router = createBrowserRouter([
  {path: '' , element: <MainLayout/>, children: [
    {index: true , element: <ProductedRoute><FeedPage/></ProductedRoute>},
    {path: 'profile' , element: <ProductedRoute><ProfileDetailsPage/></ProductedRoute>},
    {path: 'post-details/:id' , element: <ProductedRoute><PostDetailsPage/></ProductedRoute>},
    {path: 'test-hook' , element: <ProductedRoute><TestHook/></ProductedRoute>},
    {path: '*' , element: <NotFoundPage/>}
  ]},
  {path: '' , element: <AuthLayout/> , children:[
    {path:'register', element: <AuthProductedRoute><Register/></AuthProductedRoute>},
    {path:'login', element: <AuthProductedRoute><Login/></AuthProductedRoute>}
  ]}
])
function App() {
  

  return <>
<RouterProvider router={router}>

  <h2 className="text-center text-2xl">App Component</h2>

</RouterProvider>
  </>
}

export default App
