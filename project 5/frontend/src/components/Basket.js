import React from 'react'

class Basket extends React.Component {
    countTotalCost () {
        let totalCost = 0
        this.props.currentPurchase.map(purchaseVideo => totalCost += purchaseVideo.price)
        return totalCost
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
                </div>}
            </div>
        )
    }
}

export default Basket