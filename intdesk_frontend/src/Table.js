import { Component } from 'react';
import "./table.css";

class Table extends Component {
   constructor(props) {
      super(props) // since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { // state is by default an object
         students: [
            { title: "How to reverse a Linked List ?", name: 'Wasif', upvotes: 21, views: 21 },
            { title: "Tips from the author of Blind 75", name: 'Ali', upvotes: 19, views: 21 },
            { title: "Does Data Structures matter ?", name: 'Saad', upvotes: 16, views: 21 },
            { title: "What is Agile software development ?", name: 'Asad', upvotes: 25, views: 21 }
         ]
      }
   }

    renderTableData() {
        return this.state.students.map((student, index) => {
            const { title, name, upvotes, views } = student // destructuring
            return (
                <tr key={title}>
                    <td>{title}</td>
                    <td>{name}</td>
                    <td>{upvotes}</td>
                    <td>{views}</td>
                </tr>
            )
        })
    }

    renderTableHeader() {
        let header = Object.keys(this.state.students[0])
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
     }
  
     render() {
        return (
           <div>
              <h1 id='title'>All Questions</h1>
              <table id='students'>
                 <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                 </tbody>
              </table>
           </div>
        )
     }
}

export default Table // exporting a component make it reusable and this is the beauty of react