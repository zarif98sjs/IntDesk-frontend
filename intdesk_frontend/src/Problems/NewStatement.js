import MDEditor from '@uiw/react-md-editor';
import { Input } from 'antd';



function NewStatement({problem, setProblem, handleTextChange, handleMarkDownChange}) {

    return (
        <div >
            <h2 style={{paddingTop: "20px", paddingLeft: "20px"}}>Add problem details...</h2>
            <div className="input-row">
                
                <label htmlFor='title'>Problem Name</label>
                <Input id='title' name='title' value={problem.title} required onChange={handleTextChange} placeholder="Enter problem name..." />
                <label htmlFor='difficulty'>Difficulty</label>
                <select id='difficulty' name='difficulty' value={problem.difficulty} onChange={handleTextChange} placeholder="Enter difficulty...">
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                        
                </select>
                
            </div>

            <div className="input-row">
                <label htmlFor='memoryLimit'>Memory Limit (MB)</label>
                <Input id='memoryLimit' name='memoryLimit' value={problem.memoryLimit} onChange={handleTextChange} type="number" min="256" placeholder="Enter memory limit..."/>
                <label htmlFor='timeLimit'>Time Limit (s)</label>
                <Input id='timeLimit' name='timeLimit' value={problem.timeLimit} onChange={handleTextChange} type="number" min="0.0" step="0.01" placeholder="Enter time limit..."/>
                
            </div>
            <div className="input-row">
                <label htmlFor='description'>Statement</label>
            </div>
            <br/>
            {/* <Markdown id='description' name='description'  defaultValue={problem.description} value={problem.description} callback={handleMarkDownChange} textarea={true} customWidth={[50,50]} style={{paddingLeft: "100px"}}>
            {problem.description}
            </Markdown> */}
            <div className="input-row" >
            <MDEditor
                value={problem.description}
                onChange={handleMarkDownChange}
                style={{width: "100%", height: "500px", maxHeight: "1000px", marginLeft: "20px", marginRight: "40px", marginBottom: "40px", paddingLeft: "20px", paddingRight: "20px"}}
            />
            
            {/* <MDEditor.Markdown source={problem.description} style={{ whiteSpace: 'pre-wrap' }} /> */}
            </div>
            <div className="input-row">
                <label htmlFor='submissionCount'>Submissions</label>
                <Input id='submissionCount' name='submissionCount' value={problem.submissionCount} onChange={handleTextChange} type="number" min="0" placeholder="Enter submission count..."/>
                <label htmlFor='solveCount'>Solves</label>
                <Input id='solveCount' name='solveCount' value={problem.solveCount} onChange={handleTextChange} type="number" min="0" placeholder="Enter solve count..."/>
        
            </div>
        </div>
    )

}
export default NewStatement;