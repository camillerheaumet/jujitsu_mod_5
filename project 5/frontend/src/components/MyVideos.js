import React from 'react'

import API from '../API'
import Video from './Video'

class MyVideos extends React.Component {
  state = {
    videos: []
  }

  style = {
    display: 'flex',
    flexDirection: 'column',
    alignVideo: 'center',
    flexWrap: 'wrap'
  }

  getUserVideo() {
    API.getUserVideo()
      .then(data => {
        if (data.error) {
          alert('You are not signed in, person.')
        } else {
          this.setState({ videos: data })
        }
      })
  }

  componentDidMount() {
    if (!this.props.email) {
      this.props.history.push('/signin')
    } else {
      this.getUserVideo()
    }
  }

  render () {
    const { videos } = this.state

    return (
      <div style={this.style} className='user-list'>
        <h3>Here's your purchased videos:</h3>
        { videos.length === 0 && <p>Sorry, you don't have any videos.</p>}
        {
          videos.map(video =>
            <video key={video.id} video={video} />
          )
        }
      </div>
    )
  }
}

export default MyVideos
