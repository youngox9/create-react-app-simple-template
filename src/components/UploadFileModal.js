import React, { useState, useCallback } from "react";
import { connect } from "react-redux";

import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "@/utils/axios";
import useForm from "@/hooks/useForm";
import { useDropzone } from "react-dropzone";

function UploadFileModal(props) {
  const { isOpen, onClose = () => {} } = props;
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      scrollable={true}
      centered={true}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Upload File</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div
          className={`upload-zoom ${isDragActive && "active"}`}
          {...getRootProps()}
        >
          Drag and drop a file here
          <input {...getInputProps()} />
        </div>
        <div className="devider">
          <span>Or, select an option below</span>
        </div>
        <div class="row">
          <div class="col">
            <button class="upload-type-btn">
              <i class="fas fa-print"></i>
              <span>Scan</span>
            </button>
          </div>
          <div class="col">
            <button class="upload-type-btn">
              <i class="fas fa-desktop"></i>
              <span>Computer</span>
            </button>
          </div>
          <div class="col">
            <button class="upload-type-btn">
              <i class="fab fa-dropbox"></i>
              <span>Dropbox</span>
            </button>
          </div>
          <div class="col">
            <button class="upload-type-btn">
              <i class="fab fa-google-drive"></i>
              <span>Google Drive</span>
            </button>
          </div>
          <div class="col">
            <button class="upload-type-btn">
              <i class="fas fa-envelope"></i>
              <span>E-mail</span>
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default connect()(UploadFileModal);
