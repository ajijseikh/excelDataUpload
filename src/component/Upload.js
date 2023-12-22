import React, { useState } from "react";
import * as XLSX from "xlsx";
import { CloudUpload } from "@mui/icons-material";
import "../dataBase/firebase.Config";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import "./upload.css";

import { Button, Input } from "@mui/material";

function Upload() {
  const db = getFirestore();

  const saveDataToFireStore = async (data) => {
    const docRef = await addDoc(collection(db, "excelcollection"), {
      data,
    });
    alert("Document upload to database");
  };

  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  const handleChage = async (e) => {
    e.preventDefault();
    let fileType = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();

        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
        setExcelFile(e.target.result);
        };
      } else {
        setTypeError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("Please select your file");
    }
  };

  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      // database
      saveDataToFireStore(data);
    }
  };
  return (
    <div className="wrapper">
      <h3>Upload & view Excel sheets</h3>

      {/* form */}
      <form onSubmit={handleSubmit}>
        <Input
          onChange={handleChage}
          type="file"
          placeholder="Select File"
          className="form-style"
          required
        />

        <Button
          type="submit"
          className="btn-submit"
          component="label"
          variant="contained"
          startIcon={<CloudUpload />}
        >
          Submit File
        </Button>
        {typeError && (
          <div className="alert-style" role="alert">
            {typeError}
          </div>
        )}
      </form>
    </div>
  );
}

export default Upload;
