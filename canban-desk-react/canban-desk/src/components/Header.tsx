import { Link } from "react-router";
import { Menu } from "antd";

function Header() {
  return (
    <Menu
      mode="horizontal"
      items={[
        {
          key: "board",
          label: <Link to="/">Board</Link>,
        },
        {
          key: "statistics",
          label: <Link to="/statistics">Statistics</Link>,
        },
      ]}
    />
  );
}

export default Header;
