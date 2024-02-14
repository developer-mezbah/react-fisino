import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './Router/Router';
import Home from './Components/Home/Home';
import 'animate.css';
import Products from './Components/ProductsPage/Products';
import About from './Components/AboutPage/About';
import Cart from './Components/CartPage/Cart';
import Message from './Components/OrderConfirmMessage/Message';
import Coming from './Components/ComingSoonPage/Coming';
import Register from './Components/Account/Register/Register';
import Login from './Components/Account/Login/Login';
import PrivateRouter from './Components/PrivateRouter/PrivateRouter';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Router></Router>,
      children: [
        {
          path: '/',
          element: <Home></Home>,
          loader: async () => {
            return await fetch(`${import.meta.env.VITE_OST_URL}/services`)
          }
        },
        {
          path: '/products',
          element: <Products></Products>,
          loader: async () => {
            return await fetch(`${import.meta.env.VITE_OST_URL}/services`)
          }
        },
        {
          path: '/about',
          element: <About></About>
        },
        {
          path: '/cart/:id',
          element: <PrivateRouter><Cart></Cart></PrivateRouter>,
          loader: async ({params}) => {
            return await fetch(`${import.meta.env.VITE_OST_URL}/services/${params.id}`)
          }
        },
        {
          path: '/account',
          element: <Register></Register>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/complete',
          element: <Message></Message>
        },
        {
          path: '*',
          element: <Coming></Coming>
        }
      ]
    }
  ])


  return (
    <>
      <RouterProvider router={router}></RouterProvider>

    </>
  )


}

export default App
