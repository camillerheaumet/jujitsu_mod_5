import React from 'react'

class Video extends React.Component {
    state = { expanded: false }
  
    handleExpandClick = () => {
      this.setState(state => ({ expanded: !state.expanded }))
    };
  
    render () {
      const { item } = this.props
  
      return (
        <div>
            
        </div>
      )
    }
  }
  
  export default Video