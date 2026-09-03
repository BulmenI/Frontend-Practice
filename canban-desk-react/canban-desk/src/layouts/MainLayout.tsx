import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";

function MainLayout(){

    return(
        <>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>

        </>
    );
}


export default MainLayout;