import React, { useState } from "react";
import { Modal, Row, Col, Button, Upload, List, Form, Input } from "antd";
import { UploadOutlined, DeleteFilled, PlusOutlined } from "@ant-design/icons";
import { CreateOutlined, ImageAspectRatio, RowingOutlined } from "@mui/icons-material";
import styles from "./admin.module.scss";
import img from "../../assets/Side-ad.png";
import image from "../../assets/image.png";
import AppCarousel from "../Carousal";


const AdminPage = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(""); // Determines modal content
    const [uploadedImages, setUploadedImages] = useState(["https://picsum.photos/200"]);
    const [agents, setAgents] = useState(["Agent 1", "Agent 2"]);
    const [blogs, setBlogs] = useState(["Blog 1", "Blog 2"]);

    const [form] = Form.useForm();

    // Handle opening modals
    const openModal = (type: any) => {
        setModalType(type);
        setModalVisible(true);
    };

    // Handle image upload
    const handleImageUpload = (file: any) => {
        setUploadedImages([...uploadedImages, URL.createObjectURL(file)]);
        return false; // Prevent default upload behavior
    };

    // Handle delete
    const handleDelete = (item: any, type: any) => {
        if (type === "images") {
            setUploadedImages(uploadedImages.filter((img) => img !== item));
        } else if (type === "agents") {
            setAgents(agents.filter((agent) => agent !== item));
        } else if (type === "blogs") {
            setBlogs(blogs.filter((blog) => blog !== item));
        }
    };

    // Handle form submission for creating a blog
    const handleFormSubmit = (values: any) => {
        setBlogs([...blogs, values.title]);
        setModalVisible(false);
        form.resetFields();
    };
    return (
        <>

            <div className={styles.adminWrapper}>
                <div className={styles.contentPage}>
                    <Row className={styles.AdminOverView} gutter={[20, 20]}>
                        <Col span={20} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "poppins", fontSize: "22px", fontWeight: "600" }}>
                            <Row>Hi Hardy !</Row>
                            <Row>Manage All your Blogs , Agents and News from here.</Row>
                            <Row style={{ color: "red", fontWeight: "600", fontSize: "25px" }}>ADMIN</Row>
                        </Col>
                        <Col span={4} style={{ height: "100%" }}>
                            <img style={{ height: "100%" }} src={image} ></img>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "3vh" }} justify={"start"} align={"middle"}>
                        <Col span={12}>
                            <AppCarousel></AppCarousel>
                        </Col>
                        <Col span={12}>
                            <Row justify={"space-around"} gutter={[10, 10]} style={{ marginTop: "2vh" }}>
                                <Col onClick={() => openModal("images")} className={styles.Btn} span={6} style={{ height: "15vh", width: "100%", background: "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(113, 113, 113, 0.1) 100%)", borderRadius: "2vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                    <Row><ImageAspectRatio></ImageAspectRatio></Row>
                                    <Row>Upload Images</Row>
                                </Col>
                                <Col onClick={() => openModal("agents")} className={styles.Btn} span={6} style={{ height: "15vh", width: "100%", background: "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(113, 113, 113, 0.1) 100%)", borderRadius: "2vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                    <Row><RowingOutlined></RowingOutlined></Row>
                                    <Row>Create/Remove</Row>
                                    <Row>Agents</Row>
                                </Col>

                            </Row>
                            <Row justify={"space-around"} gutter={[10, 10]} style={{ marginTop: "2vh" }}>
                                <Col  onClick={() => openModal("blogs")}className={styles.Btn} span={6} style={{ height: "15vh", width: "100%", background: "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(113, 113, 113, 0.1) 100%)", borderRadius: "2vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                    <Row><DeleteFilled></DeleteFilled></Row>
                                    <Row>Edit/Delete</Row>
                                    <Row>Blogs</Row>
                                </Col>
                                <Col onClick={() => openModal("createBlog")} className={styles.Btn} span={6} style={{ height: "15vh", width: "100%", background: "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(113, 113, 113, 0.1) 100%)", borderRadius: "2vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                    <Row><CreateOutlined></CreateOutlined></Row>
                                    <Row>Create Blogs</Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </div>
                <div className={styles.SideImage} style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                >

                </div>

                <Modal
                    title={
                        modalType === "images"
                            ? "Manage Images"
                            : modalType === "agents"
                                ? "Manage Agents"
                                : modalType === "blogs"
                                    ? "Manage Blogs"
                                    : "Create Blog"
                    }
                    visible={modalVisible}
                    onCancel={() => setModalVisible(false)}
                    footer={null}
                >
                    {modalType === "images" && (
                        <>
                            <Upload beforeUpload={handleImageUpload} showUploadList={false}>
                                <Button icon={<UploadOutlined />}>Upload Image</Button>
                            </Upload>
                            <List
                                dataSource={uploadedImages}
                                renderItem={(item) => (
                                    <List.Item>
                                        <img src={item} alt="Uploaded" width={100} />
                                        <Button
                                            type="text"
                                            icon={<DeleteFilled />}
                                            onClick={() => handleDelete(item, "images")}
                                        />
                                    </List.Item>
                                )}
                            />
                        </>
                    )}

                    {modalType === "agents" && (
                        <>
                            <List 
                                style={{color:"black !important"}}
                                dataSource={agents}
                                renderItem={(item) => (
                                    <List.Item>
                                        {item}
                                        <Button
                                            type="text"
                                            icon={<DeleteFilled />}
                                            onClick={() => handleDelete(item, "agents")}
                                        />
                                    </List.Item>
                                )}
                            />
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => setAgents([...agents, `Agent ${agents.length + 1}`])}
                            >
                                Add Agent
                            </Button>
                        </>
                    )}

                    {modalType === "blogs" && (
                        <>
                            <List
                                dataSource={blogs}
                                renderItem={(item) => (
                                    <List.Item>
                                        {item}
                                        <Button
                                            type="text"
                                            icon={<DeleteFilled />}
                                            onClick={() => handleDelete(item, "blogs")}
                                        />
                                    </List.Item>
                                )}
                            />
                        </>
                    )}

                    {modalType === "createBlog" && (
                        <Form form={form} onFinish={handleFormSubmit}>
                            <Form.Item name="title" label="Blog Title" rules={[{ required: true }]}>
                                <Input placeholder="Enter blog title" />
                            </Form.Item>
                            <Form.Item name="content" label="Content" rules={[{ required: true }]}>
                                <Input.TextArea placeholder="Enter blog content" />
                            </Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form>
                    )}
                </Modal>
            </div>
        </>
    )
}

export default AdminPage;