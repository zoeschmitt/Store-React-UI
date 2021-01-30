import React from 'react'
import { HeroContainer, HeroBg, HeroContent, HeroH1, HeroP, HeroBtnWrapper, ArrowForward, ArrowRight } from './HeroElements';
import { Button } from '../ButtonElements'
import axios from 'axios';

export default class HeroSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            recentItems: [],
            items: [],
            cartItems: [],
            hover: false,
        }
        this.showCart = this.showCart.bind(this);
        this.showItems = this.showItems.bind(this);
        this.showRecentItems = this.showRecentItems.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.viewItem = this.viewItem.bind(this);
        this.onHover = this.onHover.bind(this);
        console.log(`userId; ${this.props.userId}`);
        console.log(`jwt; ${this.props.jwt}`);
    }

    async componentDidMount() {
        await this.showRecentItems();
        await this.showItems();
        await this.showCart();
    }

    onHover() {
        this.setState({ hover: !this.state.hover });
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
                this.setState({ recentItems: res.data }, () => {
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
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.jwt}`
                },
            });
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
            <HeroContainer id="home">
                <HeroBg>
                    
                </HeroBg>
                <HeroContent>
                    <HeroH1>Zoe Schmitt</HeroH1>
                    <HeroP>Software Engineer
                </HeroP>
                    <HeroBtnWrapper>
                        <Button to='aboutme' smooth={true} duration={500} spy={true} exact='true' onMouseEnter={this.onHover} onMouseLeave={this.onHover
                        } primary="true" dark="true"
                        >About Me {this.state.hover ? <ArrowForward style={{ transform: `rotate(90deg)` }} /> : <ArrowRight style={{ transform: `rotate(90deg)` }} />}</Button>
                    </HeroBtnWrapper>
                </HeroContent>
            </HeroContainer>
        )
    }
}


