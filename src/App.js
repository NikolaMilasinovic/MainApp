import React, {Component} from "react";
import Navbar from "./Components/NavbarCollection";
import Login from "./Components/Login/Login";

const initialState = {
      links:[],
      isLogedIn:false,
      route:'login',
      user:''
}

class App extends Component {
   constructor() {
    super()
    this.state = initialState
  }
    componentDidMount(){
      fetch('http://localhost:8081/links')
        .then(response => response.json())
        .then(links => {this.setState({links})})
        .catch(err => console.log(err))
    } 

    loadUser = (user) => {
      this.setState({user})
    }


    onRouteChange = (route) => {
      if(route === "login"){
        this.setState({initialState});
      }else if(route === 'home'){
        this.setState({isLogedIn:true})
      }
      this.setState({route:route})
    }
  render(){
    const {links, route, user} = this.state;
    return (
      <div>
      { route === 'home' 
        ?
        <Navbar links={links} user={user} onRouteChange={this.onRouteChange}/>
        :
        <Login loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
      }
      </div>
    );
  }
}

export default App;