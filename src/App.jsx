import { createBrowserRouter , RouterProvider } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup"

const router = createBrowserRouter([
  {
    path : '/',
    element : <Login/>
  },
  {
    path : '/home',
    element : <HomePage/>
  },
  {
    path: '/signup',
    element : <Signup/>
  }
])

function App () {

  return <RouterProvider router = {router} />
}

export default App
