import { Outlet } from "react-router-dom";
import Header from "./Component/Header";
import Footer from "./Component/Footer";

export default function Layout(){
    return(
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    );
}