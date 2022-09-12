import { RocketOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    BiLinkAlt
} from "react-icons/bi";
import { Navigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const { Option } = Select;

function AssessEdit() {
  const authToken = JSON.parse(localStorage.getItem("authToken"));

  const childrenLanguages: React.ReactNode[] = [];
  const childrenSkills: React.ReactNode[] = [];

  const params = useParams();
  const assessmentID = params.id;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form] = Form.useForm();
  const [assessInfo, setAssessInfo] = useState([]);
  const [roles, setRoles] = useState([]);


  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  function rolesArray(obj) {
    let arr = [];
    // var i; // HERE is where you move the 'var' to the top of the function
    for (let i = 0; i < obj.length; i += 1) {
      // console.log(obj[i].name);
      arr.push(obj[i].name);
    }
    // let string = arr.join(separator || ", ");
    // if (obj.length === 0) {
    //   string = "";
    // }
    return arr;
  }



  useEffect(() => {
    const fetchUserInfo = async () => {
      const authToken = JSON.parse(localStorage.getItem("authToken"));
      console.log("AUTH TOKEN in local storage: ", authToken);

      await axios
        .get("https://intdesk.herokuapp.com/assessments/assessment/".concat(assessmentID).concat("/"), {
          headers: {
            Authorization: "Token ".concat(authToken.token),
          },
        })
        .then((res) => {
          console.log("Assessment Info FETCHED");
          // console.log(window.$log = res.data.results);
          const data = res.data;
          console.log((window.$log = data));
          setAssessInfo(data);

          form.setFieldsValue({
            skill_name: data.skill_name,
            taken_by: data.taken_by,
            passed_by: data.passed_by,
            image_link: data.image_link,
            roles: rolesArray(data.roles),
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchUserInfo();
  }, [form, assessmentID]);

  const onFinish = (values) => {
    console.log("Success:", values);
    console.log("Submitted");

    let postData = {
        skill_name: values.skill_name,
        taken_by: values.taken_by,
        passed_by: values.passed_by,
        image_link: values.image_link,
        roles:  values.roles,
      
    };

    console.log("Post Data: ", postData);

    axios
      .put("https://intdesk.herokuapp.com/assessments/assessment/".concat(assessmentID).concat("/"), postData, {
        headers: {
          Authorization: "Token ".concat(authToken.token),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log((window.$log = res.data));
        setIsSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const SuccessSignUp = (
    <div>
      <Navigate to="/assessments" />
    </div>
  );

  const renderForm = (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "2%",
          paddingTop: "2%",
        }}
      >
        <h1>Edit Assessment</h1>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 50,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label=<div style={{ display: "flex", justifyContent: "center" }}>
              {" "}
              Skill name{" "}
            </div>
            name="skill_name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

            
          <Form.Item
            label=<div style={{ display: "flex", justifyContent: "center" }}>
              {" "}
              Taken By{" "}
            </div>
            name="taken_by"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label=<div style={{ display: "flex", justifyContent: "center" }}>
              {" "}
              Passed by{" "}
            </div>
            name="passed_by"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          

          

          <Form.Item
            label=<div style={{ display: "flex", justifyContent: "center" }}>
              {" "}
              <BiLinkAlt
                style={{
                  fontSize: "25px",
                  color: "#08c",
                  paddingRight: "5%",
                }}
              />
              Image Link
            </div>
            name="image_link"
            rules={[
              {
                required: false,
                message: "Image Link",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label=<div style={{ display: "flex", justifyContent: "center" }}>
              {" "}
              <RocketOutlined
                style={{
                  fontSize: "22px",
                  color: "#08c",
                  paddingRight: "5%",
                }}
              />
              Roles
            </div>
            name="roles"
            rules={[
              {
                required: false,
                message: "Roles",
              },
            ]}
          >
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Roles"
              onChange={handleChange}
            >
              {childrenSkills}
            </Select>
          </Form.Item>


          


          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 20,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      {isSubmitted ? SuccessSignUp : renderForm};{/* {renderForm} */}
    </div>
  );
}

export default AssessEdit;
