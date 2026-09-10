import { Link } from "react-router";
import { Menu } from "antd";

function Header() {
  return (
    <Menu
      mode="horizontal"
      items={[
        {
          key: "board",
          label: <Link to="/">Доска</Link>,
        },
        {
          key: "statistics",
          label: <Link to="/statistics">Статистика</Link>,
        },
      ]}
    />
  );
}

export default Header;
