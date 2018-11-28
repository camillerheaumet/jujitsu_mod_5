import React from 'react'
import API from '../API'

class Basket extends React.Component {
    countTotalCost () {
        let totalCost = 0
        this.props.currentPurchase.map(purchaseVideo => totalCost += purchaseVideo.price)
        return totalCost
    }

    createPurchasedVideos = (event) => {
        event.preventDefault()
        if(this.props.currentPurchase.length > 0){
            const videoIds = this.props.currentPurchase.map(video => video.id)
            let newPur = {
                user_id: this.props.currentUser.id,
                video_ids: videoIds
            };
            API.createPurchase(newPur).then(this.props.handleDeleteAllButton())
        } else {
            alert('Your basket is empty')
        }
    }

    render() {
        const { currentPurchase, handleDeleteAllButton, removefromPurchase } = this.props
        return (
            <div>
                <h1>Basket</h1>
                {!localStorage.getItem('token') ?
                <p>You need to be sign in to purchase</p>:
                <div>
                {currentPurchase.map(purchaseVideo => <p>{purchaseVideo.name} {purchaseVideo.price} <button onClick={() => removefromPurchase(purchaseVideo)}>remove</button></p>)}
                <p>Total {this.countTotalCost()}</p>
                <button onClick={() => handleDeleteAllButton()}>Remove all</button>
                <button onClick={(event) => this.createPurchasedVideos(event)}>Proceed to payment</button>
                </div>}
            </div>
        )
    }
}

export default Basket