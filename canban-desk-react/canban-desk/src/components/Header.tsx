import { Link } from "react-router";

function Header() {
    return (
        <header className="header">
            <div className="header__container">

                <Link to="/" className="header__logo">
                    Kanban Desk
                </Link>

                <nav className="header__nav">
                    <Link to="/">Board</Link>
                    <Link to="/about">About</Link>
                </nav>

            </div>
        </header>
    );
}

export default Header;