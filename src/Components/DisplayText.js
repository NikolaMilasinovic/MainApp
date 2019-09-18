import React, {Component} from "react";

class  DisplayText extends Component{
  constructor(props) {
      super(props);
      this.state = {
        isInEditMode:false,
        isUpdated:false,
        updateText:''
      }
  }

  changeEditMode = (e) => {
    this.setState({
      isInEditMode: !this.state.isInEditMode
    })
    // console.log("event", e.target.value);
  }

  updateText = () => {
    fetch(`http://localhost:8081/link/${this.props.updateLink}`,{ 
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        updateText: this.state.updateText
      })
    })
    .then(response => response.json())
    .then(text => this.setState({
      isInEditMode: !this.state.isInEditMode,
      isUpdated: true 
    }))
    .catch(err=>console.log(err))
  }

  onTextAreaChange = (e) => {
    this.setState({
      updateText:e.target.value
    })
  }

  render(){
    const {isInEditMode, isUpdated, updateText} = this.state;
     const {text} = this.props;
      return (
        isInEditMode ?
          <div>
            <textarea
              type="text"
              defaultValue={text}
              style={{width:"600px", height:"250px"}}
              onChange={this.onTextAreaChange}
            />
            <div>
             <input 
             className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit" 
              value="Cancel"
              onClick={this.changeEditMode}
              />
               <input 
             className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit" 
              value="Update"
              onClick={this.updateText}
              />
              </div>
          </div>:
          <div>
             { !isUpdated ?
            <div >{text}</div> : <div >{updateText}</div>
          } 
            <input 
             className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit" 
              value="Update text"
              onClick={this.changeEditMode}
              />
          </div>
      );
  }
}

export default DisplayText;