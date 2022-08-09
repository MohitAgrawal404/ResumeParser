import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import PdfView from "./PDFView";
import Form from "./Form";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPdf, setShowPdf] = useState(false);
  const [myPdf, setMyPdf] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios.get("api/resumes/?q=" + searchTerm).then((response) => {
      setPosts(response.data);
    });
    console.log("render");
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by Keyword"
        onChange={(event) => {
          setSearchTerm(event.target.value);
          console.log(searchTerm);
        }}
      />
      <PdfView
        pdf={myPdf}
        onCancel={() => setShowPdf(false)}
        visible={showPdf}
      />
      <Form onCancel={() => setShowForm(false)} visible={showForm} />
      {posts.map((val) => {
        return (
          <Button
            className="user"
            key={val.id}
            onClick={() => {
              setShowPdf(!showPdf);
              setMyPdf(val.file);
              console.log(myPdf);
            }}
          >
            {val.title}
          </Button>
        );
      })}
      <Button
        onClick={() => {
          setShowForm(!showForm);
        }}
      >
        + Add New PDF
      </Button>
    </div>
  );
};

export default App;
