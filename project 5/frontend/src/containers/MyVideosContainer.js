import React from 'react'
import MyVideos from '../components/MyVideos'

class MyVideosContainer extends React.Component {
  // componentDidMount() {
  //   if (!!this.props.email) {
  //     this.props.history.push('/signin')
  //   } else {
      
  //   }
  // }

  render () {
    const { currentUserVideos } = this.props

    return (
      <div>
        {!!localStorage.getItem('token') ?
          <div>
          <h3>Here's your purchased videos:</h3>
          { currentUserVideos.length === 0 && <p>Sorry, you don't have any videos.</p>}
          {currentUserVideos.map(myVideo => <MyVideos myVideo={myVideo} key={myVideo.id}/>)}
          </div> :
          <p>You are not currently logged in</p>}
      </div>
    )
  }
}

export default MyVideosContainer
