import React from "react";

import Header from "../components/MainHeader";
import Body from "../components/MainBody";
import Footer from "../components/Footer";
const MainHome = ({info}) => (
  <>
    {/* navBar */}
    <Header />

    {/* body */}
    <Body info={info} />

    {/* footer */}
    <Footer />
  </>
);

export default MainHome;