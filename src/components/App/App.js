import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';



class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        searchResults:[{
            name:"emergency in planet earth",
            artist:"jamiroquai",
            album: "Once B",
            id: "1",
            uri: "spotify:track:1"
        },{
            name:"recordar es vivir",
            artist:"pedro",
            album: "III",
            id: "2",
            uri: "spotify:track:2"
        }],
        playlistname: "ejemplo playlist",
        playlistTracks: [{
            name:"TRACKS emer earth",
            artist:"TRACKSroquai",
            album: "TRACKSe B",
            id: "3",
            uri: "spotify:track:3"
        },{
            name:"TRACKSar es vivir",
            artist:"TRACKS pedro",
            album: "TRACKS III",
            id: "4",
            uri: "spotify:track:4"
        }] 
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);

  }//constructor


  updatePlaylistName(name){
            this.setState({playlistname: name});
  }

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

  removeTrack(track){

        function encuentraid(element){
            return element.id === this.id;
        }

        let copiaplaylistTracks = this.state.playlistTracks.concat();
        let indiceElemento = copiaplaylistTracks.findIndex(encuentraid, track);

        copiaplaylistTracks.splice(indiceElemento,1);
        this.setState({playlistTracks: copiaplaylistTracks});
  }


  render() {
    return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
                <SearchBar />
            <div className="App-playlist">
                <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} isRemoval={false} />
                <Playlist playlistName={this.state.playlistname} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} isRemoval={true} onNameChange={this.updatePlaylistName}  />
            </div>
          </div>
        </div>

    );
  }
}

export default App;
