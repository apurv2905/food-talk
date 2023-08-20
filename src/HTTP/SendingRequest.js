import React, { useCallback, useEffect, useState } from "react";

const SendingRequest = () => {
    const [movies, setMovies] = useState([]);

    // using 1st then()...
    // json data looks seimilar to js object using json we can change json data into js object using
    // built in method json().

    function fetchMoviesHandler() {
        fetch("/url")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const transformMovies = data.results.map((movieData) => {
                    return {
                        id: movieData.episode_id, // here episode_id is used by json and using 2nd then we can convert it to 'id'.
                        title: movieData.title,
                    };
                });
            });
        setMovies(transformMovies);
    }
    // Both are same just used asynchronous and await
    async function fetchMoviesHandler() {
        try {
            const response = await fetch("/url");
            const data = await response.json();

            const transformMovies = data.results.map((movieData) => {
                return {
                    id: movieData.episode_id, // here episode_id is used by json and using 2nd then we can convert it to 'id'.
                    title: movieData.title,
                };
            });

            setMovies(transformMovies);
        } catch (error) {}
    }

    // while using useEffect() use useCallback fxn to avoid ends up in infinite loop.
    const fetchMoviesHandler = useCallback(async () => {})
    useEffect(() => {
        fetchMoviesHandler;
    }, [fetchMoviesHandler])

    return <div></div>;
};
