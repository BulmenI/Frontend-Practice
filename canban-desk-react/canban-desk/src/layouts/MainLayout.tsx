import { Outlet } from "react-router";
import { Layout } from "antd";
import Footer from "../components/Footer";
import Header from "../components/Header";

function MainLayout() {
  return (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}

export default MainLayout;
