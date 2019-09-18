import React, {Component} from "react";
import NavbarItem from "./NavbarItem";


class Navbar extends Component{
   constructor(props) {
    super(props);
    this.state = {
    	newLinks: []
    }
  }

	componentDidMount(){
		if(this.props.user === "Admin"){
	       fetch('http://localhost:8080/links')
	        .then(response => response.json())
	        .then(links => {
	        	let newLinks = [...this.props.links, ...links]
	        	this.setState({newLinks})
	    })
	        .catch(err => console.log(err))
		}else if(this.props.user === "Korisnik1"){
			fetch('http://localhost:8080/links')
	        .then(response => response.json())
	        .then(links => {
	        	let newLinks = [...this.props.links, links[0]]
	        	this.setState({newLinks})
	    })
	        .catch(err => console.log(err))
		}else{
			let newLinks = [ ...this.props.links]
			this.setState({newLinks});
		}
    } 
   	render(){
   		const {user, onRouteChange} = this.props;
   		const {newLinks} = this.state;
   		console.log(newLinks);
   		return (
	      <div>
	      <input onClick={() => onRouteChange('login')} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Logout"/>

	      	<p>Welcome back {user} see the latest links:</p>
	      	{
	      		newLinks.map((link, i) => {
	      			return(
	      				<NavbarItem 
	      					key={i}
	      					link={link.link}
	      					text={link.text}
	      				/>
	      			)
	      		})
	      	}
	      </div>
	    );
   	}


}

export default Navbar;