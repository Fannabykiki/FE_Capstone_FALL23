
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
    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const [componentDisabled, setComponentDisabled] = useState(true);



    return (
        <>

            <Space >
                <Button type="primary" onClick={showModal} style={{ margin: '10px' }}>
                    Create New Project
                </Button>

            </Space>
            <Modal open={open} title="Title" onOk={handleOk} onCancel={handleCancel} footer={(_, { CancelBtn }) => (
                <>
                    <Button >Create Project</Button>
                    <CancelBtn />

                </>
            )}
            >
                <>
                    <Checkbox
                        checked={componentDisabled}
                        onChange={(e) => setComponentDisabled(e.target.checked)}
                    >
                        Form disabled (Tick here to Create New)
                    </Checkbox>
                    <Form labelCol={{ span: 8, }} wrapperCol={{ span: 18, }}
                        layout="horizontal"
                        disabled={componentDisabled}
                        style={{
                            maxWidth: 900,
                        }}
                    >
                        <Form.Item label="Checkbox" name="disabled" valuePropName="checked">

                        </Form.Item>

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
