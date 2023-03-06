import React from "react";
import { useHistory } from "react-router-dom";

const Header = () => {
    let history = useHistory();

    return (
        < div className = "header header2" >
            <i style={{ padding: "1rem", cursor: "pointer" }} onClick={() => history.goBack()} class="fa fa-arrow-left" aria-hidden="true"></i>
        </div >
    );
};

export default Header;