import { Link } from "react-router";

function Header() {
    return (
        <header className="header">
            <div>

                <Link to="/" className="header-logo">
                    Kanban Desk
                </Link>

                <nav className="header-nav">
                    <Link to="/">Board</Link>
                    <Link to="/statistics">Statistics</Link>
                </nav>

            </div>
        </header>
    );
}

export default Header;