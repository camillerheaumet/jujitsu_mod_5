import React from 'react'

class MyVideos extends React.Component {
    // state = { expanded: false }
  
    // handleExpandClick = () => {
    //   this.setState(state => ({ expanded: !state.expanded }))
    // };
  
    render () {
      const { myvideo } = this.props
  
      return (
        <div>
            {`hello word ${myvideo.name}`}
        </div>
      )
    }
  }
  
  export default MyVideos