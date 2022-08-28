import {
  CodeOutlined,
  GithubOutlined,
  LaptopOutlined,
  NotificationOutlined,
  RocketOutlined,
  UserOutlined
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Card,
  Descriptions,
  Layout,
  Progress,
  Space,
  Tag,
  Tooltip
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ActivityCalendar from "react-activity-calendar";
import {
  BiBriefcase,
  BiBuildings,
  BiCurrentLocation,
  BiLinkAlt
} from "react-icons/bi";
import { useParams } from "react-router-dom";
import discussion from "../images/discussion2.png";
import problem_img from "../images/problem.png";
import Navbar from "../Navbar/Navbar";
import activityData from "./activityData";

const { Header, Content, Sider } = Layout;

const { Meta } = Card;
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);

function ProfileGeneral() {
  const params = useParams();
  const username = params.username;
  const [userInfo, setUserInfo] = useState([]);
  const [passedAssess, setPassedAssess] = useState([]);


  const [counts, setCounts] = useState("");

  const [easyCount, setEasyCount] = useState(0);
  const [mediumCount, setMediumCount] = useState(0);
  const [hardCount, setHardCount] = useState(0);

  const [easySolved, setEasySolved] = useState(0);
  const [mediumSolved, setMediumSolved] = useState(0);
  const [hardSolved, setHardSolved] = useState(0);

  const [easyPercent, setEasyPercent] = useState(0);
  const [mediumPercent, setMediumPercent] = useState(0);
  const [hardPercent, setHardPercent] = useState(0);

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem("authToken"));

    const fetchUserInfo = async () => {
      await axios
        .get("http://localhost:8000/users/user/".concat(username), {
          headers: {
            Authorization: "Token ".concat(authToken.token),
          },
        })
        .then((res) => {
          console.log("User Info FETCHED");
          // console.log(window.$log = res.data.results);
          const data = res.data;
          console.log((window.$log = data));
          setUserInfo(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // Extracting this method made it accessible for context/prop-drilling
    const fetchAssessments = async () => {
      await axios
        .get("http://localhost:8000/assessments/user_taken_assessments/".concat(username).concat("/"), {
          headers: {
            Authorization: "Token ".concat(authToken.token),
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // console.log(window.$log = res.data);
          const ara = res.data;
          console.log((window.$log = ara));
          // console.log(ara.assessment);
          // setAssessments(ara);
          // setAssessmentsTemp(ara);

          let tempPassed = [];

          // for loop to get the user name
          for (let i = 0; i < ara.length; i += 1) {
            // loop through tags if tags not null
            //   console.log(ara[i].assessment.roles);
            console.log(ara[i].passed);
            if (ara[i].passed === true) {
              tempPassed.push(ara[i].assessment);
            }
          }
          setPassedAssess(tempPassed);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const fetchSolveCounts = async () => {
      
      await axios
        .get("http://localhost:8000/problems/problem/".concat(userInfo.id).concat("/get_solve_counts"),  {
          headers: {
            Authorization: "Token ".concat(authToken.token),
          },
        })
        .then((res) => {
          console.log("User Info FETCHED");
          // console.log(window.$log = res.data.results);
          const data = res.data;
          console.log("counts returned", data);
          setCounts(data);

          if(data.all[0] != null){
            setEasyCount(data.all[0][1]);
          }
          if(data.all[1] != null){
            setMediumCount(data.all[1][1]);
          }
          if(data.all[2] != null){
            setHardCount(data.all[2][1]);
          }

          if(data.solved[0] != null){
            setEasySolved(data.solved[0][1]);
          }

          if(data.solved[1] != null){
            setMediumSolved(data.solved[1][1]);
          }

          if(data.solved[2] != null){
            setHardSolved(data.solved[2][1]);
          }

          if(data.all[0] != null && data.solved[0] != null && data.solved[0][1] > 0){
            setEasyPercent(Math.round((1.0 * data.solved[0][1] / data.all[0][1]) * 100));
          }

          if(data.all[1] != null && data.solved[1] != null && data.solved[1][1] > 0){
            setMediumPercent(Math.round((1.0 * data.solved[1][1] / data.all[1][1]) * 100));
          }

          if(data.all[2] != null && data.solved[2] != null && data.solved[2][1] > 0){
            setHardPercent(Math.round((1.0 * data.solved[2][1] / data.all[2][1]) * 100));
          }

        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchUserInfo();
    fetchAssessments();
    fetchSolveCounts();
  }, [username,userInfo]);

  return (
    <Layout style={{ background: "white" }}>
      <Navbar />
      <Layout>
        <Sider
          width={300}
          className="site-layout-background"
          style={{ background: "white" }}
        >
          {/* <p align="center"> */}
          <Card
            style={{ width: 300, background: "white", textAlign: "center" }}
          >
            <Meta
              avatar={
                <Avatar
                  style={{ paddingLeft: "6%" }}
                  src="https://joeschmoe.io/api/v1/random"
                />
              }
              title={`${userInfo.first_name} ${userInfo.last_name}`}
              description={`${userInfo.username}`}
              style={{
                display: "block",
              }}
            />
          </Card>
          {/* </p> */}

          <div>
            {passedAssess.map((item, key) => (
              <p align="center">
                <Badge.Ribbon text={item.skill_name} color="red">
                  <Avatar
                    src={item.image_link}
                    style={{ align: "center", margin: "10px" }}
                  />
                </Badge.Ribbon>
              </p>
            ))}
          </div>

          <Descriptions
            title=""
            bordered
            style={{ width: 300, paddingTop: "5%", textAlign: "right" }}
          >
            <Descriptions.Item
              label=<Tooltip title="Location">
                <BiCurrentLocation
                  style={{ fontSize: "18px", color: "#08c" }}
                />
              </Tooltip>
              span={3}
            >
              <Tooltip title="Location">
                {userInfo.city}, {userInfo.country}
              </Tooltip>
            </Descriptions.Item>

            <Descriptions.Item
              label=<Tooltip title="Occupation">
                <BiBriefcase style={{ fontSize: "18px", color: "#08c" }} />
              </Tooltip>
              span={3}
            >
              <Tooltip title="Occupation">{userInfo.occupation}</Tooltip>
            </Descriptions.Item>

            <Descriptions.Item
              label=<Tooltip title="Workplace/Institution">
                <BiBuildings style={{ fontSize: "18px", color: "#08c" }} />
              </Tooltip>
              span={3}
            >
              <Tooltip title="Workplace/Institution">
                {userInfo.current_workplace}
              </Tooltip>
            </Descriptions.Item>
            <Descriptions.Item
              label=<Tooltip title="Language">
                <BiLinkAlt style={{ fontSize: "18px", color: "#08c" }} />
              </Tooltip>
              span={3}
            >
              <Tooltip title="Website">
              <a href={userInfo.website_link}>{userInfo.website_link}</a>
              </Tooltip>
            </Descriptions.Item>
            <Descriptions.Item
              label=<Tooltip title="Website">
                <GithubOutlined style={{ fontSize: "18px", color: "#08c" }} />
              </Tooltip>
              span={3}
            >
              <Tooltip title="GitHub">
                <a href={`https://github.com/${userInfo.github_link}`}>
                  {userInfo.github_link}
                </a>
              </Tooltip>
            </Descriptions.Item>
            <Descriptions.Item
              label=<Tooltip title="Language">
                <CodeOutlined style={{ fontSize: "18px", color: "#08c" }} />
              </Tooltip>
              span={3}
            >
              <Tooltip title="Language">
                {userInfo.languages?.map((tag) => (
                  <Tag color="geekblue">{tag}</Tag>
                ))}
              </Tooltip>
            </Descriptions.Item>
            <Descriptions.Item
              label=<Tooltip title="Skills">
                <RocketOutlined style={{ fontSize: "18px", color: "#08c" }} />
              </Tooltip>
              span={3}
            >
              <Tooltip title="Skills">
                {userInfo.skills?.map((tag) => (
                  <Tag color="purple">{tag}</Tag>
                ))}
              </Tooltip>
            </Descriptions.Item>
          </Descriptions>
        </Sider>

        <div style={{ margin: "auto" }}>
          <div className="">
            <h1 id="title"> Welcome to {userInfo.username}&apos;s profile </h1>
          </div>
          <div>
            <p align="center">
              <Space
                direction="horizontal"
                align="center"
                style={{ gap: "5%" }}
              >
                <Card
                  style={{ width: 250, border: "groove" }}
                  cover={
                    <a href={`/problems/${username}`}>
                      <img
                        alt="example"
                        src={problem_img}
                        style={{ width: "70%", padding: "12%" }}
                      />
                    </a>
                  }
                >
                  <Meta
                    title="Problems"
                    description={`${userInfo.username}'s solved problems`}
                    style={{ display: "block" }}
                  />
                </Card>

                <Card
                  style={{ width: 250, border: "groove" }}
                  cover={
                    // <a href={"/mydiscussions/"+username}>
                    <a href={`/discussions/${username}`}>
                      <img
                        alt="example"
                        src={discussion}
                        style={{ width: "70%", padding: "12%" }}
                      />
                    </a>
                  }
                >
                  <Meta
                    title="Discussions"
                    description={`${userInfo.username}'s discussions`}
                    style={{ display: "block" }}
                  />
                </Card>
              </Space>
            </p>
          </div>

          <div style={{ paddingTop: "5%", paddingLeft: "3.5%" }}>
            <ActivityCalendar
              data={activityData}
              labels={{
                legend: {
                  less: "Less",
                  more: "More",
                },
                months: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
                tooltip: "<strong>{{count}} contributions</strong> on {{date}}",
                totalCount: "{{count}} contributions in {{year}}",
                weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
              }}
              color="#061e84"
              blockRadius="10"
            />
          </div>

          <div
            style={{
              width: 500,
              margin: "auto",
              paddingTop: "5%",
              paddingBottom: "5%",
            }}
          >
            <Tooltip title={`${easySolved}/${easyCount} Easy Problems Solved`}>
              <Progress
                type="line"
                strokeWidth={12}
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                percent={easyPercent}
                format={(percent) => `Easy Solved : ${percent}%`}
              />
            </Tooltip>

            <Tooltip title={`${mediumSolved}/${mediumCount} Medium Problems Solved`}>
              <Progress
                type="line"
                strokeWidth={12}
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                percent={mediumPercent}
                format={(percent) => `Medium Solved : ${percent}%`}
              />
            </Tooltip>

            <Tooltip title={`${hardSolved}/${hardCount} Hard Problems Solved`}>
              <Progress
                type="line"
                strokeWidth={12}
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                percent={hardPercent}
                format={(percent) => `Hard Solved : ${percent}%`}
              />
            </Tooltip>
          </div>
        </div>
      </Layout>
    </Layout>
  );
}

export default ProfileGeneral;
