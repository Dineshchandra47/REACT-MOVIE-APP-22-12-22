import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./movie.css";

const Movie = () => {
  const [currentMovieDetails, setMovie] = useState();
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
  };

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetails ? currentMovieDetails.backdrop_path : ""
          }`}
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetails ? currentMovieDetails.poster_path : ""
              }`}
            />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">
              {currentMovieDetails ? currentMovieDetails.original_title : ""}
            </div>
            <div className="movie__tagline">
              {currentMovieDetails ? currentMovieDetails.tagline : ""}
            </div>
            <div className="movie__rating">
              {currentMovieDetails ? currentMovieDetails.vote_average : ""}{" "}
              <i className = "fas fa-star" />
              <span className="movie__voteCount">
                {currentMovieDetails
                  ? "(" + currentMovieDetails.vote_count + ") votes"
                  : ""}
              </span>
            </div>
            <div className="movie__runtime">
              {currentMovieDetails ? currentMovieDetails.runtime + " mins" : ""}
            </div>
            <div className="movie__releaseDate">
              {currentMovieDetails
                ? "Release date: " + currentMovieDetails.release_date
                : ""}
            </div>
            <div className="movie__genres">
              {currentMovieDetails && currentMovieDetails.genres
                ? currentMovieDetails.genres.map((genre) => (
                    <>
                    {/* <div key={genre.id}></div> */}
                      <span className="movie__genre" key={genre.id}>
                        {genre.name}
                      </span>
                    </>
                  ))
                : ""}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>{currentMovieDetails ? currentMovieDetails.overview : ""}</div>
          </div>
        </div>
      </div>
      <div className="movie__links">
        <div className="movie__heading">Useful Links</div>
        {currentMovieDetails && currentMovieDetails.homepage && (
          <a
            href={currentMovieDetails.homepage}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__homeButton movie__Button">
                Homepage <i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
        {currentMovieDetails && currentMovieDetails.imdb_id && (
          <a
            href={"https://www.imdb.com/title/" + currentMovieDetails.imdb_id}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__imdbButton movie__Button">
                IMDb<i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
      </div>
      <div className="movie__heading">Production companies</div>
      <div className="movie__production">
        {currentMovieDetails &&
          currentMovieDetails.production_companies &&
          currentMovieDetails.production_companies.map((company) => (
            <>
            <div key={company.id}></div>
              {company.logo_path && (
                <span className="productionCompanyImage">
                  <img
                    className="movie__productionComapany"
                    src={
                      "https://image.tmdb.org/t/p/original" + company.logo_path
                    }
                  />
                  <span>{company.name}</span>
                </span>
              )}
            </>
          ))}
      </div>
    </div>
  );
};

export default Movie;
