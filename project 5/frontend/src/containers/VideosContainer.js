import React from 'react'
import Videos from '../components/Videos'
import CreateVideoForm from '../components/CreateVideoForm'

class VideosContainers extends React.Component {
    state = {
        videos: [],
        addVideo: false
    }

    handleAddVideoClick = () => {
        this.setState({addVideo : !this.state.addVideo })
    }

    render () {
        const { addVideo } = this.state
        const { currentUser, currentPurchase, allVideos, addToPurchase, currentUserVideos, removefromPurchase } = this.props
        return (
        <div>
            <h1>{addVideo ? "Add Video": "All videos"}</h1>
                {currentUser.admin ?
                    <button onClick={() => this.handleAddVideoClick()}>{addVideo ? "Cancel" : "Add Video"}</button> : null}
            { addVideo ? 
            <div><CreateVideoForm/></div>:
            <div>
                { allVideos.length === 0 && <p>Sorry, there is no videos.</p>}
                {allVideos.map(video => <Videos video={video} key={video.id} currentUser={currentUser} currentPurchase={currentPurchase} 
                    addToPurchase={addToPurchase} currentUserVideos={currentUserVideos} removefromPurchase={removefromPurchase}/>)}
            </div>}
        </div>)
    }
}

export default VideosContainers