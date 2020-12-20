import './App.css';
import React from 'react';
import thumbnailImg from "./thumbnail.jpg";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      status: "Ready.",
      default: thumbnailImg,
      thumbnail: thumbnailImg
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.setState({
      value: event.target.value,
      status: "Downloading ...",
    });
    
    var pos = this.state.value.indexOf("=");
    var videoId = this.state.value.slice(pos + 1);

    this.setState({
      thumbnail: `https://img.youtube.com/vi/${videoId}/0.jpg`
    })

    fetch("/download/" + videoId).then(res => res.json()).then(data => {
      this.setState({
        status: data.status,
        thumbnail: this.state.default
      });
    });

    event.preventDefault();
  }

  render() {
    return (
      <div className="app">
        <div className="app__body">
          <img src={this.state.thumbnail} alt="" />
          <form className="app__download" onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChange} placeholder="Enter the video URL" />
            <button type="submit" value="Submit">Download</button>

            <p className="app__downloadNote">Thumbnail will change corresponding to the target video when the download is in progress. It will revert back once the download is over.</p>
            <p>Status: {this.state.status}</p>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
