import React, {Component} from 'react';

class Login extends Component {
	constructor(props){
		super(props);
		this.state ={
			username: '',
			password: '' 
		}
	}

	onEmilChange = (event) => {
		this.setState ({username: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	}

	onSubmitSignIn = () => {
		fetch('http://localhost:8081/login',{ 
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password
			})
		})
		.then(response => response.json())
		.then(user => {
			if(user[0].id){
				this.props.loadUser(user[0].username);
				this.props.onRouteChange('home');
				console.log(user);
			}
		})

	}

	render(){
		return(
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Login</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Username</label>
				        <input 
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="text" 
				        	name="username" 
				        	id="username"
				        	onChange={this.onEmilChange}
				        />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
				        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
				        	type="password" 
				        	name="password"  
				        	id="password"
				        	onChange={this.onPasswordChange}
				        />
				      </div>
				     
				    </fieldset>
				    <div className="">
				      <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Login"/>
				    </div>
				  </div>
				</main>
			</article>
		);
	}
	
}

export default Login;