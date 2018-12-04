import React from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    console.log(this.props.stripe)
    let {token} = await this.props.stripe.createToken({name: "Name"});
    console.log(token)
    let response = await fetch("http://localhost:3001/purchases/11/checkout", {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body:  JSON.stringify({
        id: token.id,
        total: this.props.total
      })
    });
  
    if (response.ok) this.setState({complete: true});
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
