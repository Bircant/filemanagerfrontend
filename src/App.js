import React, { Component
 } from 'react';
import './App.css';
import Appbar from './components/AppBar'
import Display from './components/DisplayFile';

class App extends Component {
  // For file upload
  state = {
    file: '',
    error: '',
    msg: ''
  }
  uploadFile = (event) => {
    event.preventDefault();
    this.setState({error: '', msg: ''});

    if(!this.state.file) {
      this.setState({error: 'Please upload a file.'})
      return;
    }

    if(this.state.file.size >= 5000000) {
      this.setState({error: 'File size exceeds limit of 5MB.'})
      return;
    }

    let data = new FormData();
    data.append('file', this.state.file);
    data.append('name', this.state.file.name);

    fetch('http://localhost:8080/file/upload', {
      method: 'POST',
      body: data
    }).then(response => {
      this.setState({error: '', msg: 'Sucessfully uploaded file'});
    }).catch(err => {
      this.setState({error: err});
    });

  }

  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0]
    });
  }

  render() {
    return (
      
      <div className="App">
        <div className="App-intro">    
        <Appbar/>
        <Display/>
        <h3>Upload a file</h3>
          <h4 style={{color: 'red'}}>{this.state.error}</h4>
          <h4 style={{color: 'green'}}>{this.state.msg}</h4>
          <input onChange={this.onFileChange} type="file" accept =".png, .jpeg, .jpg, .pdf, .xlsx"/>
          <button onClick={this.uploadFile}>Upload</button><br/>
        </div>
       
      </div>
      
    );
  }
 
}

export default App;