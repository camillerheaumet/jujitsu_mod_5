import React from 'react'
import API from '../API'
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class Basket extends React.Component {
    state = {
        proceedPayment: false,
        lastPurchaseIds: []
    }

    countTotalCost () {
        let totalCost = 0
        this.props.currentPurchase.map(purchaseVideo => totalCost += purchaseVideo.price)
        return totalCost.toFixed(2)
    }

    toRubyCurrency (amount) {
        return (amount * 100)
    }

    createPurchasedVideos = (event) => {
        event.preventDefault()
        if(this.props.currentPurchase.length > 0){
            const videoIds = this.props.currentPurchase.map(video => video.id)
            let newPur = {
                user_id: this.props.currentUser.id,
                video_ids: videoIds
            };
            API.createPurchase(newPur).then(resp =>
                this.setState({
                    proceedPayment: true,
                    lastPurchaseIds: [...this.state.lastPurchaseIds, resp.id]
                    // .then(window.location.reload())
                })
            )
        } else {
            alert('Your basket is empty')
        }
    }

    handleClick = () => {
        this.setState({ 
            proceedPayment: false            
        })
    }

    render() {
        const { currentUser, currentPurchase, handleDeleteAllButton, removefromPurchase } = this.props

        return (
            <div>
            {this.state.proceedPayment ?
            <div>
                <StripeProvider apiKey="">
                    <div className="example">
                        <h1>Proceed to Payment</h1>
                        <Elements>
                            <CheckoutForm total={this.countTotalCost() * 100} userEmail={currentUser.email} lastPurchaseIds={this.state.lastPurchaseIds}/>
                        </Elements>
                        <button onClick={() => this.handleClick()}>Cancel</button>
                    </div>
                </StripeProvider>
            </div>:
            <div>
                <h1>Basket</h1>
                {currentPurchase.map(purchaseVideo => <p key={purchaseVideo.id}>{purchaseVideo.name} {purchaseVideo.price} <button onClick={() => removefromPurchase(purchaseVideo)}>remove</button></p>)}
                <p>Total {this.countTotalCost()}</p>
                <button onClick={() => handleDeleteAllButton()}>Remove all</button>
                {!localStorage.getItem('token') ?
                <p>You need to be sign in to purchase</p>:
                <div>
                    {currentPurchase.length > 0 ?
                    <div>
                    <button onClick={(event) => this.createPurchasedVideos(event)}>Proceed to payment</button>
                    </div>:
                    <p>Your basket is empty.</p>}
                </div>}
                </div>}
            </div>
        )
    }
}

export default Basket