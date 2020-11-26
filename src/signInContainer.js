import React from 'react';
import axios from 'axios';
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
            search: '',
        }
        this.signInEventHandler = this.signInEventHandler.bind(this);
        this.emailInputeHandler = this.emailInputHandler.bind(this);
        this.passInputeHandler = this.passInputHandler.bind(this);
        this.firstNameInputHandler = this.firstNameInputHandler.bind(this);
        this.lastNameInputHandler = this.lastNameInputHandler.bind(this);
        this.searchInputeHandler = this.searchInputHandler.bind(this);
        this.searchEventHandler = this.searchEventHandler.bind(this);
    }

    async signInEventHandler() {
        try {
            const signInBod = {
                email: this.state.email,
                password: this.state.password
            }
            const res = await axios.post('http://localhost:8080/user/signin', signInBod);
            if (res.status == 200) {
                this.setState({ loggedIn: true, jwt: res.data.jwt, userId: res.data.userId, firstName: res.data.firstName, lastName: res.data.lastName });
            } else {
                this.setState({ error: "Error Logging In" });
            }

            console.log(res);
        } catch (e) {
            console.log(`error: ${e}`);
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
            if (res.status == 200) {
                this.setState({ registering: false, loggedIn: true, jwt: res.data.jwt, userId: res.data.userId, firstName: res.data.firstName, lastName: res.data.lastName });
            } else {
                this.setState({ error: "Error Signing Up" });
            }

            console.log(res);
        } catch (e) {
            console.log(`error: ${e}`);
        }
    }

    emailInputHandler(event) {
        this.setState({ email: event.target.value });
    }

    passInputHandler(event) {
        this.setState({ password: event.target.value });
    }

    searchInputHandler(event) {
        this.setState({ search: event.target.value });
    }

    firstNameInputHandler(event) {
        this.setState({ firstName: event.target.value });
    }

    lastNameInputHandler(event) {
        this.setState({ lastName: event.target.value });
    }

    showWelcomeMessage() {
        if (this.state.firstName > 0 && this.state.lastName > 0) {
            return <h2>Welcome, {this.state.firstName + ' ' + this.state.lastName + '!'}</h2>
        } else {
            return null;
        }
    }

    showCart() {
        try {
            const res = await axios.get('http://localhost:8080/user/' + this.userId + '/cart');
            if (!res.data.cartItems.length) {
                const listArray = res.data.cartItems.forEach(item => {
                    return <li>{item.name}</li>
                });
                return listArray;
            } else {
                return <h2>No Items in Cart</h2>
            }
        } catch (e) {
            console.log(`error: ${e}`);
            return null;
        }
    }

    showItems() {
        try {
            const res = await axios.get('http://localhost:8080/storeItem/', { params: { query: this.state.search } });
            if (!res.data.length) {
                const listArray = res.data.forEach(item => {
                    return <li>{item.name}</li>
                });
                return listArray;
            } else {
                return <h2>No Items</h2>
            }
        } catch (e) {
            console.log(`error: ${e}`);
            return null;
        }
    }

    showRecentItems() {
        try {
            const res = await axios.get('http://localhost:8080/storeItem/Recent', { params: { num: 10 } });
            if (!res.data.length) {
                const listArray = res.data.forEach(item => {
                    return <li>{item.name}</li>
                });
                return listArray;
            } else {
                return <h2>No Items</h2>
            }
        } catch (e) {
            console.log(`error: ${e}`);
            return null;
        }
    }

    // searchEventHandler(event) {

    // }

    render() {
        if (!this.loggedIn) {
            return (
                <div>
                    <div className="header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h3>Zoe's React App!</h3>
                    </div>
                    <div className="container mrgnbtm">
                        <div className="col-md-8">
                            <form>
                                <div className="row">
                                    <input placeholder='email' onBlur={this.signInEventHandler}></input>
                                    <input type='password' placeholder='password' onBlur={this.passInputHandler}></input>
                                </div>
                                <div className="row">
                                    <button onClick={this.signInEventHandler}>Sign In</button>
                                    <button onClick={this.setState({ registering: true })}> or Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        } else if (this.registering) {
            <div>
                <div className="header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h3>Zoe's React App!</h3>
                </div>
                <div className="container mrgnbtm">
                    <div className="col-md-8">
                        <form>
                            <div className="row">
                                <input placeholder='first name' onBlur={this.firstNameInputHandler}></input>
                                <input placeholder='last name' onBlur={this.lastNameInputHandler}></input>
                            </div>
                            <div className="row">
                                <input placeholder='email' onBlur={this.signInEventHandler}></input>
                                <input type='password' placeholder='password' onBlur={this.passInputHandler}></input>
                            </div>
                            <div className="row">
                                <button onClick={this.setState({ registering: false })}>or Sign In</button>
                                <button onClick={this.signUpEventHandler}>Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        } else {
            //logo
            //logout
            return (
                <div>
                    <div className="header">
                        <img src={logo} className="App-logo" alt="logo" />
                        {this.showWelcomeMessage()}
                        <h3>Zoe's React App!</h3>
                    </div>
                    <div className="container mrgnbtm">
                        <div className="flex-row">
                            <ul>{this.showRecentItems()}</ul>
                            <div className="col-md-8">
                                <input placeholder='search for items' onChange={this.searchEventHandler}></input>
                                <button onClick={this.searchEventHandler}>Search</button>
                                <ul>{this.showItems()}</ul>
                            </div>
                            <ul>{this.showCart()}</ul> 
                        </div>
                    </div>
                </div>
            )
        }
    }
}
