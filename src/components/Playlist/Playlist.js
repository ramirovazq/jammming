import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends Component {

  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e){
    const name = e.target.value;
    this.props.onNameChange(name);
  }

  render() {
    return (

            <div className="Playlist">
              <input defaultValue={'New Playlist'} onChange={this.handleNameChange} />
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} />
              <a className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</a>
            </div>
    );
  }
}

export default Playlist;
