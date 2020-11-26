import React from 'react';
import SignInButton from "./signInButton";
import axios from 'axios';

export default class SignInContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            jwt: '',
            userId: ''
        }
        this.signInEventHandler = this.signInEventHandler.bind(this);
        this.emailInputeHandler = this.emailInputeHandler.bind(this);
        this.passInputeHandler = this.passInputeHandler.bind(this);
    }

    async signInEventHandler() {
        try {
            const signInBod= {
                email: this.state.email,
                password: this.state.password
            }
            const res = await axios.post('http://localhost:8080/user/signin', signInBod);
            this.setState({jwt: res.data.jwt, userId: res.data.userId});
            console.log(res);
        } catch (e) {
            console.log(`error: ${e}`);
        }
    }

    emailInputeHandler(event) {
        this.setState({email: event.target.value});
    }

    passInputeHandler(event) {
        this.setState({password: event.target.value});
    }

    render() {
        return(
            <div>
                <input placeholder='email' onBlur={this.signInEventHandler}></input>
                <input type='password' placeholder='password' onBlur={this.passInputeHandler}></input>
                <button onClick={this.signInEventHandler}>Sign In</button>
            </div>
        )
    }
}
