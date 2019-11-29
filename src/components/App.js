import React from 'react';
import '../public/App.css';
import click1 from '../audio/click1.wav';
import click2 from '../audio/click2.wav';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      bpm : 100,
      playing: false,
      count:0,
      beatsPerMeasure:4
    }
    this.click1 = new Audio(click1)
    this.click2 = new Audio(click2)
  }

  inputChange = (e) => {
    if(this.state.playing){
      clearInterval(this.timer)
      this.timer = setInterval(this.playClick, (60/this.state.bpm)*1000)
 
      this.setState({count:0,bpm:e.target.value})
    }
    else
      this.setState({bpm: e.target.value})
  }

  buttonCLick = () => {
    if(this.state.playing){
      clearInterval(this.timer)

      this.setState({playing:false})
    }
    else{
      this.timer = setInterval(this.playClick, (60/this.state.bpm)*1000)

      this.setState({count:0,playing:true}, this.playClick)
    }   
  }

  playClick = () => {
    let count = this.state.count
    let beatsPerMeasure = this.state.beatsPerMeasure

    if(count%beatsPerMeasure === 0)
      this.click2.play()
    
    else 
     this.click1.play()

     this.setState({
       count: (this.state.count+1)
     }, console.log(this.state.count))
  }
  render () {
    return (
      <div className="App container mt-5 p-5 text-center">

       <h2 className="m-5">Metronome</h2>
       <h5 className="m-3">{this.state.bpm} BPM</h5>

         <div className="container w-50">
         <input type="range" value={this.state.bpm} class="custom-range" min="60" max="300" id="customRange1" onChange={this.inputChange}></input>
         </div>
        
        <button className="btn btn-lg btn-warning" onClick={this.buttonCLick}> {this.state.playing ? 'Stop':'Start'}</button>
      </div>
    );
  }
}

export default App;