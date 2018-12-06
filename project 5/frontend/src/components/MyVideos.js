import React from 'react'
import noImageIcon from '../noImageIcon.png'

class MyVideos extends React.Component {
    state = { expanded: false }
  
    handleExpandClick = () => {
      this.setState(state => ({ expanded: !state.expanded }))
    };

    getVideosImage = () => {
      if (this.props.myVideo.image_url === '') {
         return <img src={noImageIcon} alt={"default"}/>
      } else {
         return <img src={this.props.myVideo.image_url} alt={`${this.props.myVideo.name}`}/>
      }
    }
  
    render () {
      const { myVideo } = this.props
  
      return (
        <div>
          <h3>{myVideo.name}</h3>
          <p>{this.getVideosImage()}</p>
          <button onClick={()=> window.open(myVideo.download_url, "_blank")}>Download</button>
          <button onClick={() => this.handleExpandClick()}>{
            this.state.expanded ?
            'Hide description': 'Reveal description'}
          </button>
          {this.state.expanded ?
            <div><h4>Description:</h4>
            <p>{myVideo.description}</p></div> : null}

        </div>
      )
    }
  }
  
  export default MyVideos