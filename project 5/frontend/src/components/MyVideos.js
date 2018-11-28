import React from 'react'

class MyVideos extends React.Component {
    state = { expanded: false }
  
    handleExpandClick = () => {
      this.setState(state => ({ expanded: !state.expanded }))
    };
  
    render () {
      const { myVideo } = this.props
  
      return (
        <div>
          <h3>{myVideo.name}</h3>
          <img src={myVideo.image_url} alt={`${myVideo.name}`}/>
          <h4>£ {myVideo.price}</h4>
          <button >Download</button>
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