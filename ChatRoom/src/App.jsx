import Login from "./login"
import Chatbox from "./chatbox"
import Homepage from "./homepage";
import NewChatBox from './NewChatBox'
import Navbar from "./navbar";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/chatbox",
    element: < Chatbox />,
  },
  {
    path: "/Homepage",
    element: < Homepage />,
  },
  {
    path: "/PersonalChatRoom",
    element: <NewChatBox/>,
  }

]);
export default function App() {
  return (
    <RouterProvider router={router} />
  )
}