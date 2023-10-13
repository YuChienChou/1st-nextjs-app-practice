import { Fragment } from "react";
import MainHeader from "./main-header";
import { Main } from "next/document";


function Layout(props) {
    return (
        <Fragment>
            <MainHeader />
            <main>
                {props.children}
            </main>
        </Fragment>
    )
}


export default Layout;