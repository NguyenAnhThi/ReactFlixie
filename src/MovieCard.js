import React, { Component } from "react";
import "./MovieCard.css";
import { Paper } from "material-ui";
import StarIcon from "material-ui-icons/Star";
import DateIcon from "material-ui-icons/DateRange";
import { Button, Grid, Divider, Dialog } from "material-ui";

export default class MovieCard extends Component {
  state = {
    open: false,
    details: []
  };

  async getDetails(id) {
    const url = `https://api.themoviedb.org/3/movie/${
      id
    }?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed&append_to_response=credits`;
    const results = await fetch(url);
    const data = await results.json();
    return data;
  }

  async handleClickOpen(id) {
    const results = await this.getDetails(id);
    this.setState({
      open: true,
      details: results
    });
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { movie } = this.props;
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
            <a className="title" onClick={() => this.handleClickOpen(movie.id)}>
              <img
                className="poster"
                src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                alt=""
              />
            </a>
          </Paper>
          <div className="info">
            <div className="flex">
              <a
                className="title"
                onClick={() => this.handleClickOpen(movie.id)}
              >
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
              <Button
                raised
                color="primary"
                onClick={() => this.handleClickOpen(movie.id)}
              >
                More info
              </Button>
            </div>
          </div>
        </Paper>

        <Dialog
          maxWidth="md"
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex" }}>
              <img
                src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                alt=""
              />
            </div>
            <div className="info" style={{ height: 100 }}>
              <div className="flex">
                <span className="title">
                  {movie.title}({movie.release_date})
                </span>
                <div className="flex-center">
                  <span>{movie.vote_average}</span>
                  <div>
                    <StarIcon style={{ color: "gold" }} />
                  </div>
                </div>
              </div>
              <Divider />
              <div className="dialog-info">
                <h3>Genre</h3>
                <div style={{ display: "flex" }}>
                  {this.state.details.genres &&
                    this.state.details.genres.map(genre => {
                      return (
                        <Paper
                          key={genre.id}
                          style={{ padding: 5, marginRight: 8 }}
                        >
                          {genre.name}
                        </Paper>
                      );
                    })}
                </div>
              </div>
              <div className="details-overview">
                <h3>Overview</h3>
                <div style={{ padding: 5 }}>{movie.overview}</div>
              </div>

              <div className="dialog-info">
                <h3>Featured Cast</h3>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {this.state.details.credits &&
                    this.state.details.credits.cast.slice(0, 10).map(cast => {
                      return (
                        <Paper
                          key={cast.cast_id}
                          style={{
                            padding: 5,
                            marginRight: 8,
                            marginBottom: 8
                          }}
                        >
                          <b>{cast.name}</b>
                          <br />
                          <i>{cast.character}</i>
                        </Paper>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </Grid>
    );
  }
}
