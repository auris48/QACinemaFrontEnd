import { Link } from 'react-router-dom'

export function Navbar(){
    return <nav>
        <div className='leftdiv'>
        <img src="/logo.jpg" alt="qalogo" />
        </div>

        <div className='centerdiv'>
        <Link className = 'link' to = "/">Home</Link>
        <Link className = 'link' to = "/directions">Directions</Link>
        <Link className = 'link' to = "/example">Example</Link>
        <Link className = 'link' to = "/DiscussionBoard">Discussion Board</Link>
        </div>

        <div className='rightdiv'>
        <Link className = 'link' to = "/login">Log in</Link>
        <Link className = 'link' to = "/signup">Sign up</Link>
        </div>




    </nav>
}