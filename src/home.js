import React from 'react';
import axios from 'axios';
import './App.css';
import logo from './logo.svg';
import { Scrollbars } from 'react-custom-scrollbars';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            recentItems: [],
            items: [],
            cartItems: [],
        }
        this.showCart = this.showCart.bind(this);
        this.showItems = this.showItems.bind(this);
        this.showRecentItems = this.showRecentItems.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.viewItem = this.viewItem.bind(this);
        console.log(`userId; ${this.props.userId}`);
        console.log(`jwt; ${this.props.jwt}`);
        console.log(`first; ${this.props.firstName}`);
        console.log(`lasst; ${this.props.lastName}`);
    }

    async componentDidMount() {
        await this.showRecentItems();
        await this.showItems();
        await this.showCart();
    }

    async showCart() {
        try {
            const res = await axios.get('http://localhost:8080/user/' + this.props.userId + '/cart', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.jwt}`
                }
            });
            console.log(`res cart; ${res.data}`);
            if (res.status === 200 && res.data.cartItems.length > 0) {
                this.setState({ cartItems: res.data.cartItems });
            }
        } catch (e) {
            console.log(`error: ${e}`);
        }
    }

    async showItems() {
        try {
            const res = await axios.get('http://localhost:8080/storeItem/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.jwt}`
                }, params: { query: this.state.search }
            });
            console.log(`res items; ${res.data}`);
            if (res.status === 200 && res.data.length > 0) {
                this.setState({ items: res.data });
            }
        } catch (e) {
            console.log(`error: ${e}`);
        }
    }

    async showRecentItems() {
        try {
            const res = await axios.get('http://localhost:8080/StoreItem/Recent', {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.jwt}`
                }, params: { num: 10 }
            });
            console.log(`res rec; ${res.data}`);
            if (res.status === 200 && res.data.length > 0) {
                this.setState({recentItems: res.data }, () => {
                    console.log(`udpating recent items`);
                })
            }
        } catch (e) {
            console.log(`error: ${e}`);
        }
    }

    async addToCart(id) {
        try {
            console.log(`res get add; ${this.props.cartId}`);
            const res = await axios.post(`http://localhost:8080/user/${this.props.cartId}/cartItem`, {
                "storeItemId": id,
                "quantity": 1
            }, { headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.jwt}`
                },});
            console.log(`res add; ${res.data}`);
            if (res.status === 200 && res.data.cartItems.length > 0) {
                this.setState({ cartItems: res.data.cartItems }, () => {
                    console.log(`udpating cart items`);
                })
            }
        } catch (e) {
            console.log(`error: ${e}`);
        }
    }

    async removeFromCart(id) {
        try {
            const res = await axios.delete(`http://localhost:8080/user/${this.props.cartId}/cartItem/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.jwt}`
                }
            });
            console.log(`res del; ${res.data}`);
            if (res.status === 200 && res.data.cartItems.length > 0) {
                this.setState({ cartItems: res.data.cartItems }, () => {
                    console.log(`udpating cart items`);
                })
            }
        } catch (e) {
            console.log(`error: ${e}`);
        }
    }

    async viewItem(id) {
        try {
            console.log(`view item with id: ${id}`);
            const res = await axios.get(`http://localhost:8080/StoreItemById/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.jwt}`
                }
            });
            if (res.status === 200) {
                try {
                    await this.showRecentItems();
                } catch (e) {
                    this.setState({ recentItems: res.data }, () => {
                        console.log(`udpating recent items`);
                    })
                }
            }
        } catch (e) {
            console.log(`error: ${e}`);
        }
    }

    render() {
        return (
            <div>
                <div className="header">
                    <img src={logo} className="App-logo" alt="logo" />
                    {(this.props.firstName.length > 0 && this.props.lastName.length > 0) ? <h2>Welcome, {this.props.firstName + ' ' + this.props.lastName + '!'}</h2> : <h2>Welcome!</h2>}
                    <div className="text-padding">
                        <h3>Zoe's React App!</h3>
                    </div>
                </div>
                <div className="flex-row">
                    <div>
                        <Scrollbars style={{ width: 300, height: 300 }}>
                            {this.state.recentItems.length > 0 ? this.state.recentItems.map((category, key) => (
                                <ul key={key}>{category.name}</ul>
                            )) : <p>No Recently Viewed Items</p>}
                        </Scrollbars>
                    </div>
                    <div className="col-md-8">
                        <input placeholder='search for items' onChange={(e) => this.setState({ search: e.target.value }, () => {
                            console.log(`search`);
                        })}></input>
                        <button onClick={this.showItems}>Search</button>
                        <div>
                            <Scrollbars style={{ width: 300, height: 300 }}>
                                {this.state.items.length > 0 ? (this.state.items.map((category, key) => (
                                    <div key={key} className="btn-row">
                                        <ul>{category.name}</ul>
                                        <button onClick={() => this.viewItem(category._id)}>view</button>
                                        <button onClick={() => this.addToCart(category._id)}>+</button>
                                    </div>
                                ))) : (<p>No Items</p>)}
                            </Scrollbars>
                        </div>
                    </div>
                    <div>
                        <Scrollbars style={{ width: 300, height: 300 }}>
                            {this.state.cartItems.length > 0 ? this.state.cartItems.map((category, key) => (
                                <div key={key} className="btn-row">
                                    <ul>{category.item.name}</ul>
                                    <button onClick={() => this.removeFromCart(category._id)}>x</button>
                                </div>
                            )) : <p>No Items in Cart</p>}
                        </Scrollbars>
                    </div>
                </div>
            </div>
        )
    }
}