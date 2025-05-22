
const Header = () => {
  return (
    <div className="Header w-full bg-blue-100  ">
        <nav className="flex items-center p-4 z-10   ">
        <img src="/Logo.jpg"  className="logo" />
          <ul
            className=" w-full grid grid-cols-4 grid-rows-1 gap-4
        cursor-pointer pl-10"
          >
            
          </ul>
          <ul className=" w-60 grid grid-cols-2 grid-rows-1 gap-5 cursor-pointer ">
          <li className="  text-2xl w-25 pl-5 h-10 pt-1 shadow list-none text-amber-50 bg-blue-300" onClick={() => {window.location.href="/login"}}>Login</li>
          <li className="  text-2xl w-25 pl-5 h-10 pt-1 shadow list-none text-amber-50 bg-blue-300" onClick={() => {window.location.href="/register"}}>SignUp</li>
          </ul>
        </nav>

          </div>
  )
}

export default Header