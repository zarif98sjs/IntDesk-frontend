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
  Button,
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
import assesment from "../images/assesment.png";
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
function Profile() {
  const [userInfo, setUserInfo] = useState([]);
  const [passedAssess, setPassedAssess] = useState([]);

  const [counts, setCounts] = useState("");
  
  
  
  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const userId = JSON.parse(localStorage.getItem("user")).id;
    console.log('userId', userId);
    
    const fetchUserInfo = async () => {
      console.log("AUTH TOKEN in local storage: ", authToken);

      await axios
        .get("http://localhost:8000/users/details/", {
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

    
    const fetchSolveCounts = async () => {

      console.log("sending user id", userId);
      
      await axios
        .get("http://localhost:8000/problems/problem/".concat(userId).concat("/get_solve_counts"),  {
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
        })
        .catch((err) => {
          console.log(err);
        });
    };

    



    // Extracting this method made it accessible for context/prop-drilling
    const fetchAssessments = async () => {
      await axios
        .get("http://localhost:8000/assessments/user_taken_assessments/", {
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

    fetchUserInfo();
    fetchAssessments();
    fetchSolveCounts();
  }, []);

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

          <p align="center">
            <Button
              type="primary"
              shape="round"
              icon={<UserOutlined />}
              size="large"
              style={{ margin: "10px 10px 10px 10px" }}
              href="http://localhost:3000/profile_edit/"
            >
              Edit Profile
            </Button>
          </p>
        </Sider>

        <div style={{ margin: "auto" }}>
          <div className="">
            <h1 id="title"> Welcome to your profile </h1>
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
                    <a href="/myproblems">
                      <img
                        alt="example"
                        src={problem_img}
                        style={{ width: "70%", padding: "12%" }}
                      />
                    </a>
                  }
                  actions={
                    [
                      // <SettingOutlined key="setting" />,
                      // <EditOutlined key="edit" />,
                      // <EllipsisOutlined key="ellipsis" />,
                    ]
                  }
                >
                  <Meta
                    title="Problems"
                    description="Find your problems here"
                    style={{ display: "block" }}
                  />
                </Card>

                <Card
                  style={{ width: 250, border: "groove" }}
                  cover={
                    <a href="/mydiscussions">
                      <img
                        alt="example"
                        src={discussion}
                        style={{ width: "70%", padding: "12%" }}
                      />
                    </a>
                  }
                  actions={
                    [
                      // <SettingOutlined key="setting" />,
                      // <EditOutlined key="edit" />,
                      // <EllipsisOutlined key="ellipsis" />,
                    ]
                  }
                >
                  <Meta
                    title="Discussions"
                    description="Find your discussions here"
                    style={{ display: "block" }}
                  />
                </Card>

                <Card
                  style={{ width: 250, border: "groove" }}
                  cover={
                    <a href="/myassessments">
                      <img
                        alt="example"
                        src={assesment}
                        style={{
                          width: "70%",
                          padding: "12%",
                        }}
                      />
                    </a>
                  }
                  actions={
                    [
                      // <SettingOutlined key="setting" />,
                      // <EditOutlined key="edit" />,
                      // <EllipsisOutlined key="ellipsis" />,
                    ]
                  }
                >
                  <Meta
                    title="Assesments"
                    description="Find your assesments here"
                    style={{
                      display: "block",
                    }}
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
            <Tooltip title="240/340 Easy Problems Solved">
              <Progress
                type="line"
                strokeWidth={12}
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                percent={90}
                format={(percent) => `Easy Solved : ${percent}%`}
              />
            </Tooltip>

            <Tooltip title="120/540 Medium Problems Solved">
              <Progress
                type="line"
                strokeWidth={12}
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                percent={30}
                format={(percent) => `Medium Solved : ${percent}%`}
              />
            </Tooltip>

            <Tooltip title="30/180 Hard Problems Solved">
              <Progress
                type="line"
                strokeWidth={12}
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                percent={9.8}
                format={(percent) => `Hard Solved : ${percent}%`}
              />
            </Tooltip>
          </div>
        </div>
      </Layout>
    </Layout>
  );
}

export default Profile;