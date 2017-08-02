import React, {Component} from 'react';
import CurrentUser from './CurrentUser';
import {storage, database} from './firebase';
import FileInput from 'react-file-input';
import {Link} from 'react-router-dom';

class ProfileCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            uploadProgress: null
        }

        this.userRef = database.ref('/users').child(props.uid)
        this.storageRef = storage.ref('/user-images').child(props.uid)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFileRemoval = this.handleFileRemoval.bind(this)
    }

    handleSubmit(event) {
        const file = event.target.files[0];
        const uploadTask = this.storageRef.child(file.name).put(file, {contentType: file.type});

        uploadTask.on('state_changed', (snapshot) => {
            const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({uploadProgress});
        });

        uploadTask.then((snapshot) => {
            this.userRef.update({imageURL: snapshot.downloadURL, imageName: file.name});
            this.setState({uploadProgress: null});
        });
    }

    handleFileRemoval() {
        const {imageName} = this.props;
        this.storageRef.child(imageName).delete().then(() => {
            this.userRef.update({imageURL: null, imageName: null});
        });
    }

    render() {
        const {
            photoURL,
            displayName,
            imageURL,
            imageName,
            currentUser,
            email
        } = this.props;
        const {uploadProgress} = this.state;

        return (
            <div className="profile_page">
                <div className='peofile_image_and_button'>
                    <div className='upload_bar_wrapper'>
                        {
                            uploadProgress &&
                            <strong>Uploading: {uploadProgress} </strong>
                        }
                    </div>
                    <div className="profile_image_wrapper">
                        <img className="profile_image" src={imageURL || photoURL} alt={displayName}/>
                    </div>
                    <div className="button_wrapper">
                        {!imageName &&
                            <button className="btn btn-primary">
                                Upload an image
                                <FileInput accept=".png,.gif,.jpg" onChange={this.handleSubmit}/>
                            </button>
                        }
                        {imageName &&
                            <button className="btn btn-danger" onClick={this.handleFileRemoval}>
                                Delete Image
                            </button>
                        }
                    </div>
                </div>

                <div className="current_user_info_warpper">
                    <CurrentUser currentUser={currentUser}/>
                </div>
            </div>
        )
    }
}

export default ProfileCard;
