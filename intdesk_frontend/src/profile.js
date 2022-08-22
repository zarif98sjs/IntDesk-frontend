import { BankOutlined, CodeOutlined, CodepenOutlined, GithubOutlined, GlobalOutlined, LaptopOutlined, NotificationOutlined, RocketOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Descriptions, Layout, Tag, Tooltip } from 'antd';

import React from 'react';
import Navbar from "./navbar";

const { Header, Content, Sider } = Layout;

const { Meta } = Card;
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
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
});
function Profile() {
  return (
    
    <Layout style={{background:'white'}}>
      <Navbar />
      <Layout>
      <Sider width={300} className="site-layout-background" style={{background:'white'}}>
        <p align="center">
          <Card style={{ width: 300, background:'white'}}>
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title="Md. Zarif Ul Alam"
                description="zarif98sjs"
                style={{
                  'display': 'block',
                }}
              />
          </Card>
          
          {/* <p> <CodepenOutlined style={{ fontSize: '18px', color: '#08c' }} />  Bangladesh</p>
          <p> <BankOutlined style={{ fontSize: '18px', color: '#08c' }} /> BUET</p>
          <p> <GlobalOutlined style={{ fontSize: '18px', color: '#08c' }} /> https://zarif98sjs.github.io/</p>
          <p> <GithubOutlined style={{ fontSize: '18px', color: '#08c' }} /> zarif98sjs</p> */}

        </p>

        {/* <p> <CodepenOutlined style={{ fontSize: '18px', color: '#08c' }} />  Bangladesh</p>
        <p> <BankOutlined style={{ fontSize: '18px', color: '#08c' }} /> BUET</p>
        <p> <GlobalOutlined style={{ fontSize: '18px', color: '#08c' }} /> https://zarif98sjs.github.io/</p>
        <p> <GithubOutlined style={{ fontSize: '18px', color: '#08c' }} /> zarif98sjs</p> */}
        {/* <RocketOutlined /> */}
        <Descriptions title='About Me' bordered style={{width:300}}>
            <Descriptions.Item label=<Tooltip title='Location'><CodepenOutlined style={{ fontSize: '18px', color: '#08c' }} /></Tooltip>  span={3}>Bangladesh</Descriptions.Item>
            <Descriptions.Item label=<Tooltip title='Institution'><BankOutlined style={{ fontSize: '18px', color: '#08c' }} /></Tooltip>  span={3}>BUET</Descriptions.Item>
            <Descriptions.Item label=<Tooltip title='Language'><GlobalOutlined style={{ fontSize: '18px', color: '#08c' }} /></Tooltip>  span={3}>https://zarif98sjs.github.io/</Descriptions.Item>
            <Descriptions.Item label=<Tooltip title='Website'><GithubOutlined style={{ fontSize: '18px', color: '#08c' }} /></Tooltip>  span={3}>zarif98sjs</Descriptions.Item>
            <Descriptions.Item label=<Tooltip title='Language'><CodeOutlined style={{ fontSize: '18px', color: '#08c' }} /></Tooltip>  span={3}><Tag>C++</Tag> <Tag>Python</Tag> <Tag>Java</Tag> <Tag>Go</Tag></Descriptions.Item>
            <Descriptions.Item label=<Tooltip title='Skills'><RocketOutlined style={{ fontSize: '18px', color: '#08c' }} /></Tooltip>  span={3}><Tag>DP</Tag> <Tag>Array</Tag> <Tag>Sorting</Tag> <Tag>Greedy</Tag></Descriptions.Item>
        </Descriptions>
      </Sider>
      </Layout>
      

      {/* <div>
              <Navbar />
              <div className="">
                <h1 id='title'> Welcome to your profile </h1>
              </div>
              <p align="center">
              <Space direction='horizontal' align='center' style={{
                        'gap': '5%'
                      }}>
              
                  <Card
                      style={{
                        width: 300,
                        border:'groove',
                      }}
                      cover={
                        <a href="/myq">
                          <img
                            alt="example"
                            src={discussion}
                            style={{
                              width: '70%',
                              padding: '12%',
                            }}
                          />
                        </a>
                      }
                      actions={[
                        // <SettingOutlined key="setting" />,
                        // <EditOutlined key="edit" />,
                        // <EllipsisOutlined key="ellipsis" />,
                      ]}
                    >
                      <Meta
                        title="Discussions"
                        description="Find your discussions here"
                        style={{
                          'display': 'block',
                        }}
                      />
                  </Card>

                  <Card
                      style={{
                        width: 300,
                        border:'groove',
                      }}
                      cover={
                        <a href="/">
                          <img
                            alt="example"
                            src={assesment}
                            style={{
                              width: '70%',
                              padding: '12%',
                            }}
                          />
                        </a>
                      }
                      actions={[
                        // <SettingOutlined key="setting" />,
                        // <EditOutlined key="edit" />,
                        // <EllipsisOutlined key="ellipsis" />,
                      ]}
                    >
                      <Meta
                        title="Assesments"
                        description="Find your assesments here"
                        style={{
                          'display': 'block',
                        }}
                      />
                  </Card>
                  
                  
              </Space>
              </p>
              
              
              <div style={{ width: 500 }}>

                <Tooltip title="240/340 Easy Problems Solved">
                  <Progress
                      type="line"
                      strokeWidth={12}
                      strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
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
                        '0%': '#108ee9',
                        '100%': '#87d068',
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
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }}
                      percent={9.8}
                      format={(percent) => `Hard Solved : ${percent}%`}
                    />
                </Tooltip>
              
              </div>
              
              
              
          </div> */}
      </Layout>
          
          
        );
}



  
export default Profile;
