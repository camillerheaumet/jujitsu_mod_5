import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

class DeleteButton  extends React.Component {
    submit = () => {
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'cam',
              onClick: () => console.log('hello cam')
            },
            {
              label: 'No',
              onClick: () => console.log('Click No')
            }
          ]
        })
      };
      alert = () => {
        confirmAlert({
          title: 'Confirm to alert',
          message: 'replce alert messages',
          buttons: [
            {
              label: 'Yes'
            }
          ]
        })
      };
     
      render() {
        return (
          <div className="container">
            <button onClick={this.submit}>Confirm dialog</button>
            <button onClick={this.alert}>alert</button>

          </div>
        );
      }
    
}

export default DeleteButton