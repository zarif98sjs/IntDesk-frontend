import { useState } from "react";
import Select from "react-select";
import Markdown from "react-textarea-markdown";
import LanguageData from "./LanguageData";

function NewAuthorSolution({handleTextChange, handleMarkDownChange}) {
    const [language, setLanguage] = useState(LanguageData[0]);

    return (
        <div>
            <div className="input-row">
                <label htmlFor='solution'><h2>Add A Solution</h2></label>
            </div>

            <br/>
            <div style={{paddingLeft: "20px", display: "flex"}}>
            <label htmlFor='language' style={{paddingBottom: "30px", paddingTop: "10px", paddingRight: "20px"}}>Language</label>
            
                <Select
                    options={LanguageData} 
                    value={language}
                    onChange={(sl) => setLanguage(sl)}
                    placeholder={language}
                    id='language' 
                
                />  
                
                </div>
            <br />
            
            <Markdown id='solution' name='editorial' callback={handleMarkDownChange} textarea={true} customWidth={[50,50]} style={{paddingLeft: "100px", maxHeight: "100vh"}}/>
            
        </div>
    )

    

}
export default NewAuthorSolution;