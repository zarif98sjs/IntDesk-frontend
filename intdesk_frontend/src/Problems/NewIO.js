import { Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

function NewIO({problem, setProblem}) {

    
    const handleInputChange = (event, index) => {
        const {name, value} = event.target;
        const newInputOutputs = problem.inputOutputs;
        newInputOutputs[index][name] = value;
        setProblem(oldProblem => (
            {
                ...oldProblem,
                inputOutputs: newInputOutputs
            }
        ))

    }

    const handleRemoveClick = index => {
        const newInputOutputs = problem.inputOutputs;
        newInputOutputs.splice(index, 1);
        setProblem(oldProblem => (
            {
                ...oldProblem,
                inputOutputs: newInputOutputs
            }
        ))
    }

    const handleAddClick = () => {
        
        const newInputOutputs = [...problem.inputOutputs, {"input": "", "output": "", "points": 1}]
        setProblem(oldProblem => (
            {
                ...oldProblem,
                inputOutputs: newInputOutputs
            }
        ))
    }

    

    return (
        <div >
            <h2 style={{paddingTop: "20px", paddingLeft: "20px"}}>Add input outputs for test cases...</h2>
            {problem.inputOutputs.map((x, i) => {
                return (
                    <div>
                        <div className="input-row--left">
                            <label htmlFor='points'>Points</label>
                            <Input id='points' name='points' value={problem.inputOutputs[i].points} onChange={event => handleInputChange(event, i)} type="number" min="1" placeholder="Enter points..."/>
                        </div>
                        
                        <div className="input-row--left">
                            <label htmlFor='input'>Input</label>
                            <TextArea id='input' name='input' value={problem.inputOutputs[i].input} onChange={event => handleInputChange(event, i)} required placeholder="Enter input..."/>
                            <label htmlFor='output'>Output</label>
                            <TextArea id='output' name='output' value={problem.inputOutputs[i].output}  onChange={event => handleInputChange(event, i)} required placeholder="Enter output..."/>
                            
                        </div>
                        <div className="button-row">
                            {problem.inputOutputs.length !==1 && <button className="submit-btn" type="button" onClick={() => handleRemoveClick(i)}>Remove</button>}
                            {problem.inputOutputs.length-1 === i && <button className="submit-btn" type="button" onClick={handleAddClick}>Add More</button>}
                        
                        </div>
                    </div>
                    
                )
            })}
            
        </div>
    )

}
export default NewIO;