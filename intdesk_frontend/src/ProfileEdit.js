import { CodeOutlined, RocketOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BiBriefcase,
  BiBuildings,
  BiCurrentLocation,
  BiFirstPage,
  BiLastPage,
  BiLinkAlt,
  BiLocationPlus,
  BiMailSend,
  BiUserMinus
} from "react-icons/bi";
import { GoMarkGithub } from "react-icons/go";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

const { Option } = Select;
const { Text, Link } = Typography;

function ProfileEdit() {
  const authToken = JSON.parse(localStorage.getItem("authToken"));

  const childrenLanguages: React.ReactNode[] = [];
  const childrenSkills: React.ReactNode[] = [];

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState([]);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const authToken = JSON.parse(localStorage.getItem("authToken"));
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

          form.setFieldsValue({
            username: data.username,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            city: data.city,
            country: data.country,
            occupation: data.occupation,
            current_workplace: data.current_workplace,
            website_link: data.website_link,
            github_link: data.github_link,
            languages: data.languages,
            skills: data.skills,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchUserInfo();
  }, [form]);

  const onFinish = (values) => {
    console.log("Success:", values);
    console.log("Submitted");

    let postData = {
      username: values.username,
      email: values.email,
      password: values.password,
      password2: values.password2,
      first_name: values.first_name,
      last_name: values.last_name,
      city: values.city,
      country: values.country,
      occupation: values.occupation,
      current_workplace: values.current_workplace,
      website_link: values.website_link,
      github_link: values.github_link,
      languages: values.languages,
      skills: values.skills,
    };

    console.log("Post Data: ", postData);

    axios
      .put("http://localhost:8000/users/details/", postData, {
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
      <Navigate to="/profile" />
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
        <h1>Edit Profile</h1>
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
            span: 20,
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
              <BiUserMinus
                style={{
                  fontSize: "25px",
                  color: "#08c",
                  paddingRight: "5%",
                }}
              />
              Username{" "}
            </div>
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label=<div style={{ display: "flex", justifyContent: "center" }}>
              {" "}
              <BiMailSend
                style={{
                  fontSize: "25px",
                  color: "#08c",
                  paddingRight: "5%",
                }}
              />
              Email{" "}
            </div>
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label=<div style={{ display: "flex", justifyContent: "center" }}>
              {" "}
              <BiFirstPage
                style={{
                  fontSize: "25px",
                  color: "#08c",
                  paddingRight: "5%",
                }}
              />
              First Name{" "}
            </div>
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label=<div style={{ display: "flex", justifyContent: "center" }}>
              {" "}
              <BiLastPage
                style={{
                  fontSize: "25px",
                  color: "#08c",
                  paddingRight: "5%",
                }}
              />
              Last Name{" "}
            </div>
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label=<div style={{ display: "flex", justifyContent: "center" }}>
              {" "}
              <BiCurrentLocation
                style={{
                  fontSize: "25px",
                  color: "#08c",
                  paddingRight: "5%",
                }}
              />
              City
            </div>
            name="city"
            rules={[
              {
                required: false,
                message: "City Name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label=<div style={{ display: "flex", justifyContent: "center" }}>
              {" "}
              <BiLocationPlus
                style={{
                  fontSize: "25px",
                  color: "#08c",
                  paddingRight: "5%",
                }}
              />
              Country
            </div>
            name="country"
            rules={[
              {
                required: false,
                message: "Country Name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label=<div style={{ display: "flex", justifyContent: "center" }}>
              {" "}
              <BiBriefcase
                style={{
                  fontSize: "25px",
                  color: "#08c",
                  paddingRight: "5%",
                }}
              />
              Occupation
            </div>
            name="occupation"
            rules={[
              {
                required: false,
                message: "Your Occupation",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label=<div style={{ display: "flex", justifyContent: "center" }}>
              {" "}
              <BiBuildings
                style={{
                  fontSize: "25px",
                  color: "#08c",
                  paddingRight: "5%",
                }}
              />
              Current Workplace
            </div>
            name="current_workplace"
            rules={[
              {
                required: false,
                message: "Your Current Workplace",
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
              Personal Website
            </div>
            name="website_link"
            rules={[
              {
                required: false,
                message: "Personal Website Link",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label=<div style={{ display: "flex", justifyContent: "center" }}>
              {" "}
              <GoMarkGithub
                style={{
                  fontSize: "25px",
                  color: "#08c",
                  paddingRight: "5%",
                }}
              />
              Github ID
            </div>
            name="github_link"
            rules={[
              {
                required: false,
                message: "GitHub ID",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label=<div style={{ display: "flex", justifyContent: "center" }}>
              {" "}
              <CodeOutlined
                style={{
                  fontSize: "20px",
                  color: "#08c",
                  paddingRight: "5%",
                }}
              />
              Languages
            </div>
            name="languages"
            rules={[
              {
                required: false,
                message: "Languages",
              },
            ]}
          >
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Languages"
              onChange={handleChange}
            >
              {childrenLanguages}
            </Select>
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
              Skills
            </div>
            name="skills"
            rules={[
              {
                required: false,
                message: "Skills",
              },
            ]}
          >
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Skills"
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
      <Navbar/>
      {isSubmitted ? SuccessSignUp : renderForm};{/* {renderForm} */}
    </div>
  );
}

export default ProfileEdit;
