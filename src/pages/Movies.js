import React, { useState, useEffect } from "react";
import axios from "axios";

function Movies() {
    const [Movies, setMovies] = useState(null);
    const [inputMovies, setInputMovies] = useState({
        id: "",
        title: "",
        description: "",
        year: 2020,
        duration: 120,
        genre: "",
        rating: 0,
        imgurl: "",
    });
    const [search, setSearch] = useState({ title: "" });

    const handleSearch = (e) => {
        var dataMovies = [];
        if (search.title) {
            Movies.filter((x) => {
                return x.title.toLowerCase().indexOf(search.title.toLowerCase()) !== -1
                    ? dataMovies.push(x)
                    : null;
            });
            setMovies(dataMovies);
        } else {
            setMovies(null);
            if (Movies === null) {
                axios
                    .get("http://backendexample.sanbercloud.com/api/movies")
                    .then((res) => {
                        setMovies(res.data);
                    });
            }
        }
    };

    const handleChange = (e) => {
        let typeInput = e.target.name;
        switch (typeInput) {
            case "title": {
                setInputMovies({ ...inputMovies, title: e.target.value });
                break;
            }
            case "description": {
                setInputMovies({ ...inputMovies, description: e.target.value });
                break;
            }
            case "genre": {
                setInputMovies({ ...inputMovies, genre: e.target.value });
                break;
            }
            case "year": {
                setInputMovies({ ...inputMovies, year: e.target.value });
                break;
            }
            case "duration": {
                setInputMovies({ ...inputMovies, duration: e.target.value });
                break;
            }
            case "rating": {
                setInputMovies({ ...inputMovies, rating: e.target.value });
                break;
            }
            case "imgurl": {
                setInputMovies({ ...inputMovies, imgurl: e.target.value });
                break;
            }
            case "search": {
                setSearch({ ...search, title: e.target.value });
                break;
            }
            default: {
                break;
            }
        }
    };

    const submitForm = (e) => {
        e.preventDefault();
        if (inputMovies.id) {
            axios
                .put(
                    `http://backendexample.sanbercloud.com/api/movies/${inputMovies.id}`,
                    {
                        id: inputMovies.id,
                        title: inputMovies.title,
                        description: inputMovies.description,
                        year: inputMovies.year,
                        duration: inputMovies.duration,
                        genre: inputMovies.genre,
                        rating: inputMovies.rating,
                        image_url: inputMovies.imgurl,
                    }
                )
                .then((res) => {
                    if (res.status === 200) {
                        var updateMovies = Movies.find((x) => x.id === inputMovies.id);
                        updateMovies.title = inputMovies.title;
                        updateMovies.description = inputMovies.description;
                        updateMovies.year = inputMovies.year;
                        updateMovies.duration = inputMovies.duration;
                        updateMovies.genre = inputMovies.genre;
                        updateMovies.rating = inputMovies.rating;
                        updateMovies.imgurl = inputMovies.imgurl;

                        setMovies([...Movies]);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios
                .post("http://backendexample.sanbercloud.com/api/movies", {
                    title: inputMovies.title,
                    description: inputMovies.description,
                    year: inputMovies.year,
                    duration: inputMovies.duration,
                    genre: inputMovies.genre,
                    rating: inputMovies.rating,
                    image_url: inputMovies.imgurl,
                })
                .then((res) => {
                    var data = res.data;
                    if (res.status === 201) {
                        setMovies([
                            ...Movies,
                            {
                                title: data.title,
                                description: data.description,
                                year: data.year,
                                duration: data.duration,
                                genre: data.genre,
                                rating: data.rating,
                                imgurl: data.imgurl,
                            },
                        ]);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        setInputMovies({
            title: "",
            description: "",
            year: "",
            duration: "",
            genre: "",
            rating: "",
            imgurl: "",
            id: null,
        });
    };

    const handleEdit = (e) => {
        var idMovies = parseInt(e.target.value);
        var data = Movies.find((x) => x.id === idMovies);
        setInputMovies({
            id: data.id,
            title: data.title,
            description: data.description,
            year: data.year,
            duration: data.duration,
            genre: data.genre,
            rating: data.rating,
            imgurl: data.image_url,
        });
    };

    const handleDelete = (e) => {
        var idMovies = parseInt(e.target.value);
        axios
            .delete(`http://backendexample.sanbercloud.com/api/movies/${idMovies}`)
            .then((res) => {
                var newData = Movies.filter((x) => x.id !== idMovies);
                setMovies(newData);
            });
    };

    useEffect(() => {
        if (Movies === null) {
            axios
                .get("http://backendexample.sanbercloud.com/api/movies")
                .then((res) => {
                    setMovies(res.data);
                });
        }
    }, [Movies]);

    return (
        <div>
            <div style={{ textAlign: "center" }}>
                <input type="text" name="search" onChange={handleChange} />
                <button onClick={handleSearch}> Search </button>
            </div>

            <h1>Tabel Movies</h1>
            <div>
                <table
                    style={{ margin: "10px auto", width: "90%" }}
                    border="1"
                    frame="hsides"
                    rules="rows"
                >
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Year</th>
                            <th>Duration</th>
                            <th>Genre</th>
                            <th>Rationg</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Movies &&
                            Movies.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.title}</td>
                                        <td>
                                            {item.description.length > 40
                                                ? `${item.description.substring(0, 40)} ...`
                                                : item.description}
                                        </td>
                                        <td>{item.year}</td>
                                        <td>{item.duration}</td>
                                        <td>{item.genre}</td>
                                        <td>{item.rating}</td>
                                        <td>
                                            <button value={item.id} onClick={handleEdit}>
                                                Edit
                      </button>
                                            <button value={item.id} onClick={handleDelete}>
                                                Delete
                      </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>

            <div style={{ margin: "0 20%" }}>
                <h1> Movies Form </h1>
                <form style={{ display: "inline-block" }} onSubmit={submitForm}>
                    <div
                        style={{
                            display: "block",
                            marginBottom: "1em",
                        }}
                    >
                        <div
                            style={{
                                display: "inline-flex",
                                width: "150px",
                                fontWeight: "bold",
                                fontSize: "16px",
                            }}
                        >
                            Title
            </div>
                        <input
                            style={{ display: "inline-block" }}
                            type="text"
                            name="title"
                            onChange={handleChange}
                            value={inputMovies.title}
                            required
                        />
                    </div>
                    <div style={{ display: "block", marginBottom: "1em" }}>
                        <div
                            style={{
                                display: "inline-flex",
                                width: "150px",
                                fontWeight: "bold",
                                fontSize: "16px",
                            }}
                        >
                            Description
            </div>
                        <textarea
                            style={{ display: "inline-block" }}
                            type="text"
                            name="description"
                            onChange={handleChange}
                            value={inputMovies.description}
                        />
                    </div>
                    <div style={{ display: "block", marginBottom: "1em" }}>
                        <div
                            style={{
                                display: "inline-flex",
                                width: "150px",
                                fontWeight: "bold",
                                fontSize: "16px",
                            }}
                        >
                            Year
            </div>
                        <input
                            style={{ display: "inline-block" }}
                            type="number"
                            name="year"
                            onChange={handleChange}
                            value={inputMovies.year}
                            min="1980"
                            max="2020"
                        />
                    </div>
                    <div style={{ display: "block", marginBottom: "1em" }}>
                        <div
                            style={{
                                display: "inline-flex",
                                width: "150px",
                                fontWeight: "bold",
                                fontSize: "16px",
                            }}
                        >
                            Duration
            </div>
                        <input
                            style={{ display: "inline-block" }}
                            type="number"
                            name="duration"
                            onChange={handleChange}
                            value={inputMovies.duration}
                        />
                    </div>
                    <div style={{ display: "block", marginBottom: "1em" }}>
                        <div
                            style={{
                                display: "inline-flex",
                                width: "150px",
                                fontWeight: "bold",
                                fontSize: "16px",
                            }}
                        >
                            Genre
            </div>
                        <input
                            style={{ display: "inline-block" }}
                            type="text"
                            name="genre"
                            onChange={handleChange}
                            value={inputMovies.genre}
                            required
                        />
                    </div>
                    <div style={{ display: "block", marginBottom: "1em" }}>
                        <div
                            style={{
                                display: "inline-flex",
                                width: "150px",
                                fontWeight: "bold",
                                fontSize: "16px",
                            }}
                        >
                            Rating
            </div>
                        <input
                            style={{ display: "inline-block" }}
                            type="number"
                            name="rating"
                            onChange={handleChange}
                            value={inputMovies.rating}
                            min="0"
                            max="10"
                        />
                    </div>
                    <div style={{ display: "block", marginBottom: "1em" }}>
                        <div
                            style={{
                                display: "inline-flex",
                                width: "150px",
                                fontWeight: "bold",
                                fontSize: "16px",
                            }}
                        >
                            Image Url
            </div>
                        <textarea
                            style={{ display: "inline-block" }}
                            type="text"
                            name="imgurl"
                            onChange={handleChange}
                            value={inputMovies.imgurl}
                        />
                    </div>
                    <button type="submit">{inputMovies.id ? "Update" : "Submit"}</button>
                </form>
            </div>
        </div>
    );
}

export default Movies;