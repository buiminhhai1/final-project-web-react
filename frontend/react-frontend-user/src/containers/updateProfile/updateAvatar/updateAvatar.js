import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Button, Container } from 'react-bootstrap'
import { message, Spin } from 'antd';

import "./updateAvatar.css";
import { getAuthToken, getAuthUser, getAuthPending, getAuthError } from "../../../store/reducers/auth";
import { clearUserImageUrl, updateImageUrl, setUserImageUrl } from '../../../store/actions/profile';
import { resetErrorMessage } from '../../../store/actions/auth';

const avatarFileType = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
const avatarFileTypeArray = avatarFileType.split(',').map(item => { return item.trim() });
const avatarFileMaxSize = 2097152;


function UpdateAvatar(props) {
  const [avatarFile, setAvatarFile] = useState(props.user.imageUrl);
  const [alert, setAlert] = useState(false);

  // Handle dropzone & avatar
  // const { getRootProps, getInputProps } = useDropzone();

  function verifyAvatarFile(files) {
    if (files && files.length > 0) {
      const verifyFile = files[0];

      // Check file type
      if (!avatarFileTypeArray.includes(verifyFile.type)) {
        alert("The file's format is not correct!!!");
        return false;
      }
      if (verifyFile.size > avatarFileMaxSize) {
        alert("The file is too big!!!");
        return false;
      }
      return true;
    }
  }

  function handleOnDrop(files, rejectedFiles) {
    if (rejectedFiles && rejectedFiles.length > 0) {
      verifyAvatarFile(rejectedFiles);
    }
    if (files && files.length > 0) {
      if (verifyAvatarFile(files)) {
        // imageBase64Data
        const avatarFile = files[0];
        // setAvatarFile(avatarFile);
        const avatarReader = new FileReader();
        avatarReader.addEventListener("load", () => {
          // console.log(avatarReader);
          props.setUserImageUrl(avatarReader.result);
          setAvatarFile(avatarReader.result);
        }, false);

        avatarReader.readAsDataURL(avatarFile);
      }
    }
  }

  function clearCurrentAvatar() {
    props.clearUserImageUrl();
  }

  async function handleSubmitAvatar(event) {
    event.preventDefault();
    // Authenticate current user with token
    let token = props.token;
    let userId = props.user.userId;
    props.updateImageUrl({ token, avatarFile, userId });
    setAlert(true);
    setAvatarFile(null);
    setTimeout(() => setAlert(false), 3000);
  }

  let successMessage = null;
  if (props.message) {
    successMessage = message.success(props.message);
    props.resetErrorMessage();

  }

  return (
    <Spin spinning={props.pending} tip="Loading...">
      <div className="updateAvatar">
        {successMessage}
        {props.user.imageUrl !== null ?
          <div id="avatar">
            <img className="avatarImage" src={props.user.imageUrl} alt="Cannot show!!!"></img>
            <div className="avatarBtn">
              <button className="btn btn-outline-info changeAvatarBtn" onClick={() => clearCurrentAvatar()}>Change avatar</button>
              {!props.message ?
                <button className="btn btn-outline-success uploadAvatarBtn" variant="outline-success" onClick={handleSubmitAvatar}>Upload</button>
                :
                <button className="btn btn-success uploadAvatarBtn" variant="success" disabled>Upload</button>
              }
            </div>
          </div>
          :
          <Dropzone onDrop={handleOnDrop}
            multiple={false}
            maxSize={avatarFileMaxSize}
            accept={avatarFileType}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="container avatarDropzone">
                <input {...getInputProps()} />
                <p>Drag & drop your image here, or click to select image ( {'<'} 2MB )</p>
              </div>
            )}
          </Dropzone>
        }
      </div>
    </Spin>
  )
}

const mapStateToProps = state => ({
  token: getAuthToken(state),
  user: getAuthUser(state),
  error: getAuthError(state),
  pending: getAuthPending(state),
  message: state.authReducer.message,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  clearUserImageUrl, updateImageUrl, setUserImageUrl, resetErrorMessage
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateAvatar);