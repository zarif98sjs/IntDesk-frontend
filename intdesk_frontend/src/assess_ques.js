import { Typography , Label} from 'antd';
import ReactMarkdown from 'react-markdown';
import React, { useState } from "react";
import remarkGfm from 'remark-gfm';
import "./questionIndividual.css";

const { Title, Paragraph, Text, Link } = Typography;

const markdown = `

What is the output of the following?
~~~js
try:
    if '1' != 1:
        raise "someError"
    else:
        print("someError has not occured")
except "someError":
    print ("someError has occured")
~~~
`




function AssessQues() {

    const data = [
        {
          id: 1,
          question_title: {markdown},
          Question_answer: [
            {
              answer_option: "option1",
              is_correct: false,
            },
            {
              answer_option: "option2",
              is_correct: false,
            },
            {
              answer_option: "option3",
              is_correct: false,
            },
            {
              answer_option: "option4",
              is_correct: true,
            },
          ],
        }
    ];

    const [value, setValue] = useState(1);

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };


    return (
        
        <div className="">
                {/* <h1 id='title'>   Single Question </h1> */}
                  <div id='qih'>
                    <h1 style={{textAlign: "center"}}>Python Assessment Test</h1> 
                  </div>
                  <br/>
                  <div id='qih'>
                    <h3 style={{textAlign: "center"}}>Question 1</h3>
                  </div>
                  
                  <br/>
                  <div id='qi'>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} >
                      {markdown}
                    </ReactMarkdown>
                  </div>
                  <br/>
                  <div id='qi'>
                  {data[0].Question_answer.map((answer, key) => (

                        <h5>
                            <input type="radio"
                                value = { answer.answer_option }
                                name = { answer.answer_option }
                                onClick = {() => onChange(answer)}
                            />
                            {answer.answer_option}
                        </h5>
                        
                    ))}
                  </div>
              
            </div>
    )
  }



export default AssessQues;

