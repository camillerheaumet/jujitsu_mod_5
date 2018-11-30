import React from "react"
import API from "../API"

class ModifyVideoForm extends React.Component {
    handleSubmitModifs = (event) => {
        const modifVideo = {
            name: event.target.name.value,
            price: event.target.price.value,
            description: event.target.description.value,
            image_url: event.target.image.value,
            download_url: event.target.download.value
        }
        API.updateVideo(this.props.video.id, modifVideo)
    }

    render() {
        const { video } = this.props
        return (
            <div>
                <h2>You are currently modifying: {video.name}</h2>
                <form onSubmit={event => this.handleSubmitModifs(event)}>
                    <label className="sign-in" htmlFor="name"><b>Video's name</b></label>
                    <input className="sign-in" type="text" placeholder="Enter Video's name" name="name" defaultValue={video.name} required />

                    <label className="sign-in" htmlFor="price"><b>Video's price</b></label>
                    <input className="sign-in" type="text" placeholder="Enter Video's price" name="price" defaultValue={video.price} required />

                    <label className="sign-in" htmlFor="description"><b>Video's description</b></label>
                    <input className="sign-in" type="text" placeholder="Enter Video's description" name="description" defaultValue={video.description}/>

                    <label className="sign-in" htmlFor="image"><b>Video's image URL</b></label>
                    <input className="sign-in" type="text" placeholder="Enter Video's image URL" name="image" defaultValue={video.image_url}/>

                    <label className="sign-in" htmlFor="download"><b>Video's download URL</b></label>
                    <input className="sign-in" type="text" placeholder="Enter Video's download URL" name="download" defaultValue={video.download_url} required />

                    <button type='submit'>Save changes</button>
                </form>
            </div>
        )
    }
}

export default ModifyVideoForm