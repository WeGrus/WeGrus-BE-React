import axios from "axios";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone-uploader";
import { connect } from "react-redux";
import styled from "styled-components";
import { actionCreators } from "../../../store";

const SFileUploadComponent = styled.label`
  width: 63px;
  height: 33px;
  background-color: #0b665c;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 20px;
  color: white;
  font-weight: 500;
  cursor: pointer;
`;
function mapStateToProps(state) {
  console.log(state);
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    editPhoto: (imageUrl) => dispatch(actionCreators.editPhoto(imageUrl)),
  };
}

const FileUploadComponent = (props) => {
  const [editFile, setEditFile] = useState(null);
  useState(() => {}, [editFile]);
  const fileParams = ({ meta }) => {
    console.log(meta);
    return { url: "https://httpbin.org/post" };
  };
  const onFileChange = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };
  const onSubmit = (files, allFiles) => {
    allFiles.forEach((f) => f.remove());
  };

  const getFilesFromEvent = (e) => {
    return new Promise((resolve) => {
      getDroppedOrSelectedFiles(e).then((chosenFiles) => {
        const file = chosenFiles[0].fileObject;
        const config = {
          header: { "content-type": "multipart/form-data" },
        };
        let formData = new FormData();
        formData.append("image", file);

        axios
          .patch("/members/image", formData, config)
          .then((res) => {
            console.log(res);
            const imageUrl = res.data.data.imageUrl;

            setEditFile(res.data.data.imageUrl);
            props.editPhoto(imageUrl);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  };
  const selectFileInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
    return (
      <SFileUploadComponent className="btn btn-danger mt-4">
        수정
        <input
          style={{ display: "none" }}
          type="file"
          accept={accept}
          multiple
          onChange={(e) => {
            getFilesFromEvent(e).then((chosenFiles) => {
              onFiles(chosenFiles);
            });
          }}
        />
      </SFileUploadComponent>
    );
  };
  return (
    <Dropzone
      onSubmit={onSubmit}
      onChangeStatus={onFileChange}
      InputComponent={selectFileInput}
      getUploadParams={fileParams}
      getFilesFromEvent={getFilesFromEvent}
      accept="image/*"
      maxFiles={1}
    />
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileUploadComponent);
