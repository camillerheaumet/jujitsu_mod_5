import React from 'react'

class Videos extends React.Component {
    render () {
        const { video, addToPurchase } = this.props
  
        return (
            <div>
                <h3>{video.name}</h3>
                <img src={video.image_url} alt={`image for ${video.name}`}/>
                <h4>£ {video.price}</h4>
                <button onClick={() => addToPurchase(video)}>Add to basket</button>
                <p>{video.description}</p>
            </div>
      )
    }
}

export default Videos