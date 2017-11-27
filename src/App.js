import React, { Component } from "react";
import "./App.css";
import MovieList from "./MovieList";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Paper
} from "material-ui";
import MovieIcon from "material-ui-icons/Movie";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url:
        "https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed",
      movies: [],
      isLoading: true,
      page: 1,
      type: "now_playing"
    };
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async fetchMovies(page) {
    await this.sleep(1000);
    const url = `${this.state.url}&page=${page}`;
    const results = await fetch(url);
    const data = await results.json();
    return data.results;
  }

  async loadMore() {
    this.setState({
      isLoading: true
    });
    const currentPage = this.state.page + 1;
    const newMovies = await this.fetchMovies(currentPage);
    this.movieResults = this.movieResults.concat(newMovies);
    this.setState({
      page: currentPage,
      movies: this.movieResults,
      isLoading: false
    });
  }

  async toggleType() {
    let type = this.state.type !== "now_playing" ? "now_playing" : "top_rated";
    this.setState({
      url: `https://api.themoviedb.org/3/movie/${
        type
      }?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed`,
      type: type,
      isLoading: true
    });
    const movies = await this.fetchMovies(1);
    this.setState({
      page: 1,
      movies: movies,
      isLoading: false
    });
  }

  async handleSearch(e) {
    if (e.keyCode === 13) {
      let query = e.target.value;
      let searchUrl =
        query === ""
          ? `https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed`
          : `https://api.themoviedb.org/3/search/movie?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed&language=en-US&query=${
              query
            }&page=1&include_adult=false`;
      this.setState({
        url: searchUrl,
        isLoading: true
      });
      const searchResult = await this.fetchMovies(1);
      let movies = searchResult ? searchResult : this.state.movies;
      this.setState({
        page: 1,
        movies: movies,
        isLoading: false
      });
    }
  }

  async componentDidMount() {
    this.movieResults = await this.fetchMovies(this.state.page);
    this.setState({
      movies: this.movieResults,
      isLoading: false
    });
  }

  render() {
    let content = (
      <div>
        <MovieList
          movies={this.state.movies}
          handleLoadMoreClick={() => this.loadMore()}
          isLoading={this.state.isLoading}
        />
      </div>
    );

    let type =
      this.state.type === "now_playing" ? (
        <h1>Now Playing Moives</h1>
      ) : (
        <h1>Top Rated Movies</h1>
      );

    return (
      <div className="App">
        <AppBar position="fixed">
          <Toolbar style={{ justifyContent: "space-between" }}>
            <div className="toolbar-left">
              <IconButton color="contrast" aria-label="Menu">
                <MovieIcon style={{ fontSize: 40 }} />
              </IconButton>
              <Typography type="title" color="inherit">
                Welcome to FLIXIE
              </Typography>
            </div>
            <div className="toolbar-right">
              <Paper>
                <input
                  type="text"
                  placeholder="Search for a movie"
                  className="search-box"
                  onKeyDown={e => this.handleSearch(e)}
                />
              </Paper>
              <Button
                style={{ marginLeft: 10 }}
                disabled={this.state.type === "now_playing"}
                color="contrast"
                onClick={this.toggleType.bind(this)}
              >
                Now Playing
              </Button>
              <Button
                disabled={this.state.type !== "now_playing"}
                color="contrast"
                onClick={this.toggleType.bind(this)}
              >
                Top Rated
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        <div className="App-content">
          {type}
          {content}
        </div>
      </div>
    );
  }
}

export default App;
