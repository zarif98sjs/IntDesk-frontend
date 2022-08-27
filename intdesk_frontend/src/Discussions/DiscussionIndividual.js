import { Button, Space, Tag, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import Navbar from "../Navbar/Navbar";
import Comments from "./Comments";
import "./discussionIndividual.css";
import "./discussions.css";

const { Title, Paragraph, Text, Link } = Typography;

function DiscussionIndividual() {
  const authToken = JSON.parse(localStorage.getItem("authToken"));

  const params = useParams();
  const id = params.id;

  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn"))
  );

  const [discussion, setDiscussion] = useState([]);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState([]);

  const [count, setCount] = useState(0);

  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);

  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);

  const [buttonTypeUp, setButtonTypeUp] = useState("default");
  const [buttonTypeDown, setButtonTypeDown] = useState("default");

  const increment = async () => {
    // PUT request to update upvotes
    let putData = {
      upvotes: discussion.upvotes,
    };

    // if not upvoted, clicking will increase the value of upvotes
    if (!isUpvoted) {
      console.log("not upvoted before, now increase");
      putData.upvotes = discussion.upvotes + 1;
      discussion.upvotes += 1;

      setIsUpvoted(true);
      setButtonTypeUp("primary");

      // create a POST request to mark this discussion as upvoted by this user
      await axios
        .post(
          "http://localhost:8000/discussion/"
            .concat(discussion.id)
            .concat("/upvoted/"),
          {},
          {
            headers: {
              Authorization: "Token ".concat(authToken.token),
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log((window.$log = res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // toggle now, so upvotes will decrease
      console.log("upvoted before, now decrease");
      putData.upvotes = discussion.upvotes - 1;
      discussion.upvotes -= 1;
      setIsUpvoted(false);
      setButtonTypeUp("default");

      // create a DELETE request to mark this discussion as not upvoted by this user
      await axios
        .delete(
          "http://localhost:8000/discussion/"
            .concat(discussion.id)
            .concat("/delete_upvoted/"),
          {
            headers: {
              Authorization: "Token ".concat(authToken.token),
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log((window.$log = res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setDiscussion(discussion);
    setUpvotes(discussion.upvotes);

    console.log("putData here", putData);
    await axios
      .put(
        "http://localhost:8000/discussion/".concat(discussion.id).concat("/"),
        putData,
        {
          headers: {
            Authorization: "Token ".concat(authToken.token),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log((window.$log = res.data));
      })
      .catch((err) => {
        console.log(err);
      });

    setCount(discussion.upvotes - discussion.downvotes);
  };

  const decrement = async () => {
    setCount(count - 1);

    // PUT request to update downvotes
    let putData = {
      downvotes: discussion.downvotes,
    };

    // if not upvoted, clicking will increase the value of upvotes
    if (!isDownvoted) {
      console.log("not downvoted before, now increase downvote");
      putData.downvotes = discussion.downvotes + 1;
      discussion.downvotes += 1;

      setIsDownvoted(true);
      setButtonTypeDown("primary");

      // create a POST request to mark this discussion as upvoted by this user
      await axios
        .post(
          "http://localhost:8000/discussion/"
            .concat(discussion.id)
            .concat("/downvoted/"),
          {},
          {
            headers: {
              Authorization: "Token ".concat(authToken.token),
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log((window.$log = res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // toggle now, so upvotes will decrease
      console.log("downvoted before, now decrease downvote");
      putData.downvotes = discussion.downvotes - 1;
      discussion.downvotes -= 1;
      setIsDownvoted(false);
      setButtonTypeDown("default");

      // create a DELETE request to mark this discussion as not upvoted by this user
      await axios
        .delete(
          "http://localhost:8000/discussion/"
            .concat(discussion.id)
            .concat("/delete_downvoted/"),
          {
            headers: {
              Authorization: "Token ".concat(authToken.token),
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log((window.$log = res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setDiscussion(discussion);
    setDownvotes(discussion.downvotes);

    console.log("putData here", putData);
    await axios
      .put(
        "http://localhost:8000/discussion/".concat(discussion.id).concat("/"),
        putData,
        {
          headers: {
            Authorization: "Token ".concat(authToken.token),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log((window.$log = res.data));
      })
      .catch((err) => {
        console.log(err);
      });

    setCount(discussion.upvotes - discussion.downvotes);
  };

  useEffect(() => {
    const fetchDiscussion = async () => {
      await axios
        .get("http://localhost:8000/discussion/".concat(id))
        .then((res) => {
          console.log("DISCUSSIONS FETCHED");
          // console.log(window.$log = res.data.results);
          const data = res.data;
          // console.log(window.$log = data);
          setDiscussion(data);
          setUpvotes(data.upvotes);
          setDownvotes(data.downvotes);
          setCount(data.upvotes - data.downvotes);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const fetchComments = async () => {
      await axios
        .get(
          "http://localhost:8000/discussion/".concat(id).concat("/comments/")
        )
        .then((res) => {
          const ara = res.data;
          // console.log(window.$log = ara);

          const hashmap = new Map();

          for (let i = 0; i < ara.length; i += 1) {
            if (
              ara[i].hash != null &&
              ara[i].user !== null &&
              ara[i].parent == null
            ) {
              const obj = {
                id: ara[i].id,
                userId: ara[i].user.id,
                comId: ara[i].hash,
                fullName: ara[i].user.username,
                text: ara[i].comment,
                userProfile: "https://www.linkedin.com/in/",
                avatarUrl:
                  "https://ui-avatars.com/api/name=Lily&background=random",
                replies: [],
              };

              hashmap.set(obj.comId, obj);
            }
          }

          for (let i = 0; i < ara.length; i += 1) {
            if (
              ara[i].hash != null &&
              ara[i].user != null &&
              ara[i].parent != null
            ) {
              // push into replies of hashmap
              const obj = {
                id: ara[i].id,
                userId: ara[i].user.id,
                comId: ara[i].hash,
                fullName: ara[i].user.username,
                text: ara[i].comment,
                userProfile: "https://www.linkedin.com/in/",
                avatarUrl:
                  "https://ui-avatars.com/api/name=Lily&background=random",
                replies: [],
              };

              hashmap.get(ara[i].parent).replies.push(obj);
            }
          }

          let values = [...hashmap.values()];
          setComments(values);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const check_vote_status = async () => {
      await axios
        .get(
          "http://localhost:8000/discussion/"
            .concat(id)
            .concat("/check_vote_status/"),
          {
            headers: {
              Authorization: "Token ".concat(authToken.token),
            },
          }
        )
        .then((res) => {
          console.log("isupvoted", res.data);
          console.log("isupvoted", res.data.isupvoted);
          if (res.data.isupvoted) {
            setButtonTypeUp("primary");
            setIsUpvoted(true);
          } else if (res.data.isdownvoted) {
            setButtonTypeDown("primary");
            setIsDownvoted(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // set logged in
    setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));

    fetchDiscussion();
    check_vote_status();
    fetchComments();
    // fetchUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="">
      <Navbar />
      <div
        id="elements"
        style={{
          marginTop: "40px",
        }}
      >
        <div id="element1">
          <Button type={buttonTypeUp} size="medium" onClick={increment}>
            ↑
          </Button>
          <pre id="code1">{count}</pre>
          <Button type={buttonTypeDown} size="medium" onClick={decrement}>
            ↓
          </Button>
        </div>
        <div id="element2">
          {/* <h1 id='qih'>{discussion.title}</h1> */}

          <h1>{discussion.title}</h1>
        </div>
      </div>

      <div id="element_tag">
        {/* if tags not null */}

        <Space size="middle">
          <i>Tags</i>
          {/* if tags not null */}
          {discussion.tags !== null
            ? discussion.tags?.map((tag) => (
                // <pre>{tag}</pre>
                <Tag color="geekblue">{tag}</Tag>
              ))
            : "N/A"}
        </Space>
      </div>

      <br />
      <div id="qi">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {discussion.description}
        </ReactMarkdown>
      </div>

      {isLoggedIn ? (
        <div>
          <Comments comments={comments} discussionId={id} />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default DiscussionIndividual;
