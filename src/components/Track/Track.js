import React, { Component } from 'react';
import './Track.css';

class Track extends Component {

  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.previewTrack = this.previewTrack.bind(this);

  }//constructor


  addTrack(){
        this.props.onAdd(this.props.track);
  }

  removeTrack(){
      this.props.onRemove(this.props.track);
  }


  previewTrack(){
      this.props.onPreview(this.props.track.preview);
  }

  render() {
    const renderAction = this.props.isRemoval;
    const havePreview = this.props.track.preview;
    return (

        <div className="Track">
          <div className="Track-information">
            <h3>{this.props.track.name}</h3>
            <p>{this.props.track.artist} |  {this.props.track.album}</p>
          </div>            
          {renderAction ? (<div><a className="Track-action" onClick={this.removeTrack}> - </a> </div>) : 
                          (<div><a className="Track-action" onClick={this.addTrack}> + </a> </div>) }
          {havePreview ? (<div><a className="Track-action" onClick={this.previewTrack} > preview </a> </div>) : (<div>no preview</div>) }
        </div>

    );
  }//render
}//Component

export default Track;
