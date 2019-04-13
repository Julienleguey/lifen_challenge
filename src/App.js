import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      filesName: []
    }
  }


  componentDidMount() {
    // preventing any file to be loaded if dropped outside of the dropzone
    window.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    window.addEventListener("drop", (e) => {
      e.preventDefault();
    });

  }

  // the 4 basics methods to deal with drag and dropping files
  // see: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#Drag_Events

  // makes the droparea the drop target when the dragged item enters it
  dragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  // dragging over the droparea
  dragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  // when the dragged item leaves the droparea, the droparea is not the drop target anymore
  dragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  // dropping the dragged item
  // also works with 'select'
  drop = (e, method) => {
    e.preventDefault();

    let dt = '';

    // if the item is dropped, its name is added to the state filesName array
    if (method === "dropped") {
      dt = e.dataTransfer.files[0].name;
      this.setState({
        filesName: [...this.state.filesName, dt]
      });
    } else if (method === "selected") {
      // if the item is selected but the user hits the "cancel" button (otherwise, getting an error)
      if (!document.getElementById('fileElem').value.length) {
        document.body.onfocus = null;
      } else {
        // if the item is selected, its name is added to the state filesName array
        dt = document.getElementById('fileElem').files.item(0).name;
        this.setState({
          filesName: [...this.state.filesName, dt]
        });
      }
    }

  }

  // method to display the names of the files uploaded by the user
  // displaying all the files name helps the user to remember which file (s)he already uploaded
  display = () => {
    let filesNameToDisplay = this.state.filesName;
    let displayed = filesNameToDisplay.map( (fileName, index) => <li key={index}>{fileName}</li>);
    return displayed;
  }


  render() {
    return (
      <div className="App" id="app">
        <div id="drop-area" onDragEnter={ (e) => this.dragEnter(e)} onDragOver={ (e) => this.dragOver(e)} onDragLeave={ (e) => this.dragLeave(e)} onDrop={ (e) => this.drop(e, "dropped")}>
          <svg className="upload-svg" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          	 viewBox="0 0 548.176 548.176" style={{"enableBackground":"new 0 0 548.176 548.176"}}
          	 xmlSpace="preserve">
          	<path fill="#fff" d="M524.326,297.352c-15.896-19.89-36.21-32.782-60.959-38.684c7.81-11.8,11.704-24.934,11.704-39.399
          		c0-20.177-7.139-37.401-21.409-51.678c-14.273-14.272-31.498-21.411-51.675-21.411c-18.083,0-33.879,5.901-47.39,17.703
          		c-11.225-27.41-29.171-49.393-53.817-65.95c-24.646-16.562-51.818-24.842-81.514-24.842c-40.349,0-74.802,14.279-103.353,42.83
          		c-28.553,28.544-42.825,62.999-42.825,103.351c0,2.474,0.191,6.567,0.571,12.275c-22.459,10.469-40.349,26.171-53.676,47.106
          		C6.661,299.594,0,322.43,0,347.179c0,35.214,12.517,65.329,37.544,90.358c25.028,25.037,55.15,37.548,90.362,37.548h310.636
          		c30.259,0,56.096-10.711,77.512-32.12c21.413-21.409,32.121-47.246,32.121-77.516C548.172,339.944,540.223,317.248,524.326,297.352
          		z M362.729,289.648c-1.813,1.804-3.949,2.707-6.42,2.707h-63.953v100.502c0,2.471-0.903,4.613-2.711,6.42
          		c-1.813,1.813-3.949,2.711-6.42,2.711h-54.826c-2.474,0-4.615-0.897-6.423-2.711c-1.804-1.807-2.712-3.949-2.712-6.42V292.355
          		H155.31c-2.662,0-4.853-0.855-6.563-2.563c-1.713-1.714-2.568-3.904-2.568-6.566c0-2.286,0.95-4.572,2.852-6.855l100.213-100.21
          		c1.713-1.714,3.903-2.57,6.567-2.57c2.666,0,4.856,0.856,6.567,2.57l100.499,100.495c1.714,1.712,2.562,3.901,2.562,6.571
          		C365.438,285.696,364.535,287.845,362.729,289.648z"/>
          </svg>
          <div className="drop-description" droppable="false">
            <p>Drag and drop your file here</p>
            <p>OR</p>
          </div>
          <form className="my-form">
            <input type="file" id="fileElem" accept="image/*" onChange={(e) => this.drop(e, "selected")} />
            <label className="button" htmlFor="fileElem">Select file</label>
          </form>
          <p className="drop-size">File size limited: 2 MB</p>
        </div>
        <div id="uploaded-files">
          <h1>Uploaded files:</h1>
          <ul>
            {this.display()}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
