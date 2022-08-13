import Markdown from "react-textarea-markdown";

function NewEditorial({handleMarkDownChange}) {
    return (
        <div>
            <div className="input-row">
                <label htmlFor='editorial'><h2>Add An Editorial</h2></label>
            </div>
            <br/>
            <Markdown id='editorial' name='editorial' callback={handleMarkDownChange} textarea={true} customWidth={[50,50]} style={{paddingLeft: "100px", maxHeight: "100vh"}}/>
            
        </div>
    )

    

}
export default NewEditorial;