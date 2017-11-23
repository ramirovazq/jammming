import React, { Component } from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends Component {
  render() {
    return (
            <div className="SearchResults">
              <h2>Resultados</h2>
              <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} onPreview={this.props.OnPreviewChange} />
            </div>
    );
  }
}

export default SearchResults;
