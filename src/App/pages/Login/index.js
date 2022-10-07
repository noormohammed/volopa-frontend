import React, {useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from 'context/AuthContext';
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import './/store/styles.css';

function Login() {
    let {loginUser} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        let isAuth = JSON.parse(localStorage.getItem('authTokens'));
        if(isAuth && isAuth !== null) {
            navigate("/");
        }
    }, []);

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Row className="full-height" align="middle" justify="center">
            <Col xxl={6} xl={9} lg={12} md={12} sm={18} xs={22}>
                <Card>
                    <Card.Grid className="full-width rounded">
                        <Row>
                            <Col span={24}>
                                <Typography.Text className="medium fs-28px dark-green">Login</Typography.Text>
                            </Col>
                        </Row>
                        <Row className="m-t-10">
                            <Col span={24}>
                                <Form
                                    labelCol={{
                                        span: 8,
                                    }}
                                    wrapperCol={{
                                        span: 16,
                                    }}
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={loginUser}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                    layout="vertical"
                                    requiredMark={false}>
                                    <Form.Item
                                        label={<span className="muli semi-bold">Username</span>}
                                        name='username'
                                        rules={[
                                            {
                                              required: true,
                                              message: 'Please input your username',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label={<span className="muli semi-bold">Password</span>}
                                        name='password'
                                        rules={[
                                            {
                                              required: true,
                                              message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                    <Form.Item
                                        wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                        }}
                                    >
                                        <Button type="primary" htmlType="submit" className="right-align-text">Login</Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Grid>
                </Card>
            </Col>
        </Row>
    );
}

export default Login;