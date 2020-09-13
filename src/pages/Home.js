import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
    const [dataFilm, setdataFilm] = useState(null);

    useEffect(() => {
        if (dataFilm === null) {
            axios
                .get("http://backendexample.sanbercloud.com/api/movies")
                .then((res) => {
                    setdataFilm(res.data);
                });
        }
    }, [dataFilm]);

    return (
        <div>
            {/* <Header /> */}
            <h1>Daftar Film Film Terbaik</h1>
            <div id="article-list">
                {dataFilm &&
                    dataFilm.map((item, i) => {
                        return (
                            <div key={i} className="article">
                                <h3>{item.title}</h3>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <img
                                                    style={{
                                                        backgroundSize: "cover",
                                                        width: "500px",
                                                        overflow: "hidden",
                                                    }}
                                                    src={item.image_url}
                                                    alt=""
                                                />
                                            </td>
                                            <td style={{ textAlign: "start" }}>
                                                <strong> Rating: {item.rating}</strong>
                                                <br />
                                                <strong>
                                                    Durasi: {(item.duration / 60).toFixed(2)} Jam
                        </strong>
                                                <br />
                                                <strong> Genre: {item.genre}</strong>
                                                <br />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p>
                                    <strong> Deskripsi : </strong>
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default Home;