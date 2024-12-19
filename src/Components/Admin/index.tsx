import { useEffect, useState } from "react";
import {
  Modal,
  Row,
  Col,
  Button,
  Upload,
  List,
  Form,
  Input,
  message,
} from "antd";
import { UploadOutlined, DeleteFilled, PlusOutlined } from "@ant-design/icons";
import {
  CreateOutlined,
  ImageAspectRatio,
  RowingOutlined,
} from "@mui/icons-material";
import styles from "./admin.module.scss";
import img from "../../assets/Side-ad.png";
import image from "../../assets/image.png";
import axios from "axios";

const AdminPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(""); // Determines modal content
  const [uploadedImages, setUploadedImages] = useState([
    "https://picsum.photos/200",
  ]);
  const [isAddAgents, setIsAddAgents] = useState(false);
  const [agents, setAgents] = useState(["Agent 1", "Agent 2"]);
  const [blogs, setBlogs] = useState([
    {
      title: "My First Blog",
      content:
        "This is my first Blog I'm very happy that i'm able to create this blogs with the help of chat GPT",
      author: "Mitun Sahoooooo",
      id: 1,
    },
    {
      title: "My First Blog",
      content:
        "This is my first Blog I'm very happy that i'm able to create this blogs with the help of chat GPT",
      author: "Mitun Sahoooooo",
      id: 2,
    },
    {
      title: "My Second Blog",
      content:
        "This is my Second Blog I'm very happy that i'm able to create this blogs with the help of chat GPT",
      author: "Harsh Sahoooooo",
      id: 3,
    },
    {
      title: "My Second Blog",
      content:
        "This is my Second Blog I'm very happy that i'm able to create this blogs with the help of chat GPT",
      author: "Harsh Sahoooooo",
      id: 3,
    },
    {
      title: "My Second Blog",
      content:
        "This is my Second Blog I'm very happy that i'm able to create this blogs with the help of chat GPT",
      author: "Harsh Sahoooooo",
      id: 3,
    },
    {
      title: "My Second Blog",
      content:
        "This is my Second Blog I'm very happy that i'm able to create this blogs with the help of chat GPT",
      author: "Harsh Sahoooooo",
      id: 3,
    },
  ]);

  const [form] = Form.useForm();

  const openModal = (type: any) => {
    setModalType(type);
    setModalVisible(true);
  };

  const getBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/blogs");
      const data = response.data;
      setBlogs(data);
    } catch (error) {
      console.error(error);
      message.error("unable to fetch blogs");
    }
  };

 
  const handleImageUpload = (file: any) => {
    setUploadedImages([...uploadedImages, URL.createObjectURL(file)]);
    return false;
  };

  const handleBlogsDelete = async (id: any) => {
    try {
      const response = await axios.delete(`http://localhost:8000/blogs/${id}`);
      if (response?.status === 200) {
        message.success("Blog Deleted Successfully");
        getBlogs();
      }
    } catch (error) {
      console.error(error);
      message.error("Unable to delete the blog");
    }
  };

  const handleDelete = (item: any, type: any) => {
    if (type === "images") {
      setUploadedImages(uploadedImages.filter((img) => img !== item));
    } else if (type === "agents") {
      setAgents(agents.filter((agent) => agent !== item));
      handleDeteleAgent(item?.phone_number)
    } else if (type === "blogs") {
      handleBlogsDelete(item?.id);
    }
  };

  //   const handleFormSubmit = (values: any) => {
  //     setBlogs([...blogs, values.title]);
  //     setModalVisible(false);
  //     form.resetFields();
  //   };

  const handleBlogSubmit = async (values: any) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/blogs/create_blogs",
        values
      );
      if (response?.status === 200) {
        message.success("Added Blogs SuccessFully");
        getBlogs();
        setModalVisible(false);
        form.resetFields();
      }
    } catch (error) {
      console.error(error);
      message.error("Unable to create Blog");
    }
  };

  const handleAgentSubmit = async (values: any) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/user/create_user",
        values
      );
      if (response?.status === 200) {
        message.success("Added Blogs SuccessFully");
        getAgents();
        setModalVisible(false);
        setIsAddAgents(false);
        form.resetFields();
      }
    } catch (error) {
      console.error(error);
      message.error("Unable to create Blog");
    }
  };

  const getAgents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user/get_all_users");
      const data = response.data;
      console.log(data)
      setAgents(data);
    } catch (error) {
      console.error(error);
      message.error("unable to fetch blogs");
    }
  };


  const handleDeteleAgent = async (id : any) => {
    try {
      const response = await axios.delete(`http://localhost:8000/user/delete_user_by_phone_number/${id}`);
      if (response?.status === 200) {
        message.success("Blog Deleted Successfully");
        getAgents();
      }
    } catch (error) {
      console.error(error);
      message.error("Unable to delete the blog");
    }
  } 

  useEffect(() => {
    getBlogs();
    getAgents()
  }, []);

  return (
    <>
      <div className={styles.adminWrapper}>
        <div className={styles.contentPage}>
          <Row className={styles.AdminOverView} gutter={[20, 20]}>
            <Col
              span={20}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                fontFamily: "poppins",
                fontSize: "22px",
                fontWeight: "600",
              }}
            >
              <Row>Hi Hardy !</Row>
              <Row>Manage All your Blogs , Agents and News from here.</Row>
              <Row
                style={{ color: "red", fontWeight: "600", fontSize: "25px" }}
              >
                ADMIN
              </Row>
            </Col>
            <Col span={4} style={{ height: "100%" }}>
              <img style={{ height: "100%" }} src={image}></img>
            </Col>
          </Row>
          <Row
            style={{ marginTop: "3vh" }}
            justify={"space-between"}
            align={"middle"}
            gutter={[20, 20]}
          >
            {/* <Col span={12}>
                            <AppCarousel></AppCarousel>
                        </Col> */}
            <Col
              onClick={() => openModal("images")}
              className={styles.Btn}
              span={4}
              style={{
                height: "15vh",
                width: "100%",
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(113, 113, 113, 0.1) 100%)",
                borderRadius: "2vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Row>
                <ImageAspectRatio></ImageAspectRatio>
              </Row>
              <Row>Upload Images</Row>
            </Col>
            <Col
              onClick={() => openModal("agents")}
              className={styles.Btn}
              span={4}
              style={{
                height: "15vh",
                width: "100%",
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(113, 113, 113, 0.1) 100%)",
                borderRadius: "2vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Row>
                <RowingOutlined></RowingOutlined>
              </Row>
              <Row>Create/Remove</Row>
              <Row>Agents</Row>
            </Col>
            <Col
              onClick={() => openModal("blogs")}
              className={styles.Btn}
              span={4}
              style={{
                height: "15vh",
                width: "100%",
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(113, 113, 113, 0.1) 100%)",
                borderRadius: "2vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Row>
                <DeleteFilled></DeleteFilled>
              </Row>
              <Row>Edit/Delete</Row>
              <Row>Blogs</Row>
            </Col>
            <Col
              onClick={() => openModal("createBlog")}
              className={styles.Btn}
              span={4}
              style={{
                height: "15vh",
                width: "100%",
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(113, 113, 113, 0.1) 100%)",
                borderRadius: "2vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Row>
                <CreateOutlined></CreateOutlined>
              </Row>
              <Row>Create Blogs</Row>
            </Col>
            <Col
              onClick={() => openModal("createBlog")}
              className={styles.Btn}
              span={4}
              style={{
                height: "15vh",
                width: "100%",
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(113, 113, 113, 0.1) 100%)",
                borderRadius: "2vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Row>
                <CreateOutlined></CreateOutlined>
              </Row>
              <Row>Create Blogs</Row>
            </Col>
          </Row>
        </div>
        <div
          className={styles.SideImage}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

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
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          bodyStyle={{
            maxHeight: "400px",
            overflowY: "auto",
            paddingRight: "10px",
          }}
        >
          <div
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            className="hide_scrollbar"
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
                  style={{ color: "black !important" }}
                  dataSource={agents}
                  renderItem={(item:any) => (
                    <List.Item>
                      <h3>
                        {item?.username}
                      </h3>
                      <p>
                      {`Phone No:  ${item?.phone_number}`}
                      </p>
                      <Button
                        type="text"
                        icon={<DeleteFilled />}
                        onClick={() => handleDelete(item, "agents")}
                      />
                    </List.Item>
                  )}
                />
                {!isAddAgents && (
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsAddAgents(true)}
                  >
                    Add Agent
                  </Button>
                )}
                <div
                  style={
                    isAddAgents ? { display: "block" } : { display: "none" }
                  }
                >
                  <Form form={form} onFinish={handleAgentSubmit}>
                    <Form.Item
                      name="username"
                      label="User Name"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Enter your username" />
                    </Form.Item>
                    <Form.Item
                      name="phone_number"
                      label="Phone Number"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Enter Phone Number" />
                    </Form.Item>
                    <Form.Item
                      name="country_code"
                      label="Country Code"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Enter Country Code" />
                    </Form.Item>

                    <Form.Item
                      name="selected_site"
                      label="Enter Site"
                      rules={[{ required: true, type: "string" }]}
                    >
                      <Input placeholder="Enter Site" />
                    </Form.Item>
                    <Row gutter={[20, 20]} justify={"space-between"}>
                      <Button
                        style={{ backgroundColor: "#73d13d" }}
                        type="default"
                        icon={<PlusOutlined />}
                        htmlType="submit"
                      >
                        Submit
                      </Button>
                      {isAddAgents && (
                        <Button
                          type="primary"
                          onClick={() => setIsAddAgents(false)}
                        >
                          Cancel
                        </Button>
                      )}
                    </Row>
                  </Form>
                </div>
              </>
            )}

            {modalType === "blogs" && (
              <>
                <List
                  dataSource={blogs}
                  renderItem={(item) => (
                    <List.Item>
                      <div style={{ flex: 1 }}>
                        <h3>{item?.title}</h3>
                        <p style={{ margin: 0 }}>
                          <strong>Author:</strong> {item?.author}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>Content:</strong> {item?.content}
                        </p>
                      </div>
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
              <Form form={form} onFinish={handleBlogSubmit}>
                <Form.Item
                  name="title"
                  label="Blog Title"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter blog title" />
                </Form.Item>
                <Form.Item
                  name="author"
                  label="Author"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter blog Author Name" />
                </Form.Item>
                <Form.Item
                  name="content"
                  label="Content"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea placeholder="Enter blog content" />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AdminPage;

{
  /* <Col span={12}>
                            <Row justify={"space-around"} gutter={[10, 10]} style={{ marginTop: "2vh" }}>
                                

                            </Row>
                            <Row justify={"space-around"} gutter={[10, 10]} style={{ marginTop: "2vh" }}>
                               
                            </Row>
                        </Col> */
}
