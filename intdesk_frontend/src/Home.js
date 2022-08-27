
import { Card, Space } from "antd";
import RecommendedAssess from "./Assessments/recommendedAssess";
import logo from './images/logo5.png';
import assesment from "./images/assesment.png";
import discussion from "./images/discussion2.png";
import problem_img from "./images/problem.png";
import Navbar from "./Navbar/Navbar";

const { Meta } = Card;

export default function Home() {
  return (
    <div>
      <Navbar />
      {/* <p align="center">
    <img src={logo} alt="IntDesk" />
    </p> */}

      <div style={{padding:'20px'}}>
        <p align="center">
          <h1 align='center'> Features</h1>
          <Space
            direction="horizontal"
            align="center"
            style={{ gap: "5%" }}
          >
            <Card
              style={{ width: 250, border: "groove" }}
              cover={
                <a href="/discussions">
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
                <a href="/discussions">
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
                <a href="/assessments">
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

      <div style={{padding:'20px'}}>
        <h1 align='center'> Recommended Assessments</h1>
                <RecommendedAssess/>

      </div>

    </div>
  );
}
