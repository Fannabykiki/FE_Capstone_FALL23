
import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Cascader, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Slider, Switch, TreeSelect, Upload, } from 'antd';
// ----------------------------------------------
const { RangePicker } = DatePicker;
const { TextArea } = Input;



const TaskCreateProject = () => {
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };
    const [componentDisabled, setComponentDisabled] = useState(true);



    return (
        <>

            <Space >
                <Button type="primary" onClick={showModal} style={{ margin: '10px', backgroundColor: 'rgb(48 186 168)', fontWeight: 'bold' }}>
                    Create New Project
                </Button>

            </Space>
            <Modal open={open} title="Create New Project" onCancel={handleCancel} footer={(_, { CancelBtn }) => (
                <>
                    <Button style={{ backgroundColor: '#689df4', color: 'white' }} >Create Project</Button>
                    <CancelBtn />

                </>
            )}
            >
                <>

                    <Form labelCol={{ span: 8, }} wrapperCol={{ span: 18, }}
                        layout="horizontal"
                        disabled={componentDisabled}
                        style={{
                            maxWidth: 900,
                        }}
                    >




                        <Form.Item label="Name Project">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Description">
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item label="Start Date">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item label="End Date">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item label="Privacy">
                            <Radio.Group>
                                <Radio value="apple"> Private </Radio>
                                <Radio value="pear"> Public </Radio>
                            </Radio.Group>
                        </Form.Item>


                    </Form>
                </>

            </Modal>


        </>
    );
};
export default TaskCreateProject;
