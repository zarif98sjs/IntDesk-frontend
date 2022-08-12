import { Input } from 'antd';
import Markdown from "react-textarea-markdown";

function NewStatement({handleTextChange, handleMarkDownChange}) {

    return (
        <div>
            <div className="input-row">
                
                <label htmlFor='title'>Problem Name</label>
                <Input id='title' name='title' required='true' onChange={handleTextChange} placeholder="Enter problem name..." />
                <label htmlFor='difficulty'>Difficulty</label>
                <select id='difficulty' name='difficulty' onChange={handleTextChange} placeholder="Enter difficulty...">
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                        
                </select>
                
            </div>

            <div className="input-row">
                <label htmlFor='memoryLimit'>Memory Limit (MB)</label>
                <Input id='memoryLimit' name='memoryLimit' onChange={handleTextChange} type="number" min="256" placeholder="Enter memory limit..."/>
                <label htmlFor='timeLimit'>Time Limit (s)</label>
                <Input id='timeLimit' name='timeLimit' onChange={handleTextChange} type="number" min="0.0" step="0.01" placeholder="Enter time limit..."/>
                
            </div>
            <div className="input-row">
                <label htmlFor='description'>Statement</label>
            </div>
            <br/>
            <Markdown id='description' name='description' callback={handleMarkDownChange} textarea={true} customWidth={[50,50]} style={{paddingLeft: "100px"}}/>
            <div className="input-row">
                <label htmlFor='submissionCount'>Submissions</label>
                <Input id='submissionCount' name='submissionCount' onChange={handleTextChange} type="number" min="0" placeholder="Enter submission count..."/>
                <label htmlFor='solveCount'>Solves</label>
                <Input id='solveCount' name='solveCount' onChange={handleTextChange} type="number" min="0" placeholder="Enter solve count..."/>
        
            </div>
        </div>
    )

}
export default NewStatement;