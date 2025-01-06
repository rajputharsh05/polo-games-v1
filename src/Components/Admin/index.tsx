import { useEffect, useState } from "react";
import {
  Modal,
  Row,
  Col,
  Button,
  Upload,
  Form,
  Input,
  message,
  Card,
  Table,
} from "antd";
import {
  UploadOutlined,
  DeleteFilled,
  PlusOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { ImageAspectRatio, RowingOutlined } from "@mui/icons-material";
import styles from "./admin.module.scss";
import logo from "../../assets/Polo_Logo_Png[1] 1.svg";
import image from "../../assets/image.png";
import axios from "axios";

const AdminPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("images");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isAddAgents, setIsAddAgents] = useState(false);
  const [isAddblogs, setIsAddBlogs] = useState(false);
  const [agents, setAgents] = useState([]);
  const [imageModal, setImageModal] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [reels, setReels] = useState([]);
  const [reelModal, setReelModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [marqueeModal, setMarqueeModal] = useState(false);
  const [text, setText] = useState([]);

  const [form] = Form.useForm();

  const openModal = (type: any) => {
    console.log(modalVisible);
    setModalType(type);
    setModalVisible(true);
  };

  const getImages = async () => {
    try {
      const response = await axios.get("http://localhost:8000/admin/images");
      const data = response.data;
      console.log(response.data);
      setUploadedImages(data);
    } catch (error) {
      console.error(error);
      message.error("unable to fetch blogs");
    }
  };

  const getReels = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/reels/get-reels/"
      );
      const data = response.data;
      setReels(data);
    } catch (error) {
      console.error(error);
      message.error("unable to fetch blogs");
    }
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

  const handleImageDelete = async (id: any) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/admin/delete_image/${id}`
      );
      if (response?.status === 200) {
        message.success("Banner removed Successfully");
        getImages();
      }
    } catch (error) {
      console.error(error);
      message.error("Unable to delete the banners");
    }
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/admin/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        getImages();
        message.success("Banner uploaded successfully!");
      } else {
        message.error("Failed to upload Banner. Please try again.");
      }
    } catch (error: any) {
      console.error("Error uploading Banner:", error);
      message.error(error?.response?.data?.detail);
    } finally {
      setImageModal(false);
    }

    return false;
  };

  const handleReelsUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/reels/upload-reel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        getReels();
        message.success("Reel uploaded successfully!");
      } else {
        message.error("Failed to upload Reel. Please try again.");
      }
    } catch (error: any) {
      console.error("Error uploading Reel:", error);
      message.error("Error uploading Reel");
    } finally {
      setReelModal(false);
      setLoading(false);
    }
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
      handleImageDelete(item?.id);
    } else if (type === "agents") {
      setAgents(agents.filter((agent) => agent !== item));
      handleDeteleAgent(item?.phone_number);
    } else if (type === "blogs") {
      handleBlogsDelete(item?.id);
    }
  };

  const handleBlogSubmit = async (values: any) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/blogs/create_blogs",
        values
      );
      if (response?.status === 200) {
        message.success("Added Blogs SuccessFully");
        getBlogs();
        setIsAddBlogs(false);
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
        setIsAddAgents(false);
        form.resetFields();
      }
    } catch (error) {
      console.error(error);
      message.error("Unable to create Agent");
    }
  };

  const getAgents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/user/get_all_users"
      );
      const data = response.data;
      console.log(data);
      setAgents(data);
    } catch (error) {
      console.error(error);
      message.error("unable to fetch blogs");
    }
  };

  const handleDeteleAgent = async (id: any) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/user/delete_user_by_phone_number/${id}`
      );
      if (response?.status === 200) {
        message.success("Blog Deleted Successfully");
        getAgents();
      }
    } catch (error) {
      console.error(error);
      message.error("Unable to delete the blog");
    }
  };

  const handleDeleteReels = async (id: any) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/reels/delete-reel/${id}`
      );
      if (response?.status === 200) {
        message.success("Reel Deleted Successfully");
        getReels();
      }
    } catch (error) {
      console.error(error);
      message.error("Unable to delete the Reel");
    }
  };

  const getTexts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/marqueetext/statements"
      );
      const data = response.data;
      console.log(data);
      setText(data);
    } catch (error) {
      console.error(error);
      message.error("unable to fetch texts");
    }
  };

  const handleMarqueeSubmit = async (values: any) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/marqueetext/create-statement?content=${values?.Text}`
      );
      if (response?.status === 200) {
        message.success("Added Marquee SuccessFully");
        getTexts();
        setMarqueeModal(false);
        form.resetFields();
      }
    } catch (error) {
      console.error(error);
      message.error("Unable to create text");
    }
  };

  const handleTextDelete = async (id : any) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/marqueetext/delete-statement/${id}`
      );
      if (response?.status === 200) {
        message.success("Text Deleted Successfully");
        getTexts();
      }
    } catch (error) {
      console.error(error);
      message.error("Unable to delete the Text");
    }
  };

  useEffect(() => {
    getBlogs();
    getAgents();
    getImages();
    getReels();
    getTexts();
  }, []);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text: string) => <span style={{ color: "white" }}>{text}</span>,
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
      render: (text: string) => (
        <span style={{ color: "white" }}>{`${text}`}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Button
          style={{ color: "white" }}
          type="text"
          icon={<DeleteFilled />}
          onClick={() => handleDelete(record, "agents")}
        />
      ),
    },
  ];

  const Blogscolumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <span style={{ color: "white" }}>{text}</span>,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      render: (text: string) => <span style={{ color: "white" }}>{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Button
          style={{ color: "white" }}
          type="text"
          icon={<DeleteFilled />}
          onClick={() => handleDelete(record, "blogs")}
        />
      ),
    },
  ];

  const Imagecolumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: number) => <span style={{ color: "white" }}>{text}</span>,
    },
    {
      title: "File Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <span style={{ color: "white" }}>{text}</span>,
    },
    {
      title: "Image",
      key: "content",
      render: (_: any, record: any) => (
        <img
          src={record.content}
          alt={record.name}
          style={{
            width: "100px",
            height: "auto",
            border: "1px solid white",
            borderRadius: "4px",
          }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Button
          style={{ color: "white" }}
          type="text"
          icon={<DeleteFilled />}
          onClick={() => handleDelete(record, "images")}
        />
      ),
    },
  ];

  const Textcolumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: number) => <span style={{ color: "white" }}>{text}</span>,
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      render: (text: string) => <span style={{ color: "white" }}>{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Button
          style={{ color: "white" }}
          type="text"
          icon={<DeleteFilled />}
          onClick={() => handleTextDelete(record?.id)}
        />
      ),
    },
  ];

  function getLastSegment(url: string) {
    try {
      const urlObj = new URL(url);
      const path = urlObj?.pathname;
      const segments = path?.split("/");
      return segments?.pop();
    } catch (error) {
      console.error("Invalid URL", error);
      return null;
    }
  }

  const ReelsColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: number, idx: number, num: number) => {
        console.log(text, idx, num);
        return <span style={{ color: "white" }}>{num + 1}</span>;
      },
    },
    {
      title: "File Name",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) => (
        <span style={{ color: "white" }}>{getLastSegment(record)}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Button
          style={{ color: "white" }}
          type="text"
          icon={<DeleteFilled />}
          onClick={() => handleDeleteReels(getLastSegment(record))}
        />
      ),
    },
  ];

  return (
    <>
      <div className={styles.adminWrapper}>
        <div className={styles.contentPage}>
          <Row
            className={styles.AdminOverView}
            style={{
              display: "flex",
              flexWrap: "wrap", // Ensures the layout adapts for smaller screens
              padding: "1rem",
            }}
          >
            <Col
              span={20}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(16px, 2vw, 22px)", // Dynamically adjust font size
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              <Row>Hi Hardy!</Row>
              <Row>Manage All your Blogs, Agents, and News from here.</Row>
              <Row
                style={{
                  color: "red",
                  fontWeight: "600",
                  fontSize: "clamp(20px, 3vw, 25px)", // Adjust font size for "ADMIN"
                }}
              >
                ADMIN
              </Row>
            </Col>
            <Col
              span={4}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <img
                style={{
                  height: "auto",
                  width: "clamp(50px, 20%, 100px)", // Responsive image sizing
                  maxHeight: "100%",
                }}
                src={image}
                alt="Admin Overview"
              />
            </Col>
          </Row>

          <Row
            style={{ marginTop: "3vh" }}
            justify="space-between"
            gutter={[16, 16]}
          >
            {[
              {
                key: "images",
                icon: <ImageAspectRatio />,
                label: "Manage Banners",
              },
              {
                key: "agents",
                icon: <RowingOutlined />,
                label: "Manage Clients",
              },
              { key: "blogs", icon: <DeleteFilled />, label: "Manage Blogs" },
              {
                key: "manageReels",
                icon: <VideoCameraOutlined />,
                label: "Manage Reels",
              },
              {
                key: "manageMarquee",
                icon: <VideoCameraOutlined />,
                label: "Manage Marquee",
              },
            ].map((tab) => (
              <Col
                key={tab.key}
                onClick={() => openModal(tab.key)}
                className={`${styles.Btn} ${
                  modalType === tab.key ? styles.active : styles.inactive
                }`}
                span={4}
              >
                <Row justify={"center"}>
                  <div className={styles.Icon}>{tab.icon}</div>
                </Row>
                <Row justify={"center"}>
                  <div className={styles.Label}>{tab.label}</div>
                </Row>
              </Col>
            ))}
          </Row>

          <Row>
            <Card style={{ width: "100%" }}>
              <div
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
                className="hide_scrollbar"
              >
                {modalType === "images" && (
                  <div style={{ marginTop: "2vh" }}>
                    <>
                      <Row justify={"end"} style={{ marginBottom: "2vh" }}>
                        <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => setImageModal(true)}
                        >
                          Add Banner
                        </Button>
                      </Row>
                      <Table
                        dataSource={uploadedImages}
                        columns={Imagecolumns}
                        rowKey="id"
                        style={{
                          backgroundColor: "transparent",
                          overflow: "scroll",
                          msOverflowStyle: "none", // For IE and Edge
                          scrollbarWidth: "none",
                        }}
                        pagination={{ pageSize: 5 }}
                      />
                    </>
                  </div>
                )}

                {modalType === "agents" && (
                  <>
                    {
                      <Row
                        justify={"end"}
                        style={{ marginTop: "2vh", marginBottom: "2vh" }}
                      >
                        <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => setIsAddAgents(true)}
                        >
                          Add Agent
                        </Button>
                      </Row>
                    }
                    <Table
                      dataSource={agents}
                      columns={columns}
                      rowKey="id" // Replace 'id' with the unique key in your data
                      pagination={{ pageSize: 10 }}
                      style={{
                        backgroundColor: "transparent",
                        overflow: "scroll",
                        msOverflowStyle: "none", // For IE and Edge
                        scrollbarWidth: "none",
                      }}
                    />
                    <Modal
                      open={isAddAgents}
                      onCancel={() => setIsAddAgents(false)}
                      onClose={() => setIsAddAgents(false)}
                      footer=""
                    >
                      <Card
                        title={
                          <Row
                            justify={"center"}
                            style={{
                              backgroundColor: "inherit",
                              marginBottom: "2vh",
                            }}
                          >
                            <img
                              src={logo} // Replace with the actual path to your logo
                              alt="Polo Games Logo"
                              style={{ height: "50px" }}
                            />
                          </Row>
                        }
                      >
                        <Form
                          style={{ color: "white" }}
                          form={form}
                          onFinish={handleAgentSubmit}
                        >
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
                            {isAddAgents && (
                              <Button
                                type="primary"
                                onClick={() => setIsAddAgents(false)}
                              >
                                Cancel
                              </Button>
                            )}
                            <Button
                              style={{ backgroundColor: "#73d13d" }}
                              type="default"
                              htmlType="submit"
                            >
                              Submit
                            </Button>
                          </Row>
                        </Form>
                      </Card>
                    </Modal>
                  </>
                )}

                {modalType === "blogs" && (
                  <>
                    {
                      <Row
                        justify={"end"}
                        style={{ marginTop: "2vh", marginBottom: "2vh" }}
                      >
                        <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => setIsAddBlogs(true)}
                        >
                          Add Blogs
                        </Button>
                      </Row>
                    }
                    <Table
                      dataSource={blogs}
                      columns={Blogscolumns}
                      rowKey="id" // Replace with your unique key
                      expandable={{
                        expandedRowRender: (record) => (
                          <p style={{ margin: 0, color: "white" }}>
                            <strong>Content:</strong> {record.content}
                          </p>
                        ),
                        rowExpandable: (record) => !!record.content,
                        expandIcon: ({ expanded, onExpand, record }) =>
                          expanded ? (
                            <MinusCircleOutlined
                              onClick={(e) => onExpand(record, e)}
                              style={{ fontSize: "16px", color: "white" }}
                            />
                          ) : (
                            <PlusCircleOutlined
                              onClick={(e) => onExpand(record, e)}
                              style={{ fontSize: "16px", color: "white" }}
                            />
                          ),
                      }}
                      style={{
                        backgroundColor: "transparent",
                        overflow: "scroll",
                        msOverflowStyle: "none", // For IE and Edge
                        scrollbarWidth: "none",
                      }}
                      pagination={{ pageSize: 5 }}
                    />
                  </>
                )}

                {modalType === "manageReels" && (
                  <>
                    {
                      <Row
                        justify={"end"}
                        style={{ marginTop: "2vh", marginBottom: "2vh" }}
                      >
                        <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => setReelModal(true)}
                        >
                          Add Reels
                        </Button>
                      </Row>
                    }
                    <Table
                      dataSource={reels}
                      columns={ReelsColumns}
                      rowKey="id" // Replace with your unique key
                      style={{
                        backgroundColor: "transparent",
                        overflow: "scroll",
                        msOverflowStyle: "none", // For IE and Edge
                        scrollbarWidth: "none",
                      }}
                      pagination={{ pageSize: 5 }}
                    />
                  </>
                )}

                {modalType === "manageMarquee" && (
                  <>
                    {
                      <Row
                        justify={"end"}
                        style={{ marginTop: "2vh", marginBottom: "2vh" }}
                      >
                        <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => setMarqueeModal(true)}
                        >
                          Add Reels
                        </Button>
                      </Row>
                    }
                    <Table
                      dataSource={text}
                      columns={Textcolumns}
                      rowKey="id" // Replace with your unique key
                      style={{
                        backgroundColor: "transparent",
                        overflow: "scroll",
                        msOverflowStyle: "none", // For IE and Edge
                        scrollbarWidth: "none",
                      }}
                      pagination={{ pageSize: 5 }}
                    />
                  </>
                )}
              </div>
            </Card>
          </Row>
        </div>

        <Modal
          open={isAddblogs}
          onCancel={() => setIsAddBlogs(false)}
          onClose={() => setIsAddBlogs(false)}
          footer={""}
        >
          <Card
            title={
              <Row
                justify={"center"}
                style={{ backgroundColor: "inherit", marginBottom: "2vh" }}
              >
                <img
                  src={logo} // Replace with the actual path to your logo
                  alt="Polo Games Logo"
                  style={{ height: "50px" }}
                />
              </Row>
            }
          >
            <Form
              style={{ color: "white", marginTop: "3vh" }}
              form={form}
              onFinish={handleBlogSubmit}
            >
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: "Please enter the blog title!",
                  },
                ]}
              >
                <Input placeholder="Enter blog title" />
              </Form.Item>
              <Form.Item
                name="author"
                label="Author"
                rules={[
                  {
                    required: true,
                    message: "Please enter the author name!",
                  },
                ]}
              >
                <Input placeholder="Enter blog Author Name" />
              </Form.Item>
              <Form.Item
                name="content"
                label="Content"
                rules={[
                  {
                    required: true,
                    message: "Please enter the blog content!",
                  },
                ]}
              >
                <Input.TextArea placeholder="Enter blog content" />
              </Form.Item>
              <Form.Item>
                <Row justify={"space-between"}>
                  <Col>
                    <Button type="primary" onClick={() => setIsAddBlogs(false)}>
                      Cancle
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      style={{ backgroundColor: "#73d13d" }}
                      type="primary"
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Card>
        </Modal>
        <Modal
          open={imageModal}
          onCancel={() => setImageModal(false)}
          onClose={() => setImageModal(false)}
          footer={""}
        >
          <Card
            title={
              <Row
                justify={"center"}
                style={{ backgroundColor: "inherit", marginBottom: "2vh" }}
              >
                <img
                  src={logo} // Replace with the actual path to your logo
                  alt="Polo Games Logo"
                  style={{ height: "50px" }}
                />
              </Row>
            }
          >
            <Row justify={"center"}>
              <Upload beforeUpload={handleImageUpload} showUploadList={false}>
                <Button
                  style={{ color: "white", marginTop: "5vh" }}
                  icon={<UploadOutlined />}
                >
                  Upload Banner
                </Button>
              </Upload>
            </Row>
          </Card>
        </Modal>
        <Modal
          open={reelModal}
          onCancel={() => setReelModal(false)}
          onClose={() => setReelModal(false)}
          footer={""}
        >
          <Card
            loading={loading}
            title={
              <Row
                justify={"center"}
                style={{ backgroundColor: "inherit", marginBottom: "2vh" }}
              >
                <img
                  src={logo} // Replace with the actual path to your logo
                  alt="Polo Games Logo"
                  style={{ height: "50px" }}
                />
              </Row>
            }
          >
            <Row justify={"center"}>
              <Upload beforeUpload={handleReelsUpload} showUploadList={false}>
                <Button
                  style={{ color: "white", marginTop: "5vh" }}
                  icon={<UploadOutlined />}
                >
                  Upload Reels
                </Button>
              </Upload>
            </Row>
          </Card>
        </Modal>

        <Modal
          open={marqueeModal}
          onCancel={() => setMarqueeModal(false)}
          onClose={() => setMarqueeModal(false)}
          footer={""}
        >
          <Card
            loading={loading}
            title={
              <Row
                justify={"center"}
                style={{ backgroundColor: "inherit", marginBottom: "2vh" }}
              >
                <img
                  src={logo}
                  alt="Polo Games Logo"
                  style={{ height: "50px" }}
                />
              </Row>
            }
          >
            <Row justify={"center"}>
              <Form
                style={{ color: "white", marginTop: "3vh" }}
                form={form}
                onFinish={handleMarqueeSubmit}
              >
                <Form.Item
                  name="Text"
                  label="Text"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the Your text here!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Text" />
                </Form.Item>
                <Form.Item>
                  <Row justify={"space-between"}>
                    <Col>
                      <Button
                        type="primary"
                        onClick={() => setMarqueeModal(false)}
                      >
                        Cancle
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        style={{ backgroundColor: "#73d13d" }}
                        type="primary"
                        htmlType="submit"
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            </Row>
          </Card>
        </Modal>
      </div>
    </>
  );
};

export default AdminPage;
