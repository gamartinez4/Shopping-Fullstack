import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import LoginContainer from "./ui/Login/LoginContainer"
import ProductsContainer from "./ui/Products/ProductsContainer"
import ProcessingPage from "./ui/Processing/ProcessingPage"
import FinalPage from "./ui/Final/FinalPage"

function App() {
  // initialize a browser router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginContainer/>,
    },
    {
      path: "/products",
      element: <ProductsContainer/>,
    },
    {
      path: "/processing",
      element: <ProcessingPage/>,
    },
    {
      path: "/final",
      element: <FinalPage/>,
    },
   
  ])

  return (
      <RouterProvider router={router} />
  )
}

export default App
