//Cedit to Matt Croak for this portion of the code:

import React, { useState } from "react";
import "antd/dist/antd.min.css";
import "./App.css";
import { Modal, Button } from "antd";
import PDF from "react-pdf-js";

const PdfViewer = ({ pdf, onCancel, visible }) => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(null);

  const onDocumentComplete = (numPages) => {
    setPages(numPages);
  };

  const onDocumentError = (err) => {
    console.error("pdf viewer error:", err);
  };

  const onPage = (type) => {
    var newPage = type ? page + 1 : page - 1;

    if (newPage > pages) {
      newPage = 1;
    } else if (newPage < 1) {
      newPage = pages;
    }

    setPage(newPage);
  };

  const footer = (
    <div className="footer">
      <Button onClick={() => onPage(0)}>Previous</Button>
      <Button onClick={() => onPage(1)}>Next</Button>
    </div>
  );

  return (
    <Modal
      maskClosable={false}
      onCancel={onCancel}
      visible={visible}
      width={"50%"}
      bodyStyle={{ height: 600, overflowY: "auto" }}
      style={{ top: 20 }}
      footer={footer}
    >
      <div className="pdfWrapper">
        <PDF
          file={pdf}
          onDocumentComplete={onDocumentComplete}
          onDocumentError={onDocumentError}
          page={page}
        />
      </div>
    </Modal>
  );
};
export default PdfViewer;
