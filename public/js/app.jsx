var React = require('react');
var ReactDOM = require('react-dom');

const charLimit = 140

var TweetBox = React.createClass({
  getInitialState: function() {
    return {
      text: ""
    };
  },
  handleChange: function(event) {
    if (this.state.text.length < charLimit){
      this.setState({ text: event.target.value });
    }
  },
  removeText: function(event) {
    this.setState({ text: "" })
  },
  render: function() {
    return (
      <div className="well clearfix">
        <textarea className="form-control"
                  onChange={this.handleChange}
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
  <TweetBox />,
  document.getElementById("container")
);
