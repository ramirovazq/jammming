import React, { Component } from 'react';
import './Track.css';

class Track extends Component {

  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);

  }//constructor


  addTrack(){
        this.props.onAdd(this.props.track);
  }

  removeTrack(){
      this.props.onRemove(this.props.track);
  }

  render() {
    const renderAction = this.props.isRemoval;
    return (

        <div className="Track">
          <div className="Track-information">
            <h3>{this.props.track.name}</h3>
            <p>{this.props.track.artist} |  {this.props.track.album}</p>
          </div>            
          {renderAction ? (<a className="Track-action" onClick={this.removeTrack}> - </a>) : (<a className="Track-action" onClick={this.addTrack} > + </a>)}
        </div>

    );
  }//render
}//Component

export default Track;
