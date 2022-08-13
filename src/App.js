// import "./App.css";
// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { Button } from "antd";
// import PdfView from "./PDFView";
// import Form from "./Form";

// const App = () => {
//   const [posts, setPosts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showPdf, setShowPdf] = useState(false);
//   const [myPdf, setMyPdf] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     axios.get("api/resumes/?q=" + searchTerm).then((response) => {
//       setPosts(response.data);
//     });
//     console.log("render");
//   }, [searchTerm]);

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search by Keyword"
//         onChange={(event) => {
//           setSearchTerm(event.target.value);
//           console.log(searchTerm);
//         }}
//       />
//       <PdfView
//         pdf={myPdf}
//         onCancel={() => setShowPdf(false)}
//         visible={showPdf}
//       />
//       <Form onCancel={() => setShowForm(false)} visible={showForm} />
//       {posts.map((val) => {
//         return (
//           <Button
//             className="user"
//             key={val.id}
//             onClick={() => {
//               setShowPdf(!showPdf);
//               setMyPdf(val.file);
//               console.log(myPdf);
//             }}
//           >
//             {val.title}
//           </Button>
//         );
//       })}
//       <Button
//         onClick={() => {
//           setShowForm(!showForm);
//         }}
//       >
//         + Add New PDF
//       </Button>
//     </div>
//   );
// };

// export default App;

import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import PdfView from "./PDFView";
import Form from "./Form";
import { AiOutlineSearch, AiOutlineDownload } from 'react-icons/ai'
import { IoIosOptions } from 'react-icons/io'
import {GrView} from 'react-icons/gr'

const App = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPdf, setShowPdf] = useState(false);
  const [myPdf, setMyPdf] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const choices = ["Language Filter", "Python", "Java", "Django", "React", "Rust", "JavaScript"];
  const [language, setlanguage] = useState("Language Filter");


  useEffect(() => {
    axios.get(`api/resumes/?q=${searchTerm}&f1=${language}`).then((response) => {
      setPosts(response.data);
    });
    console.log("render");
  }, [searchTerm, language]);

  // useEffect(() => {
  //   axios.get("api/resumes/?q=" + choices).then((response) => {
  //     setChoices(response.data);
  //   });
  //   console.log("render");
  // }, [choices]);

  const Add = choices.map(Add => Add)
  const handleAddrTypeChange = (e) => setlanguage(e.target.value)


  return (
    <div>
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="clipboard.png" 
              alt="" width="30" height="24" 
              className="d-inline-block align-text-top"/>
            Resume Parser
          </a>
        </div>
      </nav>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1"><AiOutlineSearch /></span>
        <input
          type="text"
          placeholder="Search..."
          className="form-control"
          aria-describedby="basic-addon1"
          onChange={(event) => {
            setSearchTerm(event.target.value);
            console.log(searchTerm);
          }}
        />

        <Button
          type="buttom"
          className="btn btn-info"
          onClick={() => {
            setShowForm(!showForm);
          }}
        >
          UPLOAD RESUME
        </Button>
      </div>

      <div class="input-group mb-3">
      <label class="input-group-text" for="inputGroupSelect01"><IoIosOptions/></label>
        <select
          class="form-select"
          id="inputGroupSelect01"
          onChange={e => handleAddrTypeChange(e)}
        >
          {
            Add.map((address, key) => 
            <option value={address}>{address}</option>)
          }
        </select >
      </div>
      <PdfView
              pdf={myPdf}
              onCancel={() => setShowPdf(false)}
              visible={showPdf}
      />
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Experience</th>
            <th scope="col">Top Skills</th>
            <th scope="col">Resume</th>
          </tr>
        </thead>
        <tbody >
          {posts.map(item => {
            let banan = "";
            for (let i = 0; i < item.info.skills.length; i++){
              banan += (item.info.skills[i] + ", ")
            }
            return (
              <tr>
                <td>{ item.info.name }</td>
                <td>{ item.info.total_experience }</td>
                <td >{ banan }</td>
                <td><GrView onClick={() => {
              setShowPdf(!showPdf);
              setMyPdf(item.file);
              console.log(myPdf);
            }}/></td>
              </tr>
            )
          })}
        </tbody>
      </table>


      

      <Form onCancel={() => setShowForm(false)} visible={showForm} />
      {/* {posts.map((val) => {
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
      })} */}
    </div>
  );
};

export default App;