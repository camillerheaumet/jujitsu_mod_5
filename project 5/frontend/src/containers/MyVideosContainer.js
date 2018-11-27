import React from 'react'

import API from '../API'
import MyVideos from '../components/MyVideos'

class MyVideosContainer extends React.Component {
  state = {
    myvideos: []
  }

  getUserVideo() {
    API.getUserVideos()
      .then(data => {
        if (data.error) {
          alert('You are not signed in')
        } else {
          this.setState({ myvideos: data })
        }
      })
  }

  componentDidMount() {
    if (!!this.props.email) {
      this.props.history.push('/signin')
    } else {
      this.getUserVideo()
    }
  }

  render () {
    const { myvideos } = this.state

    return (
      <div>
        {!!localStorage.getItem('token') ?
          <div>
          <h3>Here's your purchased videos:</h3>
          { myvideos.length === 0 && <p>Sorry, you don't have any videos.</p>}
          {myvideos.map(myvideo => <MyVideos myvideo={myvideo} key={myvideo.id}/>)}
          </div> :
          <p>You are not currently logged in</p>}
      </div>
    )
  }
}

export default MyVideosContainer
