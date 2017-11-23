import React, { Component } from 'react';
import './Reproducer.css';

class Reproducer extends Component {

  render() {

    const havePreview = this.props.defaultTrack;
    return (
        <div className="Reproducer">
          {havePreview ? (<div><audio src={this.props.defaultTrack} controls="controls" type="audio/mpeg" preload="preload" autoplay="autoplay"></audio></div>) : (<div></div>) }
            
        </div>
    );
  }//render
}//Component

export default Reproducer;
