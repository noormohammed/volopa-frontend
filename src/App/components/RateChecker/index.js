import { Row, Col, Typography, Card, Form, Input, Select, Space, Progress, Button } from 'antd'
import useAxios from 'utils/useAxios';
import { useNavigate } from 'react-router-dom';

function RateChecker() {
    const [form] = Form.useForm();
    let api = useAxios();
    const navigate = useNavigate();

    /* Request for exchange rate on submit */
    const onSubmit = async (e) => {
        let response = await api.post('/api/rate/', {
            convertFrom: e.convertFrom,
            convertTo: e.convertTo,
        }).catch(function (error) {
            console.log(error.toJSON());
            /* If the axios post fails, delete the storage item and let the user login again */
            localStorage.removeItem("authTokens");
            navigate("/login");
        });

        if (response.status === 200){
            let info = `You are converting ${e.convertingUnits} ${e.convertFrom} into ${e.convertTo} `;
            info += `at the rate of ${parseFloat(response.data).toFixed(2)}`;
            alert(info);
        } else {
            alert(response.data.message);
        }
    };

    return (
        <>
            <Row>
                <Col span={24}>
                    <Typography.Text className='dark-green medium fs-25px'>Rate Checker</Typography.Text>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Card>
                        <Card.Grid className='full-width rounded b-g hover-no-border'>
                            <Form form={form} layout='vertical' onFinish={onSubmit}>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item
                                            label={<span className='muli semi-bold fs-18px'>Convert To</span>}
                                        >
                                            <Row gutter={8}>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name='convertTo'
                                                        rules={[
                                                            {
                                                            required: true,
                                                            message: 'Convert to (currency) is required'
                                                            },
                                                        ]}
                                                    >
                                                        <Select
                                                            className='dark-green'
                                                            showSearch
                                                            filterOption={(input, option) => {
                                                                if (option.children)
                                                                    return option.children.toLowerCase().includes(input.toLowerCase())
                                                                else if (option.label)
                                                                    return option.label.toLowerCase().includes(input.toLowerCase())
                                                            }}>
                                                            <Select.OptGroup label='Common'>
                                                                <Select.Option value="GBP">GBP</Select.Option>
                                                                <Select.Option value="EUR">EUR</Select.Option>
                                                            </Select.OptGroup>
                                                            <Select.OptGroup label='Other'>
                                                                <Select.Option value="USD">USD</Select.Option>
                                                                <Select.Option value="AUD">AUD</Select.Option>
                                                            </Select.OptGroup>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={18}>
                                                    <Form.Item
                                                        name='convertedUnits'
                                                    >
                                                        <Input placeholder='Enter Amount' />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item
                                            label={<span className='muli semi-bold fs-18px'>Convert From</span>}
                                        >
                                            <Row gutter={8}>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name='convertFrom'
                                                        rules={[
                                                            {
                                                            required: true,
                                                            message: 'Convert From (currency) is required'
                                                            },
                                                        ]}
                                                    >
                                                        <Select
                                                            className='dark-green'
                                                            showSearch
                                                            filterOption={(input, option) => {
                                                                if (option.children)
                                                                    return option.children.toLowerCase().includes(input.toLowerCase())
                                                                else if (option.label)
                                                                    return option.label.toLowerCase().includes(input.toLowerCase())
                                                            }}>
                                                            <Select.OptGroup label='Common'>
                                                                <Select.Option value="GBP">GBP</Select.Option>
                                                                <Select.Option value="EUR">EUR</Select.Option>
                                                            </Select.OptGroup>
                                                            <Select.OptGroup label='Other'>
                                                                <Select.Option value="USD">USD</Select.Option>
                                                                <Select.Option value="AUD">AUD</Select.Option>
                                                            </Select.OptGroup>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={18}>
                                                    <Form.Item
                                                        name='convertingUnits'
                                                        rules={[
                                                            {
                                                            required: true,
                                                            message: 'Amount/Units for converting is required'
                                                            },
                                                        ]}
                                                    >
                                                        <Input placeholder='Enter Amount' />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row align='bottom'>
                                    <Col span={12}>
                                        <Space>
                                            <Progress type='circle' percent={75} width={40} format={() => `30s`} />
                                            <Space direction='vertical' size={0}>
                                                <Typography.Text className='muli semi-bold light-green'>FX Rate</Typography.Text>
                                                <Typography.Text className='muli semi-bold light-green'>1 GBP = 1.19 EUR</Typography.Text>
                                            </Space>
                                        </Space>
                                    </Col>
                                    <Col span={12} className='right-align-text'>
                                        <Button type='primary' htmlType='submit'>Convert</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Grid>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default RateChecker;