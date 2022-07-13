

// questions.css import
import { Typography } from 'antd';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Comments from './Comments';
import Navbar from './navbar';
import "./questionIndividual.css";

const { Title, Paragraph, Text, Link } = Typography;

const markdown = `

I did 500+ LeetCode questions, created Blind 75, and interviewed hundreds of FAANG candidates. Frankly speaking, I don't think LeetCode is the best way to interview candidates, but the rules aren't set by us and the best we can do is to be better at this stupid game together.
So here are some tips for you on how to get better at LeetCode:

- Revise your CS fundamentals before your start LeetCoding. You don't have to spend that much time studying, but you need to know the advantages of each data structure and when to use which for the question.
- The average question difficulty you'll get is Medium. Start with Easy questions, do more of them, move on to Medium questions. You probably won't be asked Hard questions in real interviews but you should do some famous Hard questions like Word ladder, serialize/deserialize Binary tree and trapping rain water. You should not be practicing only Easy questions.


A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

Code:
~~~js
function(x) {
  return x;
}
~~~
`

  function QuestionIndividual() {
    return (
            <div className="">
                {/* <h1 id='title'>   Single Question </h1> */}
                  <div id='qih'>
                    <h1>Tips from the author of Blind 75</h1>
                  </div>
                  <br/>
                  <div id='qi'>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} >
                      {markdown}
                    </ReactMarkdown>
                  </div>

                  <div>
                    <Comments />
                  </div>
              
            </div>
          );
  }
  
export default QuestionIndividual;
