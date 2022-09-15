import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { loginContext } from './appContext/Context'
import { Logout } from './pages/logout';

export function Navbar() {
    const { loggedIn, setLoggedIn } = useContext(loginContext);
    return <nav>
        <div className='leftdiv'>
            <img src="/logo.jpg" alt="qalogo" />
        </div>

        <div className='centerdiv'>
            <Link className='link' to="/">Home</Link>
            <Link className='link' to="/directions">Directions</Link>
            <Link className='link' to="/example">Example</Link>
        </div>


        {loggedIn ? <div>
            <Logout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </div> :
            <div className='rightdiv'>
                <Link className='link' to="/login">Log in</Link>
                <Link className='link' to="/signup">Sign up</Link>
            </div>}





    </nav>
}