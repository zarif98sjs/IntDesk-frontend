import Editor from "@monaco-editor/react"
import axios from "axios"
import React, { useState } from "react"
import Select from "react-select"
import spinner from "../images/spinner.gif"
import "./ide.css"

export default function IDE(){
    
    console.log(atob("bWFpbi5jcHA6IEluIGZ1bmN0aW9uIOKAmGludCBtYWluKCnigJk6Cm1haW4u\nY3BwOjQ6NTogZXJyb3I6IOKAmGNvdXTigJkgd2FzIG5vdCBkZWNsYXJlZCBp\nbiB0aGlzIHNjb3BlCiAgICAgY291dCA8PCAiSEVMTE8iIDw8IGVuZGw7CiAg\nICAgXn5+fgptYWluLmNwcDo0OjI0OiBlcnJvcjog4oCYZW5kbOKAmSB3YXMg\nbm90IGRlY2xhcmVkIGluIHRoaXMgc2NvcGUKICAgICBjb3V0IDw8ICJIRUxM\nTyIgPDwgZW5kbDsKICAgICAgICAgICAgICAgICAgICAgICAgXn5+fgptYWlu\nLmNwcDo0OjI0OiBub3RlOiBzdWdnZXN0ZWQgYWx0ZXJuYXRpdmU6IOKAmGVu\ndW3igJkKICAgICBjb3V0IDw8ICJIRUxMTyIgPDwgZW5kbDsKICAgICAgICAg\nICAgICAgICAgICAgICAgXn5+fgogICAgICAgICAgICAgICAgICAgICAgICBl\nbnVtCg==\n"))

    const authToken = JSON.parse(localStorage.getItem("authToken"));

    const [code, setCode] = useState("")
    const [language, setLanguage] = useState("cpp")
    const [fontSize, setFontSize] = useState(16)
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [loading, setLoading] = useState(false)

    const allLanguages = [{value: "c", label: "c"},{value: "cpp", label: "cpp"}, {value: "python", 
    label: "python"}, { value: "java", label: "java"}]
    
    const allFontSizes = [16, 18, 20, 22, 24, 26, 28, 30, 32].map(font => (
         {value: font, label: font}
        )
    )

    const options = {fontSize}

    
    const checkStatus = async (token) => {

        const options = {
            method: "GET",
            url: `${process.env.REACT_APP_RAPID_API_URL}/${token}`,
            // url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            }
        }

        console.log("checking url...", options.url)

        try{
            let response = await axios.request(options);
            let statusId = response.data.status?.id;

            if(statusId === 1 || statusId === 2){
                setTimeout(() => {
                    checkStatus(token);
                }, 2000);
            }
            else 
            {
                setLoading(false);
                if(statusId === 3){
                    setOutput(atob(response.data.stdout));
                }
                else {
                    setOutput(response.data.status?.description);
                    // setOutput(atob(response.data.compile_output));
                }
                // setOutput(response.data.stdout);
                console.log("done successfully");   
                console.log(response.data);

                
            }
        }
        catch(err){
            console.log("err", err);
            setLoading(false);

        }

    }

    const compileCode = () => {

        setLoading(true);
        const formData = {
            language_id: "53",
            // encode source code in base64
            source_code: btoa(code),
            stdin: btoa(input),
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

        axios.request(options).
        then((response) => {
            console.log("res.data", response.data);
            const token = response.data.token;
            console.log("token", token);
            checkStatus(token);
        })
        .catch((err) => {
            let error = err.response ? err.response.data : err;
            let status = error.reponse.status;
            console.log("status", status);
            if (status === 429){
                console.log("too many requests", status);
            }
            console.log("error", err)
            setLoading(false);

        })

        
    }


        
        
    function submitCode(){
        console.log("Submitting code...")
        
        
    }

    return (
        <div className="ide">
            <div className="ide--menu">
                <div style={{width: "200px"}}>
                    Language
                <Select
                    options={allLanguages} 
                    value={language}
                    onChange={(event) => setLanguage(event.value)}
                    placeholder={language}
                />  
                
                </div>
                <div style={{width: "200px"}}>
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
                language={language}
                defaultLanguage="c"
                defaultValue="// Enter your code here"
                onChange={(value) => { setCode(value) }}
                style = {{border: "black"}}
            />
            </div>
            <div className="bottom-container">
            
            <div className="input-box">
                <textarea id="code-inp" placeholder="Enter input values..." onChange=
                {(event) => setInput(event.target.value)} />
                
            </div>
            
                <div className="input-box">
                    
                
                
                {loading ? (<img src={spinner} width="100%" height="100%"
                 alt="loading..."/>) : (<textarea id="code-out" readOnly  placeholder="Output values..." value={output} />)}
                     
                {/* <textarea rows="4" cols="50" readOnly>
                At w3schools.com you will learn how to make a website. We offer free tutorials in all web development technologies.
                </textarea> */}
                {/* {output === "" ? <pre style={{color:"grey"}}>Enter output</pre> : <pre>{output}</pre>} */}
                </div>
            
            </div>
            <div className="button-container">
                <div>
                    <button type="button" className="run-btn" onClick={() => compileCode()}>
                            Run
                    </button>
                </div>
                <div>
                    <button type="button" className="submit-btn" onClick={() => submitCode()}>
                       Submit
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}