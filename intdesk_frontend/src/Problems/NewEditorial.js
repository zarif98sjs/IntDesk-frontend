import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function NewEditorial({ handleMarkDownChange }) {
  const [editorState, setEditorState] = useState("");

  const onEditorStateChange = (event) => {
    console.log("state changed");
  };

  return (
    <div>
      <div className="input-row">
        <label htmlFor="editorial">
          <h2>Add An Editorial</h2>
        </label>
      </div>
      <br />
      {/* <Markdown id='editorial' name='editorial' callback={handleMarkDownChange} textarea={true} customWidth={[50,50]} style={{paddingLeft: "100px", maxHeight: "100vh"}}/> */}
      <Editor
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onChange={onEditorStateChange}
      />
      ;
    </div>
  );
}
export default NewEditorial;
