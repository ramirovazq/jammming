import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends Component {
  render() {
    return (

            <div className="Playlist">
              <input defaultValue={'New Playlist'} />
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} />
              <a className="Playlist-save">SAVE TO SPOTIFY</a>
            </div>
    );
  }
}

export default Playlist;
