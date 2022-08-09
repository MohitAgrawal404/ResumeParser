import React, { useState } from "react";
import "antd/dist/antd.min.css";
import "./App.css";
import { Modal } from "antd";
import axios from "axios";

const Form = ({ onCancel, visible }) => {
  const [Fi, setFi] = useState(null);
  const [Ti, setTi] = useState(null);

  return (
    <Modal
      maskClosable={false}
      onCancel={onCancel}
      visible={visible}
      width={"50%"}
      bodyStyle={{ height: 600, overflowY: "auto" }}
      style={{ top: 20 }}
      onOk={() => {

        let formData = new FormData();
        formData.append('title', Ti);
        formData.append('file', Fi[0]);
        
        axios.post("api/resumes/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
        .then(res => alert("Form Submitted"))
        .catch(errors => console.log(errors));
      }}
    >
      <div>
        <form>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={(event) => {
              setTi(event.target.value);
              console.log(Ti);
            }}
          />
          <label htmlFor="file">Select a file:</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={(event) => {
              setFi(event.target.files);
              console.log(Fi);
            }}
          />
        </form>
      </div>
    </Modal>
  );
};

export default Form;
