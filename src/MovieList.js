import React, { Component } from "react";
import MovieCard from "./MovieCard";
import { Button, Grid, CircularProgress } from "material-ui";

export default class MovieListF extends Component {
  render() {
    const { movies, handleLoadMoreClick } = this.props;
    let loadMore = this.props.isLoading ? (
      <CircularProgress />
    ) : (
      <Button
        id="load-more"
        raised
        color="primary"
        onClick={e => handleLoadMoreClick(e)}
      >
        Load more
      </Button>
    );

    return (
      <div style={{ margin: 20 }}>
        <Grid container spacing={0}>
          {movies.map(movie => <MovieCard movie={movie} key={movie.id} />)}
        </Grid>
        <br />
        <div>{loadMore}</div>
      </div>
    );
  }
}
