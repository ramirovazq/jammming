import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import Reproducer from '../Reproducer/Reproducer';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';



class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        searchResults:[],
        playlistname: "New Playlist",
        playlistTracks: [],
        mp3Preview: ""
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
    this.updatePreviewMp3 = this.updatePreviewMp3.bind(this);

  }//constructor


  updatePlaylistName(name){
            this.setState({playlistname: name});
  }

/*
  addTrack(track){

        function encuentraid(element){
            return element.id === this.id;
        }

        let copiaplaylistTracks = this.state.playlistTracks.concat();
        let updateplaylistTracks = this.state.playlistTracks.concat(track);
       
        if(copiaplaylistTracks.findIndex(encuentraid, track) === -1 ){
            this.setState({playlistTracks: updateplaylistTracks});
        }


  }
*/

    addTrack(track) {
        let tracks = this.state.playlistTracks;
        if (!tracks.includes(track)) {
            tracks.push(track);
            this.setState({playlistTracks: tracks});
        }//if
    }

/*
  removeTrack(track){

        function encuentraid(element){
            return element.id === this.id;
        }

        let copiaplaylistTracks = this.state.playlistTracks.concat();
        let indiceElemento = copiaplaylistTracks.findIndex(encuentraid, track);

        copiaplaylistTracks.splice(indiceElemento,1);
        this.setState({playlistTracks: copiaplaylistTracks});
  }
*/

    removeTrack(track) {
        let tracks = this.state.playlistTracks;
        tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
        this.setState({playlistTracks: tracks});
    }

  savePlaylist(){
        let trackURIs = this.state.playlistTracks.map(element => element.uri);
        Spotify.savePlaylist(this.state.playlistname, trackURIs);
        this.setState({playlistName: "New Playlist", searchResults:[]});
        
  }


 searchSpotify(term){
    console.log("term: --"+term);
    Spotify.search(term).then(resultados => this.setState({
        searchResults: resultados    
    }));
    //console.log(resultadosBusqueda);
  }

  updatePreviewMp3(urlmp3){
     console.log("mp3 nuevo preview: --"+urlmp3);
     this.setState({mp3Preview: urlmp3});
}

  render() {
    return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
                <SearchBar onSearch={this.searchSpotify} />
                <Reproducer defaultTrack={this.state.mp3Preview} />
            <div className="App-playlist">
                <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} isRemoval={false} OnPreviewChange={this.updatePreviewMp3} />
                <Playlist playlistName={this.state.playlistname} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} isRemoval={true} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
            </div>
          </div>
        </div>

    );
  }
}

export default App;
