import { Card, Space } from 'antd';
import React from 'react';
import assesment from './images/assesment.png';
import discussion from './images/discussion2.png';
import Navbar from "./navbar";

const { Meta } = Card;

function Profile() {
  return (
          <div>
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
              
              
          </div>
          
        );
}



  
export default Profile;
