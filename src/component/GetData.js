import React, { useState } from "react";
import "../dataBase/firebase.Config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";
import { Input } from "@mui/material";

function GetData() {
  const [fetchData, setFatchData] = useState([]);
  const [inputData, setInputData] = useState("");
  const [filterUserData, setFilterUserData] = useState(null);
  const [allUserData, setAllUserData] = useState(null);

  const fetchDataHandler = async () => {
    const db = getFirestore();
    const colRef = collection(db, "excelcollection");
    const data = await getDocs(colRef);
    let result = data.docs.map((doc) => ({ ...doc.data() }));

     result.forEach((doc) => {
     
      setFatchData(doc.data);
      setAllUserData(doc.data);
    });
   
  };
  
  const fetchDataByName = async (inputData) => {
    const filterData = fetchData.filter(
      (user) => user.email === inputData.trim().toLowerCase()
    );

    if (filterData.length < 1) {
      alert("No User Exist... Kindle check your Email id");
    } else {
      setFilterUserData(filterData);
      setAllUserData(null);
    }
  };

  const handleChage = (e) => {
    e.preventDefault();
    setInputData(e.target.value);
  };

  return (
    <div>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          marginTop: "5px",
        }}
      >
        <Stack spacing={1} direction="row">
          <StyledInputElement
            onChange={handleChage}
            placeholder="Search By Email"
            type="text"
            required
          />
          <ColorButton
            onClick={() => fetchDataByName(inputData)}
            variant="contained"
            defaultValue={"contailner"}
          >
            Search Button
          </ColorButton>

          <ColorButton onClick={fetchDataHandler} variant="contained">
            All data
          </ColorButton>
        </Stack>
      </div>
      {allUserData ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <table>
            <thead>
              {allUserData ? (
                <tr>
                  <th>Id</th>
                  <th>first_name</th>
                  <th>last_name</th>
                  <th>email</th>
                  <th>gender</th>
                </tr>
              ) : null}
            </thead>

            <tbody>
              {allUserData?.map((eachexceldata, index) => (
                <tr key={index}>
                  <th>{eachexceldata.id}</th>
                  <th>{eachexceldata.first_name}</th>
                  <th>{eachexceldata.last_name}</th>
                  <th>{eachexceldata.email}</th>
                  <th>{eachexceldata.gender}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <table>
            <thead>
              {filterUserData ? (
                <tr>
                  <th>Id</th>
                  <th>first_name</th>
                  <th>last_name</th>
                  <th>email</th>
                  <th>gender</th>
                 
                </tr>
              ) : null}
            </thead>

            <tbody>
              {filterUserData?.map((eachexceldata, index) => (
                <tr key={index}>
                  <th>{eachexceldata.id}</th>
                  <th>{eachexceldata.first_name}</th>
                  <th>{eachexceldata.last_name}</th>
                  <th>{eachexceldata.email}</th>
                  <th>{eachexceldata.gender}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div></div>
    </div>
  );
}

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

const StyledInputElement = styled(Input)(({ theme }) => ({
  width: "320px",
  fontSize: "IBM Plex Sans",
  fontWeight: 400,
  lineHeight: 1.5,
  padding: "8px 12px",
  borderRadius: "8px",
  border: ` 3px solid${theme.palette.grey[500]}`,

  background: theme.palette.grey[300],
  color: theme.palette.grey[900],
  "&:hover": {
    borderColor: "blue",
  },
}));

export default GetData;
