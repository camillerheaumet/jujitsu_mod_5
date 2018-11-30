import React from 'react'
import API from '../API'

class CreateVideoForm extends React.Component {
    handleSubmitNewVideo = (event) => {
        const newVideo = {
            name: event.target.name.value,
            price: event.target.price.value,
            description: event.target.description.value,
            image_url: event.target.image.value,
            download_url: event.target.download.value
        }
        API.createNewVideo(newVideo)
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmitNewVideo(event)}>
                <label className="sign-in" htmlFor="name"><b>Video's name</b></label>
                <input className="sign-in" type="text" placeholder="Enter Video's name" name="name" required />

                <label className="sign-in" htmlFor="price"><b>Video's price</b></label>
                <input className="sign-in" type="text" placeholder="Enter Video's price" name="price" required />

                <label className="sign-in" htmlFor="description"><b>Video's description</b></label>
                <input className="sign-in" type="text" placeholder="Enter Video's description" name="description" />

                <label className="sign-in" htmlFor="image"><b>Video's image URL</b></label>
                <input className="sign-in" type="text" placeholder="Enter Video's image URL" name="image" />

                <label className="sign-in" htmlFor="download"><b>Video's download URL</b></label>
                <input className="sign-in" type="text" placeholder="Enter Video's download URL" name="download" required />

                <button type='submit'>Save video</button>
            </form>
        )
    }
}

export default CreateVideoForm