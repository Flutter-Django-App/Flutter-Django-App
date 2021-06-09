import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class SignupForm extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <article className="art">
        <div className="gr27e">
        <img src="https://i.imgur.com/bfjUjgq.png" width='280px' height='90px' />
        <div className="signup-div">
          <form className="sign-form" onSubmit={e => this.props.handle_signup(e, this.state)}>
            <h2 className="sign-sub">Sign up to see photos and videos from your friends.</h2>
            <label htmlFor="username">First Name</label>
            <input
              type="text"
              name="first_name"
              value={this.state.first_name}
              onChange={this.handle_change}
            />
            <label htmlFor="username">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={this.state.last_name}
              onChange={this.handle_change}
            />
            <label htmlFor="username">email</label>
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handle_change}
            />
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handle_change}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handle_change}
            />
            <input type="submit" />
          </form>
          </div>
          <p className="sign-term">By signing up, you agree to our Terms , Data Policy and Cookies Policy .</p>
        </div>
        <div className="gr27e">
        <div className="bot-div log-bot bottom-div bottom-log sign-bot">
        <p className="bot-p">Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>  
      </article>
    );
  }
}

export default SignupForm;

SignupForm.propTypes = {
  handle_signup: PropTypes.func.isRequired
};
