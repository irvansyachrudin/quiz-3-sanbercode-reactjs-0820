import React, { useEffect, useState } from "react";
import Logo from "../image/sanber.png";
import { Link } from "react-router-dom";

function Header() {
    const [User] = useState(localStorage.getItem("User") || null);
    useEffect(() => {
        localStorage.getItem("User");
    });

    const handleLogout = (e) => {
        localStorage.removeItem("User");
    };
    return (
        <div>
            <header>
                <img id="logo" src={Logo} alt="gambar" width="200px" />
                <nav style={{ marginRight: "20px" }}>
                    <ul>
                        <li>
                            <Link to="/">Home </Link>
                        </li>
                        <li>
                            <Link to="/about">About </Link>
                        </li>
                        {User ? (
                            <>
                                <li>
                                    <Link to="/movies">Movie List Editor </Link>
                                </li>
                                <li>
                                    <Link to="/" onClick={handleLogout}>
                                        Logout
                  </Link>
                                </li>
                            </>
                        ) : (
                                <>
                                    <li>
                                        <Link to="/login">Login </Link>
                                    </li>
                                </>
                            )}
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Header;