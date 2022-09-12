import { Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./AssessNew.css";

const { Option } = Select;

function Populate() {
  // const authToken = JSON.parse(localStorage.getItem("authToken"));
  // const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedIn")));

  const [assessmentID, setAsssessmentID] = useState(5);
   

  useEffect(() => {
    let load = false;

    if (load === false) {
      return;
    }
    const easy_data = [
      {
        question: `What is the maximum length of a Python identifier?`,
        option1: "32",
        option2: "16",
        option3: "128",
        option4: "No fixed length is specified",
        rightOption: 4,
      },
      {
        question: ` What will be the output of the following code snippet?\n
            print(2**3 + (5 + 6)**(1 + 1)) \n
            `,
        option1: "129",
        option2: "8",
        option3: "121",
        option4: "None of the above",
        rightOption: 1,
      },
      {
        question: `What will be the datatype of the var in the below code snippet?\n
            var = 10
            print(type(var))
            var = "Hello"
            print(type(var))
            `,
        option1: "str and int",
        option2: "int and str",
        option3: "str and str",
        option4: "int and int",
        rightOption: 2,
      },
      {
        question: ` How is a code block indicated in Python?`,
        option1: "Brackets",
        option2: "Indentation",
        option3: "Key",
        option4: "None of the above",
        rightOption: 2,
      },
      {
        question: `What will be the output of the following code snippet?\n
          a = [1, 2, 3]
          a = tuple(a)
          a[0] = 2
          print(a)
          `,
        option1: "[2,2,3]",
        option2: "(2,2,3)",
        option3: "(1,2,3)",
        option4: "Error",
        rightOption: 4,
      },
      {
        question: ` What will be the output of the following code snippet?\n
            print(type(5 / 2))
            print(type(5 // 2))
            `,
        option1: "float and int",
        option2: "int and float",
        option3: "float and float",
        option4: "int and int",
        rightOption: 1,
      },
      {
        question: `What will be the output of the following code snippet?\n
          a = [1, 2, 3, 4, 5]
          sum = 0
          for ele in a:
             sum += ele 
          print(sum)`,
        option1: "0 1 2 ..... 15",
        option2: "Infinite loop",
        option3: "0 3 6 9 12 15",
        option4: "0 3 6 9 12",
        rightOption: 3,
      },
      {
        question: ` Which of the following concepts is not a part of Python?`,
        option1: "Pointers",
        option2: "Loops",
        option3: "Dynamic Typing",
        option4: "All of the above",
        rightOption: 1,
      },
      {
        question: `What will be the output of the following code snippet?
          def solve(a, b):
             return b if a == 0 else solve(b % a, a)
          print(solve(20, 50))`,
        option1: "10",
        option2: "20",
        option3: "50",
        option4: "1",
        rightOption: 1,
      },
      {
        question: ` What will be the output of the following code snippet?\n
            print(2**3 + (5 + 6)**(1 + 1)) \n
            `,
        option1: "129",
        option2: "8",
        option3: "121",
        option4: "None of the above",
        rightOption: 1,
      },
    ];

    const med_data = [
      {
        question: `What will be the output of the following code snippet?\n
          def solve(a):
             a = [1, 3, 5]
          a = [2, 4, 6]
          print(a)
          solve(a)
          print(a)`,
        option1: "[2, 4, 6], [2, 4, 6]",
        option2: "[2, 4, 6], [1, 3, 5]",
        option3: "[1, 3, 5], [1, 3, 5]",
        option4: "None of these",
        rightOption: 1,
      },
      {
        question: `What will be the output of the following code snippet?\n   
            def func():
               global value
               value = "Local"
               
            value = "Global"
            func()
            print(value)`,
        option1: "Local",
        option2: "Global",
        option3: "None",
        option4: "Cannot be predicted",
        rightOption: 1,
      },
      {
        question: `Which of the following statements are used in Exception Handling in Python?`,
        option1: "try",
        option2: "except",
        option3: "finally",
        option4: "All of the above",
        rightOption: 4,
      },
      {
        question: `What will be the output of the following code snippet?\n
            a = 3
            b = 1 
            print(a, b)
            a, b = b, a 
            print(a, b)`,
        option1: "31 13",
        option2: "31 31",
        option3: "13 13",
        option4: "13 31",
        rightOption: 1,
      },
      {
        question: `Which of the following types of loops are not supported in Python?`,
        option1: "for",
        option2: "while",
        option3: "do-while",
        option4: "None of the above",
        rightOption: 3,
      },
      {
        question: ` Which of the following is the proper syntax to check if a particular element is present in a list?`,
        option1: "if ele in list",
        option2: "if not ele not in list",
        option3: "Both A and B",
        option4: "None of the above",
        rightOption: 3,
      },
      {
        question: `What will be the output of the following code snippet?\n
          def thrive(n):
           if n % 15 == 0:
             print("thrive", end = “ ”)
           elif n % 3 != 0 and n % 5 != 0:
             print("neither", end = “ ”)
           elif n % 3 == 0:
             print("three", end = “ ”)
           elif n % 5 == 0:
             print("five", end = “ ”)
          thrive(35)
          thrive(56)
          thrive(15)
          thrive(39)  `,
        option1: "five neither thrive three",
        option2: "five neither three thrive",
        option3: "three three three three",
        option4: "five neither five neither",
        rightOption: 1,
      },
      {
        question: ` What will be the output of the following code snippet?\n
            def check(a):
               print("Even" if a % 2 == 0 else "Odd")
               
            check(12)`,
        option1: "Even",
        option2: "Odd",
        option3: "Error",
        option4: "None",
        rightOption: 1,
      },
      {
        question: `What will be the output of the following code snippet?\n
          example = ["Sunday", "Monday", "Tuesday", "Wednesday"];
          print(example[-3:-1])`,
        option1: "['Monday', 'Tuesday']",
        option2: "['Sunday', 'Monday']",
        option3: "['Tuesday', 'Wednesday']",
        option4: "['Wednesday', 'Monday']",
        rightOption: 1,
      },
      {
        question: ` What will be the output of the following code snippet?\n
            a = [1, 2]
            print(a * 3)
            `,
        option1: "Error",
        option2: "[1, 2]",
        option3: "[1, 2, 1, 2]",
        option4: "[1, 2, 1, 2, 1, 2]",
        rightOption: 4,
      },
    ];

    const hard_data = [
      {
        question: `What will be the type of the variable sorted_numbers in the below code snippet?\n
          numbers = (4, 7, 19, 2, 89, 45, 72, 22)
          sorted_numbers = sorted(numbers)
          print(sorted_numbers)`,
        option1: "List",
        option2: "Tuple",
        option3: "String",
        option4: "Int",
        rightOption: 1,
      },
      {
        question: ` What will be the output of the following code snippet?\n
            numbers = (4, 7, 19, 2, 89, 45, 72, 22)
            sorted_numbers = sorted(numbers)
            even = lambda a: a % 2 == 0
            even_numbers = filter(even, sorted_numbers)
            print(type(even_numbers))`,
        option1: "filter",
        option2: "int",
        option3: "list",
        option4: "tuple",
        rightOption: 1,
      },
      {
        question: `What will be the output of the following code snippet?\n
            numbers = (4, 7, 19, 2, 89, 45, 72, 22)
            sorted_numbers = sorted(numbers)
            odd_numbers = [x for x in sorted_numbers if x % 2 != 0]
            print(odd_numbers)`,
        option1: "[7, 19, 45, 89]",
        option2: "[2, 4, 22, 72]",
        option3: "[4, 7, 19, 2, 89, 45, 72, 22]",
        option4: "[2, 4, 7, 19, 22, 45, 72, 89]",
        rightOption: 1,
      },
      {
        question: ` What will be the output of the following code snippet?\n
            def is_even(number):
              message =  f"{number} is an even number" if number % 2 == 0 else  f"{number} is an odd number"
             return message
            print(is_even(54))`,
        option1: "54 is an even number",
        option2: "54 is an odd number",
        option3: "number is an even number",
        option4: "number is an odd number",
        rightOption: 1,
      },
      {
        question: ` What will be the output of the following code snippet?
          dict1 = {'first' : 'sunday', 'second' : 'monday'}
          dict2 = {1: 3, 2: 4}
          dict1.update(dict2)
          print(dict1)`,
        option1: "{'first' : 'sunday', 'second' : 'monday', 1:3, 2:4}",
        option2: "{'first' : 'sunday', 'second' : 'monday'}",
        option3: "{ 1:3, 2:4}",
        option4: "None of the above",
        rightOption: 1,
      },
      {
        question: ` What will be the output of the following code snippet?\n
            print(type(5 / 2))
            print(type(5 // 2))
            `,
        option1: "float and int",
        option2: "int and float",
        option3: "float and float",
        option4: "int and int",
        rightOption: 1,
      },
      {
        question: `What will be the output of the following code snippet?\n
          s = {1, 2, 3, 3, 2, 4, 5, 5}
          print(s)`,
        option1: "{1, 2, 3, 3, 2, 4, 5, 5}",
        option2: "{1, 2, 3, 4, 5}",
        option3: "None",
        option4: "{1, 5}",
        rightOption: 2,
      },
      {
        question: ` 
            What will be the output of the following code snippet?\n
            a = {'Hello':'World', 'First': 1}
            b = {val: k for k , val in a.items()}
            print(b)`,
        option1: "{'Hello' : 'World', 'First' : 1}",
        option2: "{'World' : 'Hello', 1 : 'First'}",
        option3: "Can be both A or B",
        option4: "Nonel of the above",
        rightOption: 2,
      },
      {
        question: `Which of the following functions converts date to corresponding time in Python?`,
        option1: "strptime()",
        option2: "strftime()",
        option3: "Both A and B",
        option4: "None of the above",
        rightOption: 1,
      },
      {
        question: ` What will be the output of the following code snippet?\n

            word = "Python Programming"
            n = len(word)
            word1 = word.upper()
            word2 = word.lower()
            converted_word = ""
            for i in range(n):
             if i % 2 == 0:
               converted_word += word2[i]
             else:
               converted_word += word1[i]
            print(converted_word)
            `,
        option1: "pYtHoN PrOgRaMmInG",
        option2: "Python Programming",
        option3: "python programming",
        option4: "PYTHON PROGRAMMING",
        rightOption: 1,
      },
    ];

    // arrow function to prevent the page from refreshing
    const submitFunc = async () => {
      let diff_level = ["E", "M", "H"];
      let time_level = [10, 20, 30];

      for (let k = 0; k < 3; k += 1) {
        let data = easy_data;
        if (k === 1) {
          data = med_data;
        }
        if (k === 2) {
          data = hard_data;
        }
        let difficulty_level = diff_level[k];
        let time_dur = time_level[k];

        for (let i = 0; i < 10; i += 1) {
          // POST
          let postData = {
            assessment: assessmentID,
            time: time_dur,
            description: data[i].question,
            difficulty: difficulty_level,
            // 'points' : Points,
          };

          console.log(postData);

          // navigate to create questions page
          // window.location.href = "/assessments/".concat(assessmentID).concat("/assess_newques");

          axios
            .post(
              "https://intdesk.herokuapp.com/assessments/assessment/"
                .concat(assessmentID)
                .concat("/question/"),
              postData,
              {
                headers: {
                  // 'Authorization': 'Token '.concat(authToken.token),
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => {
              console.log((window.$log = res.data));

              const quesID = res.data.id;

              console.log(quesID);

              let Options = [
                data[i].option1,
                data[i].option2,
                data[i].option3,
                data[i].option4,
              ];
              for (let j = 1; j <= 4; j += 1) {
                // console.log(Options[i-1]);
                // console.log(RightOption);
                let correct = false;
                // print(data[i].rightOption)
                if (j === data[i].rightOption) {
                  // console.log(i);
                  correct = true;
                }
                // if( i === int( RightOption ) ){
                //   console.log("yes");
                // }
                // console.log(type(RightOption));
                let postOptionData = {
                  ques: quesID,
                  option_description: Options[j - 1],
                  correct: correct,
                };

                axios
                  .post(
                    "https://intdesk.herokuapp.com/assessments/assessment/"
                      .concat(assessmentID)
                      .concat("/options/"),
                    postOptionData,
                    {
                      headers: {
                        // 'Authorization': 'Token '.concat(authToken.token),
                        "Content-Type": "application/json",
                      },
                    }
                  )
                  .then((res) => {
                    console.log((window.$log = res.data));
                  });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    };

    submitFunc();
    // setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
  }, [assessmentID]);

  return (
    <div className="">
      <div>
        <Navbar />
      </div>
    </div>
  );
}

export default Populate;
