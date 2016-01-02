var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var moment = require('moment');
moment.locale('nb');


const charLimit = 140

var Banner = React.createClass({
  getInitialState: function() {
    return {
      loading: true,
      weather: '',
      temp: 0,
      wind: 0
    };
  },
  getWeather: function() {
    var weather = this.state.weather.toLowerCase()
    if (weather == 'rain'){
      return ["rain.png","regn"]
    }
    else if (weather == 'drizzle'){
      return ["rain.png","mye regn"]
    }
    else if (weather == 'thunderstorm'){
      return ["rain.png","tordenvær"]
    }
    else if (weather == 'clouds'){
      return ["cloudy.png","overskyet"]
    }
    else if (weather == 'snow'){
      return ["snow.png","snø"]
    }
    else if (weather == 'clear'){
      return ["sun.png","skyfri"]
    }
    else {
      return ["cloudy.png","overskyet"]
    }
  },
  componentDidMount: function() {
    $.getJSON('weather', function(result) {
      if (this.isMounted()) {
        this.setState({
          loading: false,
          weather: result.weather[0].main,
          temp: result.main.temp,
          wind: result.wind.speed
        });
      }
    }.bind(this));
  },

  render: function() {
    if (this.state.loading) {
      return <div className="banner">loading ...</div>
    } else {
        return (
        <div>
          <div className="circleContainer pull-left">
            <img className="icon" src={"img/" + this.getWeather()[0]}></img>
            <div className="center-align">{this.getWeather()[1]}</div>
          </div>
          <div className="circleContainer pull-left">
            <img className="icon" src="img/temp.png"></img>
            <div className="center-align">{this.state.temp}°C</div>
          </div>
          <div className="circleContainer pull-left">
            <img className="icon" src="img/wind.png"></img>
            <div className="center-align">{this.state.wind}m/s</div>
          </div>
          <div className="circleContainer pull-left">
            <img className="icon" src="img/visit.png"></img>
            <div className="center-align">visit</div>
          </div>
        </div>
      );
    }
  }
});

var TweetBox = React.createClass({
  getInitialState: function() {
    return {
      text: "",
      author: ""
    };
  },
  handleText: function(event) {
    if (this.state.text.length < charLimit){
      this.setState({ text: event.target.value });
    }
  },
  handleAuthor: function(event) {
    if (this.state.author.length < charLimit){
      this.setState({ author: event.target.value });
    }
  },
  removeText: function(event) {
    this.setState({ text: "" })
  },
  render: function() {
    return (
      <div className="well clearfix inputContainer">
        <div className="form-inline">
          <div className="form-group">
            <input className="form-control"
              onChange={this.handleAuthor}
              value={this.state.author}
              type="text"
              placeholder="Hvem er du?"></input>
          </div>
          <span className="pull-right">{moment().format('hh:mm:ss DD/MM-YYYY')}</span>
        </div>
        <br/>
        <textarea className="form-control"
                  placeholder="Legg inn innlegg"
                  rows="3"
                  onChange={this.handleText}
                  value={this.state.text}>
        </textarea>
        <br/>
        <span>Tegn igjen: {charLimit - this.state.text.length}</span>

        <button className="btn btn-primary pull-right"
                disabled={this.state.text.length === 0}>
                Legg til
        </button>
        <button className="btn btn-default pull-right"
                onClick={this.removeText}
                disabled={this.state.text.length === 0}>
                Fjern
        </button>
      </div>
    );
  }
});


ReactDOM.render(
  <Banner />,
  document.getElementById("info")
);

ReactDOM.render(
  <TweetBox />,
  document.getElementById("container")
);
