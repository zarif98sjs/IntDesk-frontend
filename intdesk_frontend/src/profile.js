import {
  BankOutlined,
  CodeOutlined,
  CodepenOutlined,
  GithubOutlined,
  GlobalOutlined,
  LaptopOutlined,
  NotificationOutlined,
  RocketOutlined,
  UserOutlined
} from "@ant-design/icons";
import {
  Avatar, Badge, Button,
  Card,
  Descriptions,
  Layout,
  Progress,
  Space,
  Tag,
  Tooltip
} from "antd";

import React from "react";
import ActivityCalendar from "react-activity-calendar";
import activityData from "./activityData";
import assesment from "./images/assesment.png";
import discussion from "./images/discussion2.png";
import problem_img from "./images/problem.png";
import Navbar from "./navbar";

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
  return (
    <Layout style={{ background: "white" }}>
      <Navbar />
      <Layout>
        <Sider
          width={300}
          className="site-layout-background"
          style={{ background: "white" }}
        >
          <p align="center">
            <Card style={{ width: 300, background: "white" }}>
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title="Md. Zarif Ul Alam"
                description="zarif98sjs"
                style={{
                  display: "block",
                }}
              />
            </Card>  
          </p>

          <div style={{ textAlign:"right" }}>
          <Badge.Ribbon text="C++ Intermediate">
              <Card title=" " size="small">
              <i>Solved 50 problems in C++</i>
                </Card>
            </Badge.Ribbon>

            <Badge.Ribbon text="Algorithm Master" color="red">
              <Card title=" " size="small">
              <i>Solved 100 Algorithm Problems</i>
              </Card>
            </Badge.Ribbon>

            {/* get a random color */}
            <Badge.Ribbon text="Data Structure Master" color="pink">
              <Card title=" " size="small">
                <i>Solved 100 Data Structure Problmes</i>
              </Card>
            </Badge.Ribbon>
          </div>

          
          <Descriptions
            title=""
            bordered
            style={{ width: 300, paddingTop:"5%", textAlign:'right'}}
          >
            
            <Descriptions.Item
              label=<Tooltip title="Location">
                <CodepenOutlined style={{ fontSize: "18px", color: "#08c" }} />
              </Tooltip>
              span={3}
            >
              <Tooltip title="Location">Bangladesh</Tooltip>
            </Descriptions.Item>
            <Descriptions.Item
              label=<Tooltip title="Institution">
                <BankOutlined style={{ fontSize: "18px", color: "#08c" }} />
              </Tooltip>
              span={3}
            >
              <Tooltip title="Institution">BUET</Tooltip>
            </Descriptions.Item>
            <Descriptions.Item
              label=<Tooltip title="Language">
                <GlobalOutlined style={{ fontSize: "18px", color: "#08c" }} />
              </Tooltip>
              span={3}
            >
              <Tooltip title="Website">https://zarif98sjs.github.io/</Tooltip>
            </Descriptions.Item>
            <Descriptions.Item
              label=<Tooltip title="Website">
                <GithubOutlined style={{ fontSize: "18px", color: "#08c" }} />
              </Tooltip>
              span={3}
            >
              <Tooltip title="GitHub">zarif98sjs</Tooltip>
            </Descriptions.Item>
            <Descriptions.Item
              label=<Tooltip title="Language">
                <CodeOutlined style={{ fontSize: "18px", color: "#08c" }} />
              </Tooltip>
              span={3}
            >
              <Tooltip title="Language">
                {" "}
                <Tag>C++</Tag> <Tag>Python</Tag> <Tag>Java</Tag> <Tag>Go</Tag>{" "}
              </Tooltip>
            </Descriptions.Item>
            <Descriptions.Item
              label=<Tooltip title="Skills">
                <RocketOutlined style={{ fontSize: "18px", color: "#08c" }} />
              </Tooltip>
              span={3}
            >
              <Tooltip title="Skills">
                <Tag>DP</Tag> <Tag>Array</Tag> <Tag>Sorting</Tag>{" "}
                <Tag>Greedy</Tag>{" "}
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
            >
              {" "}
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
                    <a href="/myq">
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
                    description="Find your solved problems here"
                    style={{ display: "block" }}
                  />
                </Card>

                <Card
                  style={{ width: 250, border: "groove" }}
                  cover={
                    <a href="/myq">
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
            {/* need to add badges */}
            <Badge.Ribbon text="C++ Master" />
            <Badge.Ribbon text="Algorithm Master" color="red" />
            <Badge.Ribbon text="Data Structure Guru" />
              
            {/* </Badge.Ribbon> */}
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
