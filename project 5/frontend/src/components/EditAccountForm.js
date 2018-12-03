import React from 'react'
import API from '../API'

class EditAccountForm extends React.Component {
    handleSubmitEdit = (event) => {
        let editUser = {}
        if (event.target.name.value !== this.props.currentUser.name){
            editUser = {...editUser, name: event.target.name.value}
        };
        if (event.target.email.value !== this.props.currentUser.email){
            editUser = {...editUser, email: event.target.email.value}
        };
        if (event.target.psw.value !== ''){
            editUser = this.validatePassword(event, editUser)
        };

        API.updateUser(this.props.currentUser.id, editUser)
    }

    validatePassword = (event, variable) => {
        event.preventDefault()
        if (event.target.psw.value !== event.target.pswconf.value) {
            this.alertFuncPassword('Password is different than the confirm password. Please re-enter them.', event)
        } else if (event.target.psw.value.toLowerCase() === event.target.name.value.toLowerCase()){
            this.alertFuncPassword('Your password can not be your name. Please choose a secure password.', event)
        } else if (event.target.psw.value.length < 6) {
            this.alertFuncPassword('Your password need to be 6 characters or plus.', event)
        } else {
            return variable = {...variable, password: event.target.psw.value}
        }
    }

    alertFuncPassword = (string, event)  => {
        this.props.alertFunc(string);
        event.target.psw.value = '';
        event.target.pswconf.value = ''
    }

    render() {
        const { currentUser } = this.props
        return (
            <div>
                <form onSubmit={event => this.handleSubmitEdit(event)}>
                    <label className="sign-in" htmlFor="name"><b>Your new name</b></label>
                    <input className="sign-in" type="text" placeholder="Enter your name" name="name" defaultValue={currentUser.name}/>

                    <label className="sign-in" htmlFor="email"><b>Your new email</b></label>
                    <input className="sign-in" type="text" placeholder="Enter your email" name="email" defaultValue={currentUser.email}/>

                    <label className="sign-in" htmlFor="description"><b>Password</b></label>
                    <input className="sign-in" type="password" placeholder="Enter Video's description" name="psw"/>

                    <label className="sign-in" htmlFor="image"><b>Confirm password</b></label>
                    <input className="sign-in" type="password" placeholder="Re-enter password" name="pswconf"/>

                    <button type='submit'>Save changes</button>
                </form>
            </div>
        )
    }
}

export default EditAccountForm