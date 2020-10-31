import React from 'react';
import './App.css'

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bank: bankOne,
      power: true,
      volume: 0.5,
      screen: '',
    }
    this.changeBank = this.changeBank.bind(this);
    this.togglePower = this.togglePower.bind(this);
    this.audioClicked = this.audioClicked.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.audioPressed = this.audioPressed.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keypress', this.audioPressed)
  }
  componentWillUnmount() {
    document.removeEventListener('keypress', this.audioPressed)
  }

  changeBank(event) {
    if (this.state.bank === bankOne) {
      event.target.innerText = 'beat 2'
      this.setState({
        bank: bankTwo,
        display: 'beat bank 2 selected'
      });
    } else {
      event.target.innerText = 'beat 1'
      this.setState({
        bank: bankOne,
        display: 'beat bank 1 selected'
      });
    }
    setTimeout(this.clearDisplay, 1000)
  }
  togglePower(event) {
    if (!this.state.power) {
      event.target.innerText = 'ON'
      event.target.classList.remove('red')
      event.target.classList.add('green')
      this.setState({
        display: 'Power ON',
        power: true
      })
    } else if (this.state.power) {
      event.target.innerText = 'OFF'
      event.target.classList.remove('green')
      event.target.classList.add('red')
      this.setState({
        display: 'Power OFF',
        power: false,
      })
    }
    setTimeout(this.clearDisplay, 1000)
  }
  audioClicked(event) {
    event.target.children[0].currentTime = 0;
    event.target.children[0].play();
    this.setState({
      display: event.target.children[0].attributes.data.value
    })
    setTimeout(this.clearDisplay, 1000)
  }
  audioPressed(event) {
    let arr = this.state.bank.filter(item => item.keyCode === event.key.toUpperCase().charCodeAt(0))
    if (arr.length > 0) {
      const key = document.querySelector("[data='" + arr[0].keyTrigger + "']")
      key.currentTime = '0';
      key.play();
      this.setState({
        display: key.attributes.data.value
      })
      key.parentNode.classList.add('play')
      setTimeout(() => {
        key.parentNode.classList.remove('play')
      }, 200)
      setTimeout(this.clearDisplay, 800)


    }
  }
  adjustVolume(event) {
    this.setState({
      volume: event.target.value,
      display: `Volume: ${Math.round(event.target.value * 100)}`
    })
    setTimeout(this.clearDisplay, 1000)
  }
  clearDisplay() {
    this.setState({
      display: '',
    })
  }
  render() {
    const audios = [].slice.call(document.getElementsByClassName('aud'))
    audios.forEach(audio => {
      audio.volume = this.state.volume;
    })


    return (
      <div className="container">
        <div className="nav">
          <button onClick={this.togglePower} className="green">ON</button>
          <button onClick={this.changeBank}>beat 1</button>
        </div>
        <input type="range" max='1' min='0' step='0.01' onChange={this.adjustVolume} value={this.state.volume} />
        <div id="display" className="screen">{this.state.display}</div>
        <div className="key-map">
          {this.state.bank.map(item => {
            return (<Key volume={this.state.volume} onClick={this.audioClicked} play={this.state.power} audio={item} />)
          })}
        </div>
      </div>
    )
  }
}

class Key extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<button id="drum-pad" className='drum-pad square' onClick={this.props.onClick}>
      {this.props.audio.keyTrigger}
      <audio id={this.props.audio.keyTrigger} data={this.props.audio.keyTrigger} className="clip aud" src={this.props.play ? this.props.audio.url : ''} ></audio>
    </button>);
  }
}

export default App;
