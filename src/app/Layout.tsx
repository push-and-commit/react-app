import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => (
    <div>
        <Header />
        <Outlet />
        <Footer />
    </div>
);

export default Layout;