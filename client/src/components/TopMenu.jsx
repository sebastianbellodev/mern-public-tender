import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext.jsx';

function TopMenu() {
  const { authenticated, user, logout } = useAuthContext();
  const navigate = useNavigate();

  function handleClick(route) {
    navigate(route);
  }

  return (
    <nav className="flex items-center shadow-lg p-5 h-[fit] w-screen bg-gray-333333">
      <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl  font-extrabold text-white hover:text-gray-999999">
        <Link to={authenticated ? '/hirings' : '/login'}>ContrataMun</Link>
      </h1>
      <ul className="flex items-baseline justify-end gap-3 m-auto w-[80%]">
        {authenticated ? (
          <>
            <li className="text-[70%] sm:text-[70%] md:text-[90%] lg:text-[100%] text-white">
              Welcome <b>{user.username}</b>
            </li>
            <li>
              <button
                type="button"
                className="p-2 w-[25vw] sm:p-2 sm:w-[16vw] md:p-3 md:w-[12vw] lg:p-3 lg:w-[8vw] rounded-md font-bold bg-gray-666666 hover:bg-gray-999999 text-white"
                onClick={() => logout()}
              >
                Sign out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button
                type="button"
                onClick={() => handleClick('/login')}
                className="p-2 w-[22vw] sm:p-2 sm:w-[16vw] md:p-3 md:w-[12vw] lg:p-3 lg:w-[8vw] rounded-md font-bold bg-gray-666666 hover:bg-gray-999999 text-white"
              >
                Sign in
              </button>
            </li>
            <li>
              <button
                type="button"
                className="p-2 w-[22vw] sm:p-2 sm:w-[16vw] md:p-3 md:w-[12vw] lg:p-3 lg:w-[8vw] rounded-md font-bold bg-gray-666666 hover:bg-gray-999999 text-white"
              >
                Sign up
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default TopMenu;
