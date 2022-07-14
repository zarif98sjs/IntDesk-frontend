import { Button, Input } from 'antd';
import axios from "axios";
import { useState } from "react";
import Markdown from "react-textarea-markdown";
import Navbar from './navbar';
import "./questionNew.css";

const { TextArea } = Input;

function QuestionNew() {

  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [text, setText] = useState('');

  const handleTitleChange = event => {
    setTitle(event.target.value);
    // console.log(event.target.value);
  };

  const handleTagsChange = event => {
    let tagsAra = event.target.value.split(',');
    setTags(tagsAra); 
    // console.log(tagsAra);
  };

  const handleTextChange = event => {
    setText(event);
    // console.log(event);
  };

  const submit = event => {
    setText(event);
    // console.log(event);
  };

  // arrow function to prevent the page from refreshing
  const submitFunc = () => {
    console.log(title);
    console.log(tags);
    console.log(text);

    // POST
    let postData = {
      'title': title,
      'tags': tags,
      'description': text,
    };
    
    axios.post('http://localhost:8000/discussion/', postData ,{headers: {
        'Authorization': 'Token ab77e5955ff7b7ef59a5ad0620fa9ff76f7aa846',
        'Content-Type' : 'application/json'
      }})
      .then(res => {
        console.log(window.$log = res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

    
    return (
            <div className="">
                <Navbar />
                <h1 id='title'>New Discussion</h1>
           
                  <Input id='title' onChange={handleTitleChange} placeholder="Enter topic title..."/>
                  <Input id='tag_ara' onChange={handleTagsChange} placeholder="Tags (use comma separated values)" />
    
                  <Markdown id='text_area' callback={handleTextChange} textarea={true} customWidth={[50,50]}/>

                  <Button type="primary" id='button_submit' onClick={submitFunc} >Create Discussion</Button>
            </div>
          );
  }
  
export default QuestionNew;
