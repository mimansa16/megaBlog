import React from "react"
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function Header() {
  const authStatus = useSelector((state) => state.auth.status) //useSelecter is used to fetch data from out <store />
  const navigate = useNavigate(); //useNavigate hook returns a function that lets you navigate programmatically along the diff 
  //objects present inside the array, these objects are coma separated inside the array given to it.

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex"> 
          <div className="mr-4">
            <Link to='/'>
              <Logo width='70px'/>
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? ( // jo html element repeat ho rha hota hai vaha pe keys use karni hoti hain. therefore <li> me keys use karenge
                <li key={item.name}> 
                 <button
                 onClick={() => navigate(item.slug)}
                 className="'inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                 >{item.name}</button> 
                </li>
              ) : null
            )}
            {authStatus && (
              //this && means ki jab authStatus true hoga tabhi is() ke anadar jo kuch bhi likha hai vo execute hoga
              <li>
               <LogoutBtn />
              </li>
            )} 
          </ul>
        </nav>
      </Container>
    </header>
  )
}
export default Header