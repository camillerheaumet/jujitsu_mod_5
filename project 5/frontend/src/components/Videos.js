import React from 'react'
import ModifyVideoForm from './ModifyVideoForm'
import API from '../API'
import noImageIcon from '../noImageIcon.png'

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

class Videos extends React.Component {
    state = { 
        expanded: false,
        modifyForm: false
    }
  
    handleExpandClick = () => {
      this.setState({ expanded: !this.state.expanded })
    }

    handleModifyFormClick = () => {
        this.setState({ modifyForm: !this.state.modifyForm })
    }

    confirmDeleteVideo = () => {
        confirmAlert({
          title: 'Delete alert',
          message: 'Are you sure you want to delete this video?',
          buttons: [
            {
              label: 'Absolutly',
              onClick: () => API.deleteVideo(this.props.video.id).then(this.confirmDeleted())
            },
            {label: 'Nooooo!!!'}
          ]
        })
    }

    confirmDeleted = () => {
        confirmAlert({
          title: 'Delete alert',
          message: 'This video has been deleted.',
          buttons: [{label: 'OK',
          onClick: () => window.location.reload()}]
        })
    }

    getVideosImage = () => {
        if (this.props.video.image_url === '') {
           return <img src={noImageIcon} alt={"default"}/>
        } else {
           return <img src={this.props.video.image_url} alt={`${this.props.video.name}`}/>
        }
    }

    render () {
        const { video, currentUser, addToPurchase, removefromPurchase, currentUserVideos, currentPurchase } = this.props
        const { expanded, modifyForm } = this.state
        return (
            <div>
                {modifyForm ?
                <div><ModifyVideoForm video={video}/></div>:
                <div>
                    <h3>{video.name}</h3>
                    <p>{this.getVideosImage()}</p>
                    <h4>£ {video.price}</h4>
                    {!currentUser.admin ?
                    <div>
                    { currentUserVideos.find(v => v.id === video.id) ?
                        <p>You already purchased this video, you can download it via My Videos.</p> :
                        !currentPurchase.includes(video) ?
                        <button onClick={() => addToPurchase(video)}>Add to basket</button>:
                        <button onClick={() => removefromPurchase(video)}>Remove from basket</button>}
                        </div> : null}
                    <button onClick={() => this.handleExpandClick()}>{
                        expanded ?
                        'Hide description': 'Reveal description'}</button>
                    {expanded ?
                    <div><h4>Description:</h4>
                    <p>{video.description !== ''?
                        video.description:
                        "There is no description."}</p></div> : null}
                </div>}
                {currentUser.admin ?
                    <div><button onClick={() => this.handleModifyFormClick()}>{modifyForm ? "Cancel" : "Edit"}</button>
                    <button onClick={() => this.confirmDeleteVideo()}>Delete video</button></div> : null}
                
            </div>
        )
    }
}

export default Videos