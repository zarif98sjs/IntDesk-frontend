
import { Card, Space } from "antd";
import RecommendedAssess from "./Assessments/recommendedAssess";
import assesment from "./images/assesment.png";
import discussion from "./images/discussion2.png";
import problem_img from "./images/problem.png";
import Navbar from "./Navbar/Navbar";
import RecommendProblems from "./Problems/RecommendProblems";

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
                <a href="/problems">
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
                description="Solve coding problems of interviews"
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
            >
              <Meta
                title="Discussions"
                description="Discuss and ask away your queries about anything"
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
            >
              <Meta
                title="Assesments"
                description="Assess your skills and earn badges"
                style={{
                  display: "block",
                }}
              />
            </Card>
          </Space>
        </p>
      </div>

      <div style={{paddingLeft:'10%',paddingRight:'10%'}}>
        <h1 align='center'> Recommended Assessments</h1>
                <RecommendedAssess/>

      </div>
      
      <div style={{paddingLeft:'10%',paddingRight:'10%'}}>
        <h1 align='center'> Recommended Problems</h1>
                <RecommendProblems/>

      </div>

    </div>
  );
}
