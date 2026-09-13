import { Outlet } from "react-router";
import { Layout } from "antd";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/layout.css";

function MainLayout() {
  return (
    <Layout className="app-layout">
      <Layout.Header>
        <Header />
      </Layout.Header>

      <Layout.Content>
        <main>
          <Outlet />
        </main>
      </Layout.Content>

      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}

export default MainLayout;
