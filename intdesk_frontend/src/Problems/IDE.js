
import Editor from "@monaco-editor/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import spinner from "../images/spinner.gif";
import LanguageData from "./LanguageData";

import "./ide.css";


export default function IDE({problem, id}){
    
    
    const [authToken, setAuthToken] = useState(JSON.parse(localStorage.getItem("authToken")));

    const [code, setCode] = useState("//Enter your code here")
    const [language, setLanguage] = useState(LanguageData[0])
    const [fontSize, setFontSize] = useState(16)
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [loading, setLoading] = useState(false)

  const [results, setResults] = useState([]);
  const [done, setDone] = useState(0);

    const options = {
        "fontSize": fontSize, 
        "minimap": {enabled: false}
    }

    useEffect(() => {
        const fetchSolution = async () => {
            console.log("fetching solution for ", id);
            await axios.get("https://intdesk.herokuapp.com/problems/problem/".concat(id).concat('/latest_solution'), {
                headers: {
                  Authorization: "Token ".concat(authToken.token),
                  "Content-Type": "application/json",
                },
              })
            .then(res => {

            console.log("solution returned")
            console.log(window.$log = res.data)
            setCode(res.data.code);
  
            })
            .catch(err => {
                console.log("solution error");
              console.log(err)
            })
          }
          fetchSolution();
    }, [id, authToken])

    
    
  const allFontSizes = [16, 18, 20, 22, 24, 26, 28, 30, 32].map((font) => ({
    value: font,
    label: font,
  }));


  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_RAPID_API_URL}/${token}`,
      // url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };

    console.log("checking url...", options.url);
    let status;
    let memoryUsed;
    let timeUsed;

    await axios
      .request(options)
      .then((response) => {
        status = response.data.status;
        memoryUsed = response.data.memory;
        timeUsed = response.data.time;
        let statusId = status.id;
        console.log("status", status.description);

        console.log("memory", memoryUsed);
        console.log("time", timeUsed);

        if (statusId === 1 || statusId === 2) {
          setTimeout(() => {
            status = checkStatus(token);
          }, 2000);
        } else {
          setLoading(false);
          if (statusId === 3) {
            setOutput(atob(response.data.stdout));
          } else {
            setOutput(response.data.status?.description);
          }
          console.log("done successfully");
          console.log(response.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
    return { status, memoryUsed, timeUsed };
  };

  const compileCode = async () => {
    setLoading(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(input),
      cpu_time_limit: problem.time_limit,
      cpu_extra_time: 0.1,
      memory_limit: problem.memory_limit * 1000,
    };
    console.log("formData");
    console.log(formData);

    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    await axios
      .request(options)
      .then((response) => {
        console.log("res.data", response.data);
        const token = response.data.token;
        console.log("token", token);
        let { status, memoryUsed, timeUsed } = checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        let status = error.reponse.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);
        }
        console.log("error", err);
        setLoading(false);
      });
  };

  const submitCode = async () => {
    console.log("Submitting code...");

    const inputOutputs = problem.input_outputs;
    console.log(inputOutputs);
    setResults(
      Array(problem.input_outputs.length).fill({
        status: "",
        memory: "",
        time: "",
      })
    );
    for (let i = 0; i < inputOutputs.length; i += 1) {
      setLoading(true);
      const formData = {
        language_id: language.id,
        // encode source code in base64
        source_code: btoa(code),
        stdin: btoa(inputOutputs[i].input),
        expected_output: btoa(inputOutputs[i].output),
        cpu_time_limit: problem.time_limit,
        cpu_extra_time: 0.1,
        memory_limit: problem.memory_limit * 1000,
      };
      const options = {
        method: "POST",
        url: process.env.REACT_APP_RAPID_API_URL,
        params: { base64_encoded: "true", fields: "*" },
        headers: {
          "content-type": "application/json",
          "Content-Type": "application/json",
          "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        },
        data: formData,
      };

      await axios
        .request(options)
        .then((response) => {
          console.log("res.data", response.data);
          const token = response.data.token;
          console.log("token", token);
          let result = checkStatus(token);
        })
        .catch((err) => {
          let error = err.response ? err.response.data : err;
          let status = error.reponse.status;
          console.log("status", status);
          if (status === 429) {
            console.log("too many requests", status);
          }
          console.log("error", err);
          setLoading(false);
        });
    }
  };

  return (
    <div className="ide">
      <div className="ide--menu">
        <div style={{ width: "200px" }}>
          Language
          <Select
            options={LanguageData}
            value={language}
            onChange={(sl) => setLanguage(sl)}
            placeholder={language}
          />
        </div>
        <div style={{ width: "200px" }}>
          Font Size
          <Select
            options={allFontSizes}
            value={fontSize}
            onChange={(event) => setFontSize(event.value)}
            placeholder={fontSize}
          />
        </div>

        {/* <input 
                    type="range" min="12" max="32" 
                    value={fontSize} step="2"
                    onChange={(event) => setFontSize(event.target.value)} 
                    id="font"/>  */}
      </div>
      <div className="ide--body">
        <div className="top-container">
          <Editor
            options={options}
            height="calc(50vh)"
            width="100%"
            theme="light"
            language={language.value}
            defaultLanguage={LanguageData[0].value}
            defaultValue={code}
            value={code}
            onChange={(value) => {
              setCode(value);
            }}
            style={{ border: "black" }}
          />
        </div>
        <div className="bottom-container">
          <div className="input-box">
            <textarea
              id="code-inp"
              placeholder="Enter input values..."
              onChange={(event) => setInput(event.target.value)}
            />
          </div>

          <div className="input-box">
            {loading ? (
              <img src={spinner} width="100%" height="100%" alt="loading..." />
            ) : (
              <textarea
                id="code-out"
                readOnly
                placeholder="Output values..."
                value={output}
              />
            )}

           </div>
        </div>
        <div className="button-container">
          <div>
            <button
              type="button"
              className="run-btn"
              onClick={() => compileCode()}
            >
              Run
            </button>
          </div>
          <div>
            
            <Link
              to={`/problems/problem/${problem.id}/result`}
              state={{ problem, code, language }}
            >
              <button type="button" className="run-btn">
                Submit
              </button>
              
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
