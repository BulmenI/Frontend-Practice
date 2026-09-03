import { Route, Routes } from "react-router";
import Todo from "../pages/Todo";
import MainLayout from "../layouts/MainLayout";

function AppRoutes(){
    return(
        <Routes>
        <Route element ={<MainLayout/>}>
            <Route path = "/" element = {<Todo/>}/>
        </Route>
    </Routes>
    );

}
export default AppRoutes;
