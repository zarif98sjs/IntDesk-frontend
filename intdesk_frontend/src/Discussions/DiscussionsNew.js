import { Button, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Markdown from "react-textarea-markdown";
import Navbar from "../Navbar/Navbar";

import "./discussionsNew.css";

const { TextArea } = Input;

function DiscussionsNew() {
  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn"))
  );

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("inside use effect : ");
    setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    // console.log(event.target.value);
  };

  const handleTagsChange = (event) => {
    let tagsAra = event.target.value.replace(/ /g, "");
    tagsAra = tagsAra.split(",");
    console.log(tagsAra);
    setTags(tagsAra);
    // console.log(tagsAra);
  };

  const handleTextChange = (event) => {
    console.log(event);
    setText(event);
  };

  const submit = (event) => {
    setText(event);
    // console.log(event);
  };

  // arrow function to prevent the page from refreshing
  const submitFunc = async () => {
    console.log(title);
    console.log(tags);
    console.log(text);

    // POST
    let postData = {
      title: title,
      tags: tags,
      description: text,
    };

    await axios
      .post("https://intdesk.herokuapp.com/discussion/", postData, {
        headers: {
          Authorization: "Token ".concat(authToken.token),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log((window.$log = res.data));
      })
      .catch((err) => {
        console.log(err);
      });

    // navigate to the discussion page
    window.location.href = "/discussions";
  };

  return (
    <div className="">
      {isLoggedIn ? (
        <div>
          <Navbar />
          <h1 id="title">New Discussion</h1>

          <Input
            id="title"
            onChange={handleTitleChange}
            placeholder="Enter topic title..."
          />
          <Input
            id="tag_ara"
            onChange={handleTagsChange}
            placeholder="Tags (use comma separated values)"
          />

          <Markdown
            style={{ height: "400px" }}
            callback={handleTextChange}
            textarea={true}
            customWidth={[50, 50]}
          />

          <Button type="primary" id="button_submit" onClick={submitFunc}>
            Create Discussion
          </Button>
        </div>
      ) : (
        <div>
          <Navigate to="/login" />
        </div>
      )}
    </div>
  );
}

export default DiscussionsNew;
