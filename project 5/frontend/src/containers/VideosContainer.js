import React from 'react'
import Videos from '../components/Videos'
import CreateVideoForm from '../components/CreateVideoForm'

import API from '../API'



class VideosContainers extends React.Component {
    state = {
        videos: [],
        addVideo: false
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

    handleAddVideoClick = () => {
        this.setState({addVideo : !this.state.addVideo })
    }

    componentDidMount() {
        this.getAllVideo()
    }

    render () {
        const { videos, addVideo } = this.state
        const { currentUser, currentPurchase, addToPurchase, currentUserVideos, removefromPurchase } = this.props
        return (
        <div>
            <h1>{addVideo ? "Add Video": "All videos"}</h1>
                {currentUser.admin ?
                    <button onClick={() => this.handleAddVideoClick()}>{addVideo ? "Cancel" : "Add Video"}</button> : null}
            { addVideo ? 
            <div><CreateVideoForm/></div>:
            <div>
                { videos.length === 0 && <p>Sorry, there is no videos.</p>}
                {videos.map(video => <Videos video={video} key={video.id} currentUser={currentUser} currentPurchase={currentPurchase} 
                    addToPurchase={addToPurchase} currentUserVideos={currentUserVideos} removefromPurchase={removefromPurchase}/>)}
            </div>}
        </div>)
    }
}

export default VideosContainers