import React from "react";

function About() {
    return (
        <div>
            <div style={{ padding: "10px", border: "1px solid #ccc" }}>
                <h1 style={{ textAlign: "center" }}>
                    Data Peserta Sanbercode Reactjs 0820
        </h1>
                <ol>
                    <li>
                        <strong style={{ width: "120px" }}>Nama:</strong>Irvan Syachrudin
                    </li>
                    <li>
                        <strong style={{ width: "120px" }}>Email:</strong>{" "}
            irvansyachrudin97@gmail.com
                    </li>
                    <li>
                        <strong style={{ width: "120px" }}>
                            Sistem Operasi yang digunakan:
            </strong>
            Windows 10
          </li>
                    <li>
                        <strong style={{ width: "120px" }}>Akun Github:</strong> irvansyachrudin
          </li>
                    <li>
                        <strong style={{ width: "120px" }}>Akun Telegram:</strong> @irvansyachrudin
          </li>
                </ol>
            </div>
        </div>
    );
}

export default About;