import React from 'react';
import axios from 'axios';
import Home from './home';
import './App.css';
import logo from './logo.svg';


export default class SignInContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            registering: false,
            error: '',
            email: '',
            password: '',
            jwt: '',
            userId: '',
            firstName: '',
            lastName: '',
            cartId: ''
        }
        this.signInEventHandler = this.signInEventHandler.bind(this);
        this.signUpEventHandler = this.signUpEventHandler.bind(this);
    }

    async signInEventHandler() {
        try {
            const signInBod = {
                email: this.state.email,
                password: this.state.password
            }
            const res = await axios.post('http://localhost:8080/user/signin', signInBod);
            console.log(`res: ${res.data.userId}`);
            if (res.status === 200) {
                this.setState({ loggedIn: true, jwt: res.data.jwt, userId: res.data.userId, firstName: res.data.firstName, lastName: res.data.lastName, cartId: res.data.carts[0] ? res.data.carts[0]._id : '' }, () => {
                    console.log(`Signed in: ${res.data.jwt}`);
                })
            } else {
                if (res.status === 403) {
                    this.setState({ error: "Wrong Credentials" }, () => {
                        console.log("err wrong credentials");
                    })
                } else {
                    this.setState({ error: "Error Logging In" }, () => {
                        console.log("Error Logging In");
                    })
                }
            }
        } catch (e) {
            this.setState({ error: `error: ${e}` }, () => {
                console.log(`error: ${e}`);
            })
        }
    }

    async signUpEventHandler() {
        try {
            const signUpBod = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            }
            const res = await axios.post('http://localhost:8080/user', signUpBod);
            if (res.status === 200) {
                this.setState({ loggedIn: true, registering: false, jwt: res.data.jwt, userId: res.data.userId, firstName: res.data.firstName, lastName: res.data.lastName, cartId: res.data.carts[0] ? res.data.carts[0] : '' }, () => {
                    console.log(`Registered: ${res.data.jwt}`);
                })
            } else {
                this.setState({ error: "Error Signing Up" }, () => {
                    console.log(`error`);
                })
            }

            console.log(`${res.data.jwt}`);
        } catch (e) {
            console.log(`error: ${e}`);
        }
    }

    render() {
        if (!this.state.loggedIn && !this.state.registering) {
            return (
                <div className="container">
                    <div className="header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <div className="text-padding">
                            <h3>Zoe's React App!</h3>
                        </div>
                    </div>
                    <div className="col-md-7 mrgnbtm">
                        <p>{this.state.error}</p>
                        <form>
                            <input className="form-control" placeholder='email' onBlur={(e) => this.setState({ email: e.target.value })}></input>
                            <input type='password' placeholder='password' autoComplete="on" onBlur={(e) => this.setState({ password: e.target.value })}></input>
                        </form>
                        <div className="row">
                            <button onClick={this.signInEventHandler}>Sign In</button>
                            <button onClick={() => this.setState({ registering: true }, () => {
                                console.log("Person Registering");
                            })}> or Sign Up</button>
                        </div>
                    </div>
                </div>
            )
        } else if (this.state.registering && !this.state.loggedIn) {
            return (
                <div>
                    <div className="header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <div className="text-padding">
                            <h3>Zoe's React App!</h3>
                        </div>
                    </div>
                    <div className="container mrgnbtm">
                        <div className="col-md-8">
                            <p>{this.state.error}</p>
                            <form>
                                <div className="row">
                                    <input placeholder='first name' onBlur={(e) => this.setState({ firstName: e.target.value })}></input>
                                    <input placeholder='last name' onBlur={(e) => this.setState({ lastName: e.target.value })}></input>
                                </div>
                                <div className="row">
                                    <input placeholder='email' onBlur={(e) => this.setState({ email: e.target.value })}></input>
                                    <input type='password' placeholder='password' autoComplete="on" onBlur={(e) => this.setState({ password: e.target.value })}></input>
                                </div>
                            </form>
                            <div className="row">
                                <button onClick={() => this.setState({ registering: false }, () => {
                                    console.log("Person Signing in");
                                })}>or Sign In</button>
                                <button onClick={this.signUpEventHandler}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <Home jwt={this.state.jwt} userId={this.state.userId} firstName={this.state.firstName} lastName={this.state.lastName} cartId={this.state.cartId} />
            )
        }
    }
}
