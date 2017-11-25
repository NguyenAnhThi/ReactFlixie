import React, { Component } from "react";
import "./MovieCard.css";
import { Paper } from "material-ui";
import StarIcon from "material-ui-icons/Star";
import DateIcon from "material-ui-icons/DateRange";
import { Button, Grid, Divider } from "material-ui";

export default class MovieCard extends Component {
  render() {
    const { movie } = this.props;
    console.log(movie);
    return (
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Paper className="movie-card">
          <Paper>
            <img
              className="poster"
              src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
              alt=""
            />
          </Paper>
          <div className="info">
            <div className="flex">
              <a href="#" className="title">
                {movie.title}
              </a>
              <div className="flex-center">
                <span>{movie.vote_average}</span>
                <div>
                  <StarIcon style={{ color: "gold" }} />
                </div>
              </div>
            </div>
            <div className="release-date">
              <DateIcon />
              <div style={{ paddingTop: 4 }}>{movie.release_date}</div>
            </div>
            <div className="overview">{movie.overview}</div>
            <Divider style={{ marginBottom: 14 }} />
            <div className="more-info">
              <Button raised color="primary">
                More info
              </Button>
            </div>
          </div>
        </Paper>
      </Grid>
    );
  }
}
