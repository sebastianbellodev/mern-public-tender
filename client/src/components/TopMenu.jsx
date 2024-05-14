import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext.jsx';

function TopMenu() {
  const { authenticated, user, logout } = useAuthContext();
  const navigate = useNavigate();

  function handleClick(route) {
    navigate(route);
  }

  return (
    <nav className="flex items-baseline shadow-lg p-5 mt-3 mb-3 w-[90vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] rounded-lg">
      <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl  font-extrabold text-gray-hover hover:text-gray">
        <Link to={authenticated ? '/home' : '/'}>ContrataMun</Link>
      </h1>
      <ul className="flex items-center justify-end gap-3 m-auto w-[80%]">
        {authenticated ? (
          <>
            <li className="text-[70%] sm:text-[70%] md:text-[90%] lg:text-[100%]">
              Welcome <b>{user.username}</b>
            </li>
            <li>
              <button
                type="button"
                className="p-2 sm:p-2 md:p-3 lg:p-3 rounded-md font-bold bg-gray-hover hover:bg-gray text-white"
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
                className="p-2 sm:p-2 md:p-3 lg:p-3 rounded-md font-bold bg-gray-hover hover:bg-gray text-white"
              >
                Sign in
              </button>
            </li>
            <li>
              <button
                type="button"
                className="p-2 sm:p-2 md:p-3 lg:p-3 rounded-md font-bold bg-gray-hover hover:bg-gray text-white"
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
