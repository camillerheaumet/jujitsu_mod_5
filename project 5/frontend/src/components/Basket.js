import React from 'react'
import API from '../API'
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class Basket extends React.Component {
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
            API.createPurchase(newPur).then(window.location.reload())
        } else {
            alert('Your basket is empty')
        }
    }

    render() {
        const { currentPurchase, handleDeleteAllButton, removefromPurchase } = this.props

        return (
            // <div>
            // {true ?
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
             
             <div>
                 <StripeProvider apiKey="">
                     <div className="example">
                         <h1>React Stripe Elements Example</h1>
                         <Elements>
                             <CheckoutForm total={this.countTotalCost() * 100}/>
                         </Elements>
                     </div>
                 </StripeProvider>

             </div>
            </div>
        )
    }
}

export default Basket