import React from 'react'

class Videos extends React.Component {
    state = { expanded: false }
  
    handleExpandClick = () => {
      this.setState(state => ({ expanded: !state.expanded }))
    }

    render () {
        const { video, addToPurchase, removefromPurchase, currentUserVideos, currentPurchase } = this.props
  
        return (
            <div>
                <h3>{video.name}</h3>
                <img src={video.image_url} alt={`${video.name}`}/>
                <h4>£ {video.price}</h4>
                { currentUserVideos.find(v => v.id === video.id) ?
                    <p>You already purchased this video, you can download it via My Videos.</p> :
                    !currentPurchase.includes(video) ?
                    <button onClick={() => addToPurchase(video)}>Add to basket</button>:
                    <button onClick={() => removefromPurchase(video)}>Remove from basket</button>}
                <button onClick={() => this.handleExpandClick()}>{
                    this.state.expanded ?
                    'Hide description': 'Reveal description'}</button>
                {this.state.expanded ?
                <div><h4>Description:</h4>
                <p>{video.description}</p></div> : null}
            </div>
      )
    }
}

export default Videos