import React, {Component} from "react";
import DisplayText from './DisplayText';


class NavbarItem extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showText:false,
        updateLink: ''
      }
  }

  dispalyText = (e) => {
     this.setState({
      showText: !this.state.showText,
      updateLink: e.target.value
     })
     
  }


  render(){
    const {link,text} = this.props;
    const {showText,updateLink, itemText} = this.state;
    return (
        <div>
           
              <button 
               className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              onClick={this.dispalyText} value={link}>
                {link}
              </button>
              { showText ?
                <DisplayText text={text} updateLink={updateLink}/> : null
              }
              
          
        </div>

    );
  }
  

}

export default NavbarItem;