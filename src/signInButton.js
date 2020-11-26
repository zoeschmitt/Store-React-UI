import React from 'react';

export default class SignInButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemname: false,
        }
        this.toggleItemNameState = this.toggleItemNameState.bind(this);
    }

    showGreeting() {
        if (this.state.itemname) {
            return (<span>{this.props.item.name}</span>)
        }
    }

    toggleItemNameState() {
        this.setState({itemname: !this.state.itemname});
    }

    render() { // render converts to html
    return (<div>
        <span>{this.showGreeting()}</span>
        <button onClick={this.toggleItemNameState}>Say Hello!</button>
        </div>)
    }
}