import React from 'react'
import Videos from '../components/Videos'

import API from '../API'



class VideosContainers extends React.Component {
    state = {
        videos: [],
    }
    
    getAllVideo() {
        API.getAllVideos()
          .then(data => {
            if (data.error) {
              alert('You are not signed in')
            } else {
              this.setState({ videos: data })
            }
        })
    }

    componentDidMount() {
        if (!!this.props.email) {
            this.props.history.push('/signin')
        } else {
         this.getAllVideo()
        }
    }

    render () {
        const { videos } = this.state
        const { currentPurchase, addToPurchase, currentUserVideos, removefromPurchase } = this.props
        return (
        <div>
            <h1>All videos</h1>
            { videos.length === 0 && <p>Sorry, there is no videos.</p>}
            {videos.map(video => <Videos video={video} key={video.id} currentPurchase={currentPurchase} 
                addToPurchase={addToPurchase} currentUserVideos={currentUserVideos} removefromPurchase={removefromPurchase}/>)}
        </div>)
    }
}

export default VideosContainers