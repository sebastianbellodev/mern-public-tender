import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext.jsx';

function Navbar() {
  const { authenticated, user, logout } = useAuthContext();

  return (
    <nav className="flex justify-start items-center shadow-lg p-5 mt-3 mb-3 w-[90vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] rounded-lg">
      <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl  font-extrabold text-gray-hover hover:text-gray">
        <Link to={authenticated ? '/home' : '/'}>ContrataMun</Link>
      </h1>
      <ul className="flex justify-end gap-3 m-auto w-[80%]">
        {authenticated ? (
          <>
            <li>Welcome {user.username}</li>
            <li>
              <Link
                to="/tasks/new"
                className="bg-indigo-500 font-bold px-4 py-1 rounded-md"
              >
                Add
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => logout()}>
                Sign out
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="p-2 sm:p-2 md:p-3 lg:p-3 rounded-md font-bold bg-gray-hover hover:bg-gray text-white">
              <Link to="/login">Sign in</Link>
            </li>
            <li className="p-2 sm:p-2 md:p-3 lg:p-3 rounded-md font-bold bg-gray-hover hover:bg-gray text-white">
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
