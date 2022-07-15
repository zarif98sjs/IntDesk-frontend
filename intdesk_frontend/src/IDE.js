import React, { useState } from "react"
import Select from "react-select"
import Editor from "@monaco-editor/react"
import Axios from "axios"
import SubMenu from "./SubMenu"
import "./ide.css"

export default function IDE(){

    const [code, setCode] = useState("")
    const [language, setLanguage] = useState("c")
    const [fontSize, setFontSize] = useState(16)
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")

    const allLanguages = [{value: "c", label: "c"},{value: "cpp", label: "cpp"}, {value: "python", 
    label: "python"}, { value: "java", label: "java"}]
    
    const allFontSizes = [16, 18, 20, 22, 24, 26, 28, 30, 32].map(font => (
         {value: font, label: font}
        )
    )

    const options = {fontSize}

    
    function compileCode(){
        console.log("Code compiling...")
        
        // post request to compile end point
        // to be done later
        
        // Axios.post(`http://localhost:8000/compile`, {
        //     code: code,
        //     language: language,
        //     input: input
        // }).then(res => {
        //     setOutput(res.data.output);
        // })
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
                <textarea id="code-out" readOnly  placeholder="Output values..." value={output} />
                     
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
