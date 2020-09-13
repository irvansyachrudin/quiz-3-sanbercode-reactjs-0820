import React, { useState } from "react";
function Login() {
    const [User, setUser] = useState({ username: "", password: "" });
    const handleLogin = (e) => {
        localStorage.setItem("User", User.username);
        window.location.href = "/";
    };
    const hadnleOnChange = (e) => {
        var inputType = e.target.name;
        switch (inputType) {
            case "username": {
                setUser({ ...User, username: e.target.value });
                break;
            }
            case "password": {
                setUser({ ...User, password: e.target.value });
                break;
            }
            default: {
                break;
            }
        }
    };
    return (
        <div style={{ padding: "10px", border: "1px solid #ccc" }}>
            <h1 style={{ textAlign: "center" }}>Silakan Login</h1>
            <div>
                <div style={{ display: "block", marginBottom: "1em" }}>
                    <div
                        style={{
                            display: "inline-block",
                            fontWeight: "bold",
                        }}
                    >
                        Username
          </div>
                    <input
                        style={{ display: "inline-block" }}
                        type="text"
                        name="username"
                        onChange={hadnleOnChange}
                        required
                    />
                    <div style={{ display: "block", marginBottom: "1em" }}>
                        <div
                            style={{
                                display: "inline-block",
                                fontWeight: "bold",
                            }}
                        >
                            Password
            </div>
                        <input
                            style={{ display: "inline-block" }}
                            type="password"
                            name="password"
                            onChange={hadnleOnChange}
                            required
                        />
                    </div>

                    <button onClick={handleLogin}> Login </button>
                </div>
            </div>
        </div>
    );
}

export default Login;