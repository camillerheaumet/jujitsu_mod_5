import React from 'react'
import EditAccountForm from '../components/EditAccountForm'

class MyAccountContainer extends React.Component {
    state = {
        clicked: false
    }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked})
    }

    render() {
        const { currentUser, alertFunc } = this.props
        const { clicked } = this.state
        return (
            <div>
            <h1>My Account</h1>
            {!!localStorage.getItem('token') ?
              <div>
                  {clicked ?
                    <EditAccountForm currentUser={currentUser} alertFunc={alertFunc}/> :
                    <div>
                        <p>Name: {currentUser.name}</p>
                        <p>Email: {currentUser.email}</p>
                        <p>Password: ******</p>
                    </div>}
              <button onClick={() => this.handleClick()}>{clicked ? "Cancel" : "Edit my account"}</button>
              </div> :
              <p>You are not currently logged in</p>}
          </div>
        )
    }
}

export default MyAccountContainer