import { useEffect, useMemo, useState } from "react";
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
  InputNumber,
  DatePicker,
  Spin,
  Select,
  Checkbox,
} from "antd";
import {
  UploadOutlined,
  DeleteFilled,
  PlusOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  AdminPanelSettings,
  Edit,
  Facebook,
  ImageAspectRatio,
  LocalOffer,
  RowingOutlined,
  TextSnippet,
  WebStories,
} from "@mui/icons-material";
import styles from "./admin.module.scss";
import logo from "../../assets/Polo_Logo_Png[1] 1.png";
import image from "../../assets/image.png";
import axios from "axios";
import { useSelector } from "react-redux";
import { AuthStateType } from "../../Redux/AuthSlice";
import { RootState } from "../../Redux/Store";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { CountryFlags } from "../Header";

const AdminPage = () => {
  type offerType = {
    title: string;
    description: string;
    discount_percentage: number;
    valid_from: string;
    valid_until: string;
    id: number;
    image_base64: string;
    visible: boolean;
  };

  type SocialMediaType = {
    id: number;
    link: string;
    image_base64: string;
  };

  const BASEURL = import.meta.env.VITE_BASEURL;
  const [modalType, setModalType] = useState("bannerimage");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isAddAgents, setIsAddAgents] = useState(false);
  const [isAddblogs, setIsAddBlogs] = useState(false);
  const [agents, setAgents] = useState([]);
  const [imageModal, setImageModal] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [reels, setReels] = useState([]);
  const [reelModal, setReelModal] = useState(false);
  const [webSites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [marqueeModal, setMarqueeModal] = useState(false);
  const [text, setText] = useState([]);
  const [webSiteModal, setWebsiteModal] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [offers, setOffers] = useState<[offerType]>();
  const [socialMedia, setSocialMedia] = useState<[SocialMediaType]>();
  const [offerModal, setOfferModal] = useState<boolean>(false);
  const [socialModal, setSocialModal] = useState<boolean>(false);
  const [editModal, setEditMOdal] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<any>();
  const [offerVisible, setOfferVisible] = useState<boolean>();
  const [adminData, setAdminData] = useState<any>();
  const [adminModal, setAdminModal] = useState<boolean>();
  const [globalStopModal, setGlobalStopModal] = useState<boolean>(false);
  const [deleteValue, setDeletevalue] = useState<any>();
  const [countries, setCountries] = useState<[CountryFlags]>([
    {
      name: "IN",
      flag: "https://cdn.countryflags.com/thumbs/india/flag-400.png",
      dial_code: "+91",
    },
  ]);
  const GETREELSURL: string = `${BASEURL}/reels/get-reels/`;
  const GETBLOGSURL: string = `${BASEURL}/blogs/`;
  const GETIMAGELINK: string = `${BASEURL}/imagelink/items/`;
  const GETTEXTURL: string = `${BASEURL}/marqueetext/statements`;
  const GETUSERURL: string = `${BASEURL}/user/get_all_users`;
  const GETADMINIMAGEURL: string = `${BASEURL}/bannerimage/images`;
  const CREATEBLOGSURL: string = `${BASEURL}/blogs/create_blogs`;
  const GETOFFERURL: string = `${BASEURL}/offers/`;
  const GETSOCIALMEDIAURL: string = `${BASEURL}/socialmedia/items/`;
  const DELETEIMAGEURL: string = `${BASEURL}/bannerimage/delete_image/`;
  const DELETEBLOGSURL: string = `${BASEURL}/blogs/`;
  const DELETEOFFERURL: string = `${BASEURL}/offers/`;
  const DELETESOCIALURL: string = `${BASEURL}/socialmedia/items/`;
  const DELETEAGENTURL: string = `${BASEURL}/user/delete_user_by_phone_number/`;
  const DELETEWEBSITEURl: string = `${BASEURL}/imagelink/items/`;
  const DELETEREELURL: string = `${BASEURL}/reels/delete-reel/`;
  const DELETEMARQUEEURL: string = `${BASEURL}/marqueetext/delete-statement/`;
  const EDITSOCIALURL: string = `${BASEURL}/socialmedia/items/`;
  const GETADMINURL: string = `${BASEURL}/superadmin/`;
  const CREATEADMINURL: string = `${BASEURL}/superadmin/create_admins`;
  const DELETEADMINURL: string = `${BASEURL}/superadmin/`;
  const AUTH: AuthStateType = useSelector((state: RootState) => state.auth);
  const [MarqeeForm] = Form.useForm();
  const [ClientForm] = Form.useForm();
  const [BlogForm] = Form.useForm();
  const [form] = Form.useForm();
  const [offerForm] = Form.useForm();
  const [socialForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [adminForm] = Form.useForm();

  const permissionsData = {
    blog: { delete: false, read: true, write: false },
    reels: { delete: false, read: true, write: false },
    user: { delete: false, read: true, write: false },
    bannerimage: { delete: false, read: true, write: false },
    marqueetext: { delete: false, read: true, write: false },
    imagelink: { delete: false, read: true, write: false },
    offers: { delete: false, read: true, write: false },
  };

  const webSiteColums = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: number) => <span style={{ color: "white" }}>{text}</span>,
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (text: string) => <span style={{ color: "white" }}>{text}</span>,
    },
    {
      title: "Image",
      key: "image_base64",
      dataIndex: "image_base64",
      render: (_: any, record: any) => (
        <img
          src={`data:image/png;base64,${record.image_base64}`}
          alt={record.link}
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
          onClick={() => handleDelete(record, "websites")}
        />
      ),
    },
  ];

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
          onClick={() => handleDelete(record, "marquee")}
        />
      ),
    },
  ];

  const offersColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: number) => <span style={{ color: "white" }}>{text}</span>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <span style={{ color: "white" }}>{text}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string) => <span style={{ color: "white" }}>{text}</span>,
    },
    {
      title: "Discount Percentage",
      dataIndex: "discount_percentage",
      key: "discount_percentage",
      render: (text: number) => <span style={{ color: "white" }}>{text}</span>,
    },
    {
      title: "Valid From",
      dataIndex: "valid_from",
      key: "valid_from",
      render: (text: string) => <span style={{ color: "white" }}>{text}</span>,
    },
    {
      title: "Valid Until",
      dataIndex: "valid_until",
      key: "valid_until",
      render: (text: string) => <span style={{ color: "white" }}>{text}</span>,
    },
    {
      title: "Image",
      key: "image_base64",
      dataIndex: "image_base64",
      render: (_: any, record: any) => (
        <img
          src={`data:image/png;base64,${record.image_base64}`}
          alt={record.title}
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
          onClick={() => handleDelete(record, "offers")}
        />
      ),
    },
  ];

  const socialMediaColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: number) => <span style={{ color: "white" }}>{text}</span>,
    },
    {
      title: "Description",
      dataIndex: "link",
      key: "link",
      render: (text: string) => <span style={{ color: "white" }}>{text}</span>,
    },
    {
      title: "Image",
      key: "image_base64",
      dataIndex: "image_base64",
      render: (_: any, record: any) => (
        <img
          src={`data:image/png;base64,${record.image_base64}`}
          alt={record.title}
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
          onClick={() => handleDelete(record, "socialMedia")}
        />
      ),
    },
    {
      title: "Action",
      key: "edit_action",
      render: (_: any, record: any) => (
        <Button
          style={{ color: "white" }}
          type="text"
          icon={<Edit />}
          onClick={() => {
            setSelectedRecord(record);
            setEditMOdal(true);
          }}
        />
      ),
    },
  ];

  const Options = [
    {
      key: "bannerimage",
      icon: <ImageAspectRatio />,
      label: "Manage Banners",
    },
    {
      key: "user",
      icon: <RowingOutlined />,
      label: "Manage Clients",
    },
    { key: "blog", icon: <DeleteFilled />, label: "Manage Blogs" },
    {
      key: "reels",
      icon: <VideoCameraOutlined />,
      label: "Manage Reels",
    },
    {
      key: "admin",
      icon: <AdminPanelSettings />,
      label: "Manage admin",
    },
    {
      key: "marqueetext",
      icon: <TextSnippet />,
      label: "Manage Marquee",
    },
    {
      key: "imagelink",
      icon: <WebStories />,
      label: "Manage Websites",
    },
    {
      key: "offers",
      icon: <LocalOffer />,
      label: "Offers",
    },
    {
      key: "socialMedia",
      icon: <Facebook />,
      label: "Social Media",
    },
  ];

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
          onClick={() => handleDelete(getLastSegment(record), "reels")}
        />
      ),
    },
  ];

  const AdminColums = [
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
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
      render: (text: string) => (
        <span style={{ color: "white" }}>{`${text}`}</span>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
          onClick={() => handleDelete(record, "admin")}
        />
      ),
    },
  ];

  const AdminPanelCol = [
    {
      title: "Module",
      dataIndex: "module",
      key: "module",
    },
    {
      title: "Read",
      dataIndex: "read",
      key: "read",
      render: (value: boolean) => (value ? "✅" : "❌"),
    },
    {
      title: "Write",
      dataIndex: "write",
      key: "write",
      render: (value: boolean) => (value ? "✅" : "❌"),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      render: (value: boolean) => (value ? "✅" : "❌"),
    },
  ];

  const exportToExcel = (data: any[], fileName: string) => {
    const keysToRemove = ["website_id", "website_password"];
    const newData = data?.map((item: any) => {
      const newObject = Object.fromEntries(
        Object.entries(item)?.filter(([key]) => !keysToRemove?.includes(key))
      );
      return newObject;
    });
    const worksheet = XLSX.utils.json_to_sheet(newData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    // Use FileSaver.js to trigger the file download
    saveAs(dataBlob, `${fileName}.xlsx`);
  };

  const handleEdit = async (record: any) => {
    try {
      setLoading(true);

      if (!selectedRecord?.id) {
        message.error("Invalid record selected!");
        return;
      }
      const formData = new FormData();
      formData.append("link", record.link);

      const response = await axios.put(
        `${EDITSOCIALURL}${selectedRecord.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${AUTH?.token}`,
          },
        }
      );

      if (response.status === 200) {
        message.success("Updated record!");
        getData(GETSOCIALMEDIAURL, "socialMedia");
        editForm.resetFields(); // Only reset if update is successful
        setEditMOdal(false);
      }
    } catch (error: any) {
      console.error("API Error:", error?.response?.data || error);
      message.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const validateUser = (type: string) => {
    if (
      (AUTH.permissions[type]?.read === true &&
        AUTH.permissions[type]?.write === true &&
        AUTH.permissions[type]?.delete === true) ||
      AUTH?.user === "Superadmin"
    ) {
      if (AUTH?.user !== "Superadmin" && type === "admin") {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  const openModal = (type: any) => {
    setModalType(type);
    switch (type) {
      case "bannerimage":
        getData(GETADMINIMAGEURL, "images");
        break;
      case "user":
        getData(GETUSERURL, "agents");
        break;
      case "blog":
        getData(GETBLOGSURL, "blogs");
        break;
      case "reels":
        getData(GETREELSURL, "reels");
        break;
      case "marqueetext":
        getData(GETTEXTURL, "marqueetext");
        break;
      case "imagelink":
        getData(GETIMAGELINK, "imagelink");
        break;
      case "offers":
        getData(GETOFFERURL, "offers");
        break;
      case "socialMedia":
        getData(GETSOCIALMEDIAURL, "socialMedia");
        break;
      case "admin":
        getData(GETADMINURL, "admin");
        break;
      default:
        console.warn(`Unhandled type: ${type}`);
    }
  };

  const getData = async (url: string, type: string) => {
    try {
      setLoading(true);
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${AUTH?.token}`,
        },
      });
      if (response?.status === 200) {
        const data = response.data;
        switch (type) {
          case "images":
            setUploadedImages(data);
            break;
          case "agents":
            setAgents(data);
            break;
          case "blogs":
            setBlogs(data);
            break;
          case "reels":
            setReels(data);
            break;
          case "marqueetext":
            setText(data);
            break;
          case "imagelink":
            setWebsites(data);
            break;
          case "offers":
            setOffers(data);
            const visibleData = data?.filter(
              (ele: any) => ele?.visible === true
            );
            setOfferVisible(visibleData?.length === data?.length);
            break;
          case "socialMedia":
            setSocialMedia(data);
            break;
          case "admin":
            setAdminData(data);
            break;
          default:
            console.warn(`Unhandled type: ${type}`);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createData = async (values: any, url: string, type: string) => {
    try {
      const response = await axios.post(url, values, {
        headers: {
          Authorization: `Bearer ${AUTH?.token}`,
        },
      });
      if (response?.status === 200) {
        message.success("Added Blogs SuccessFully");
        switch (type) {
          case "images":
            break;
          case "agents":
            break;
          case "blogs":
            getData(GETBLOGSURL, "blogs");
            setIsAddBlogs(false);
            break;
          case "reels":
            break;
          case "marqueetext":
            break;
          case "imagelink":
            break;
          default:
            console.warn(`Unhandled type: ${type}`);
        }
        getData(GETBLOGSURL, "blogs");
        setIsAddBlogs(false);
        form.resetFields();
      }
    } catch (error) {
      console.error(error);
    } finally {
      form.resetFields();
    }
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${BASEURL}/bannerimage/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${AUTH?.token}`,
          },
        }
      );

      if (response.status === 200) {
        getData(GETADMINIMAGEURL, "images");
        message.success("Banner uploaded successfully!");
      } else {
        message.error("Failed to upload Banner. Please try again.");
      }
    } catch (error: any) {
      console.error("Error uploading Banner:", error);
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
        `${BASEURL}/reels/upload-reel/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${AUTH?.token}`,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response, "resss");

      if (response.status === 200) {
        getData(GETREELSURL, "reels");
        message.success("Reel uploaded successfully!");
      } else {
        getData(GETREELSURL, "reels");
      }
    } catch (error: any) {
      console.log(error, "resss");
      console.error("Error uploading Reel:", error);
      getData(GETREELSURL, "reels");
    } finally {
      setReelModal(false);
      setLoading(false);
    }

    return false;
  };

  const deleteData = async (id: any, url: string) => {
    try {
      const response = await axios.delete(`${url}${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${AUTH?.token}`,
        },
      });
      if (response?.status === 200) {
        message.success("item deleted");
      }
    } catch (error) {
      console.error(error);
      message.error("unable to delete the item");
    }
  };

  const handleDelete = async (item: any, type: any) => {
    setDeletevalue({
      item,
      type,
    });
    setGlobalStopModal(true);
  };

  const handleDeleteModal = async (item: any, type: any) => {
    if (type === "images") {
      await deleteData(item?.id, DELETEIMAGEURL);
      await getData(GETADMINIMAGEURL, "images");
    } else if (type === "agents") {
      await deleteData(item?.phone_number, DELETEAGENTURL);
      await getData(GETUSERURL, "agents");
    } else if (type === "blogs") {
      await deleteData(item?.id, DELETEBLOGSURL);
      await getData(GETBLOGSURL, "blogs");
    } else if (type === "websites") {
      await deleteData(item?.id, DELETEWEBSITEURl);
      await getData(GETIMAGELINK, "imagelink");
    } else if (type === "offers") {
      await deleteData(item?.id, DELETEOFFERURL);
      await getData(GETOFFERURL, "offers");
    } else if (type === "socialMedia") {
      await deleteData(item?.id, DELETESOCIALURL);
      await getData(GETSOCIALMEDIAURL, "socialMedia");
    } else if (type === "reels") {
      await deleteData(item, DELETEREELURL);
      await getData(GETREELSURL, "reels");
    } else if (type === "marquee") {
      await deleteData(item?.id, DELETEMARQUEEURL);
      await getData(GETTEXTURL, "marqueetext");
    } else if (type === "admin") {
      await deleteData(item?.id, DELETEADMINURL);
      await getData(GETADMINURL, "admin");
    }
    setGlobalStopModal(false);
  };

  const handleAgentSubmit = async (values: any) => {
    try {
      const response = await axios.post(
        `${BASEURL}/user/create_user/`,
        values,
        {
          headers: {
            Authorization: `Bearer ${AUTH?.token}`,
          },
        }
      );
      if (response?.status === 200) {
        message.success("Added Blogs SuccessFully");
        getData(GETUSERURL, "agents");
        setIsAddAgents(false);
        form.resetFields();
      }
    } catch (error) {
      console.error(error);
      message.error("Unable to create Agent");
    }
  };

  const handleMarqueeSubmit = async (values: any) => {
    try {
      const response = await axios.post(
        `${BASEURL}/marqueetext/create-statement?content=${values?.Text}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${AUTH?.token}`, // This will now correctly be in headers
            "Content-Type": "application/json",
          },
          withCredentials: true, // Ensures credentials (cookies) are included
        }
      );

      if (response?.status === 200) {
        message.success("Added Marquee Successfully");
        getData(GETTEXTURL, "marqueetext");
        setMarqueeModal(false);
        form.resetFields();
      }
    } catch (error) {
      console.error("Error creating marquee:", error);
      message.success("Added Marquee Successfully");
      setMarqueeModal(false);
      getData(GETTEXTURL, "marqueetext");
    }
  };

  const handleFileChange = (file: File) => {
    setImageFile(file);
    message.success(`${file.name} selected successfully.`);
  };

  const handleLinkSubmit = async (values: { link: string }) => {
    if (!imageFile) {
      message.error("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("link", values.link);
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        `${BASEURL}/imagelink/create_items/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${AUTH?.token}`,
          },
        }
      );

      if (response.status === 200) {
        getData(GETIMAGELINK, "imagelink");
        message.success("Data uploaded successfully!");
      }
    } catch (error) {
      message.error("Failed to upload data.");
      console.error(error);
    } finally {
      setWebsiteModal(false);
      setLoading(false);
    }
  };

  const handleSocialSubmit = async (values: any) => {
    try {
      const link = values?.link;
      const formData = new FormData();
      if (values?.image_base64?.fileList?.length > 0) {
        const imageFile = values.image_base64.fileList[0].originFileObj;
        formData.append("image", imageFile);
      }

      formData.append("link", link);

      const response = await axios.post(
        `${BASEURL}/socialmedia/create_items/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${AUTH?.token}`,
          },
        }
      );

      if (response.status === 200) {
        getData(GETSOCIALMEDIAURL, "socialMedia");
        message.success("Data uploaded successfully!");
      }
    } catch (error) {
      message.error("Failed to upload data.");
      console.error(error);
    } finally {
      setSocialModal(false);
      socialForm.resetFields();
    }
  };

  const handleOfferSubmit = async (values: any) => {
    try {
      const title = values?.title;
      const description = values?.description;
      const discount_percentage = values?.discount_percentage;
      const valid_from = values?.valid_from?.format("YYYY-MM-DD");
      const valid_until = values?.valid_until?.format("YYYY-MM-DD");
      const formData = new FormData();
      if (values?.image_base64?.fileList?.length > 0) {
        const imageFile = values.image_base64.fileList[0].originFileObj;
        formData.append("image", imageFile);
      }

      const response = await axios.post(
        `${BASEURL}/offers/create?title=${title}&description=${description}&discount_percentage=${discount_percentage}&valid_from=${valid_from}&valid_until=${valid_until}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${AUTH?.token}`,
          },
        }
      );

      if (response.status === 200) {
        getData(GETOFFERURL, "offers");
        message.success("Data uploaded successfully!");
      }
    } catch (error) {
      message.error("Failed to upload data.");
      console.error(error);
    } finally {
      setOfferModal(false);
      offerForm.resetFields();
    }
  };

  const beforeUpload = (file: any) => {
    handleFileChange(file);
    if (file) {
    }
    return false;
  };

  const handleAdminSubmit = async (record: any) => {
    try {
      setLoading(true);
      const updatedData = {
        ...record,
        country_code: record?.country_code?.replace("+", ""),
      };
      const response = await axios.post(CREATEADMINURL, updatedData, {
        headers: {
          Authorization: `Bearer ${AUTH?.token}`,
        },
      });
      if (response.status === 200) {
        message.success("created admin");
        getData(GETADMINURL, "admin");
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong !");
    } finally {
      setLoading(false);
      adminForm.resetFields();
      setAdminModal(false);
    }
  };

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

  const handleOfferVisibility = async () => {
    try {
      setLoading(true);
      const res = await axios?.put(
        `${BASEURL}/offers/visibility/all`,
        {
          visible: !offerVisible,
        },
        {
          headers: {
            Authorization: `Bearer ${AUTH?.token}`,
          },
        }
      );
      if (res?.status === 200) {
        message.success("updated !");
        getData(GETOFFERURL, "offers");
      }
    } catch (error) {
      console.error(error);
      message.error("unable to change the offer state");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(GETADMINIMAGEURL, "images");
  }, []);

  useEffect(() => {
    editForm.setFieldsValue({ link: selectedRecord?.link || "abc" });
  }, [selectedRecord, form]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const [flagsRes, codesRes] = await Promise.all([
          axios.get(
            "https://countriesnow.space/api/v0.1/countries/flag/images"
          ),
          axios.get("https://countriesnow.space/api/v0.1/countries/codes"),
        ]);

        const mergedData: [CountryFlags] = flagsRes.data.data.map(
          (flag: any) => {
            const codeData = codesRes.data.data.find(
              (code: any) => code.name === flag.name
            );
            return {
              name: codeData?.code,
              flag: flag.flag,
              dial_code: codeData ? codeData.dial_code : "",
            };
          }
        );

        setCountries(mergedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCountries();
  }, []);

  const options = useMemo(
    () =>
      countries?.map((country: CountryFlags) => ({
        value: country.dial_code,
        label: (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img
              src={country.flag}
              alt={country.name}
              width="20"
              height="15"
              style={{ borderRadius: "2px" }}
              loading="lazy"
            />
            {country.name} ({country.dial_code})
          </div>
        ),
      })),
    [countries]
  );

  return (
    <Spin spinning={loading}>
      <div className={styles.adminWrapper}>
        <div className={styles.contentPage}>
          <Row
            className={styles.AdminOverView}
            style={{
              display: "flex",
              flexWrap: "wrap",
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
                fontSize: "clamp(16px, 2vw, 22px)",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              <Row>Hey {AUTH?.userName} !!</Row>
              <Row>Manage All your Blogs, Agents, and News from here.</Row>
              <Row
                style={{
                  color: "red",
                  fontWeight: "600",
                  fontSize: "clamp(20px, 3vw, 25px)",
                }}
              >
                {AUTH?.user === "Superadmin" ? "SUPERADMIN" : "Admin"}
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
            {Options?.filter((item: any) => {
              if (validateUser(item.key)) {
                return item;
              }
            }).map((tab) => (
              <Col
                key={tab.key}
                onClick={() => openModal(tab.key)}
                className={`${styles.Btn} ${
                  modalType === tab.key ? styles.active : styles.inactive
                }`}
                xs={10}
                sm={6}
                md={4}
                lg={2}
              >
                <Row justify="center">
                  <div className={styles.Icon}>{tab.icon}</div>
                </Row>
                <Row justify="center">
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
                {modalType === "bannerimage" && (
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

                {modalType === "user" && (
                  <>
                    {
                      <Row
                        justify={"end"}
                        style={{ marginTop: "2vh", marginBottom: "2vh" }}
                      >
                        <Button
                          style={{ marginRight: "2dvw" }}
                          type="primary"
                          onClick={() => exportToExcel(agents, "UserData")}
                        >
                          Export as excel
                        </Button>

                        <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => setIsAddAgents(true)}
                        >
                          Add user
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
                          form={ClientForm}
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

                {modalType === "blog" && (
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

                {modalType === "reels" && (
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
                    {reels && reels?.length > 0 && (
                      <Table
                        dataSource={reels || []}
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
                    )}
                  </>
                )}

                {modalType === "marqueetext" && (
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
                          Add Marquee
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

                {modalType === "imagelink" && (
                  <>
                    {
                      <Row
                        justify={"end"}
                        style={{ marginTop: "2vh", marginBottom: "2vh" }}
                      >
                        <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => setWebsiteModal(true)}
                        >
                          Add Websites
                        </Button>
                      </Row>
                    }
                    <Table
                      dataSource={webSites}
                      columns={webSiteColums}
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

                {modalType === "offers" && (
                  <>
                    {
                      <Row
                        justify={"end"}
                        style={{ marginTop: "2vh", marginBottom: "2vh" }}
                      >
                        <Button
                          type="primary"
                          style={{ marginRight: "3dvw" }}
                          onClick={() => handleOfferVisibility()}
                        >
                          {`Turn ${offerVisible ? "Off" : "On"} Offers`}
                        </Button>
                        <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => setOfferModal(true)}
                        >
                          Add offers
                        </Button>
                      </Row>
                    }
                    <Table
                      dataSource={offers}
                      columns={offersColumns}
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

                {modalType === "socialMedia" && (
                  <>
                    {
                      <Row
                        justify={"end"}
                        style={{ marginTop: "2vh", marginBottom: "2vh" }}
                      >
                        <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => setSocialModal(true)}
                        >
                          Add Social
                        </Button>
                      </Row>
                    }
                    <Table
                      dataSource={socialMedia}
                      columns={socialMediaColumns}
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

                {modalType === "admin" && (
                  <>
                    {
                      <Row
                        justify={"end"}
                        style={{ marginTop: "2vh", marginBottom: "2vh" }}
                      >
                        <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => setAdminModal(true)}
                        >
                          Add Admins
                        </Button>
                      </Row>
                    }
                    <Table
                      dataSource={adminData}
                      columns={AdminColums}
                      rowKey="id"
                      expandable={{
                        expandedRowRender: (record: any) => {
                          const permissionData = Object.entries(
                            record.permissions || {}
                          ).map(([key, value]: [string, any]) => ({
                            key,
                            module: key.charAt(0).toUpperCase() + key.slice(1),
                            ...value,
                          }));

                          return (
                            <Table
                              columns={AdminPanelCol}
                              dataSource={permissionData}
                              pagination={false}
                              size="small"
                            />
                          );
                        },
                        rowExpandable: (record: any) => !!record.permissions,
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
                        msOverflowStyle: "none",
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
              form={BlogForm}
              onFinish={(values) => createData(values, CREATEBLOGSURL, "blogs")}
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
                form={MarqeeForm}
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
        <Modal
          open={webSiteModal}
          onCancel={() => setWebsiteModal(false)}
          onClose={() => setWebsiteModal(false)}
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
            <Row justify="center">
              <Form
                style={{ color: "white", marginTop: "3vh" }}
                form={form}
                onFinish={handleLinkSubmit}
              >
                <Form.Item
                  name="link"
                  label="Link"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the Link here!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Text" />
                </Form.Item>
                <Row justify="center">
                  <Upload
                    beforeUpload={(file) => {
                      handleFileChange(file);
                      return false; // Prevent auto-upload
                    }}
                    showUploadList={true}
                  >
                    <Button
                      style={{ color: "white", marginTop: "5vh" }}
                      icon={<UploadOutlined />}
                    >
                      Upload Image
                    </Button>
                  </Upload>
                </Row>
                <Form.Item>
                  <Row justify="space-between">
                    <Col>
                      <Button type="primary" onClick={() => form.resetFields()}>
                        Cancel
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
        <Modal
          open={offerModal}
          onCancel={() => setOfferModal(false)}
          onClose={() => setOfferModal(false)}
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
            <Row justify="center">
              <Form
                form={offerForm}
                onFinish={handleOfferSubmit}
                layout="vertical"
                style={{ color: "white", marginTop: "3vh" }}
              >
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[{ required: true, message: "Please enter a title!" }]}
                >
                  <Input placeholder="Enter Title" />
                </Form.Item>

                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    { required: true, message: "Please enter a description!" },
                  ]}
                >
                  <Input.TextArea placeholder="Enter Description" rows={3} />
                </Form.Item>

                <Form.Item
                  name="discount_percentage"
                  label="Discount Percentage"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a discount percentage!",
                    },
                  ]}
                >
                  <InputNumber
                    style={{ width: "100%", color: "white" }}
                    min={0}
                    max={100}
                    placeholder="Enter Discount Percentage"
                    formatter={(value) => `${value}%`}
                    parser={(value: any) => value.replace("%", "")}
                  />
                </Form.Item>

                <Form.Item
                  name="valid_from"
                  label="Valid From"
                  rules={[
                    { required: true, message: "Please select a start date!" },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                  name="valid_until"
                  label="Valid Until"
                  rules={[
                    { required: true, message: "Please select an end date!" },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>

                <Row justify={"center"}>
                  <Form.Item name="image_base64">
                    <Upload
                      style={{ color: "white !important" }}
                      beforeUpload={beforeUpload}
                      showUploadList={true}
                    >
                      <Button>Upload image</Button>
                    </Upload>
                  </Form.Item>
                </Row>

                <Form.Item>
                  <Row justify="space-between">
                    <Col>
                      <Button
                        type="default"
                        onClick={() => offerForm.resetFields()}
                      >
                        Cancel
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ backgroundColor: "#73d13d" }}
                        onClick={() => {
                          console.log("testtt.....");
                        }}
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
        <Modal
          open={socialModal}
          onCancel={() => setSocialModal(false)}
          onClose={() => setSocialModal(false)}
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
            <Row justify="center">
              <Form
                form={socialForm}
                onFinish={handleSocialSubmit}
                layout="vertical"
                style={{ color: "white", marginTop: "3vh" }}
              >
                <Form.Item
                  name="link"
                  label="Link"
                  rules={[
                    { required: true, message: "Please enter the link!" },
                  ]}
                >
                  <Input placeholder="Enter Link" />
                </Form.Item>

                <Row justify={"center"}>
                  <Form.Item name="image_base64">
                    <Upload
                      style={{ color: "white !important" }}
                      showUploadList={true}
                      beforeUpload={beforeUpload}
                    >
                      <Button>Upload image</Button>
                    </Upload>
                  </Form.Item>
                </Row>

                <Form.Item>
                  <Row justify="space-between">
                    <Col>
                      <Button
                        type="default"
                        onClick={() => socialForm.resetFields()}
                      >
                        Cancel
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ backgroundColor: "#73d13d" }}
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
        <Modal
          open={editModal}
          onCancel={() => setEditMOdal(false)}
          onClose={() => setEditMOdal(false)}
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
            <Row justify="center">
              <Form form={editForm} onFinish={handleEdit}>
                <Form.Item
                  name="link"
                  label="Link"
                  rules={[
                    { required: true, message: "Please enter the link!" },
                  ]}
                >
                  <Input placeholder="Enter Link" />
                </Form.Item>
                <Form.Item>
                  <Row justify="space-between" style={{ marginTop: "5vh" }}>
                    <Col>
                      <Button
                        type="default"
                        onClick={() => editForm.resetFields()}
                      >
                        Cancel
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ backgroundColor: "#73d13d" }}
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
        <Modal
          open={adminModal}
          onCancel={() => setAdminModal(false)}
          onClose={() => setAdminModal(false)}
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
            <Row justify="center">
              <Form
                form={adminForm}
                onFinish={handleAdminSubmit}
                initialValues={{
                  country_code: "+91",
                  permissions: {
                    blog: {
                      delete: false,
                      read: true,
                      write: false,
                    },
                    reels: {
                      delete: false,
                      read: true,
                      write: false,
                    },
                    user: {
                      delete: false,
                      read: true,
                      write: false,
                    },
                    bannerimage: {
                      delete: false,
                      read: true,
                      write: false,
                    },
                    marqueetext: {
                      delete: false,
                      read: true,
                      write: false,
                    },
                    imagelink: {
                      delete: false,
                      read: true,
                      write: false,
                    },
                    offers: {
                      delete: false,
                      read: true,
                      write: false,
                    },
                  },
                }}
              >
                <Row justify={"space-around"}>
                  <Col span={10}>
                    <Form.Item
                      name="country_code"
                      label="Code"
                      rules={[
                        {
                          required: true,
                          message: "Please select a country code!",
                        },
                      ]}
                    >
                      {loading ? (
                        <Spin />
                      ) : (
                        <Select
                          defaultValue="+91"
                          placeholder="IN +91"
                          showSearch
                          optionFilterProp="label"
                          filterOption={(input, option) =>
                            option?.label.props.children
                              .join("")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={options}
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="phone_number"
                      label="Phone Number"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="9999999999" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"center"}>
                  <Col span={23}>
                    <Form.Item
                      name="name"
                      label="name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter e!",
                        },
                      ]}
                    >
                      <Input placeholder="your name" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="center">
                  <Col span={23}>
                    <h3>Permissions</h3>
                    {Object.entries(permissionsData).map(([key, value]) => (
                      <Row
                        key={key}
                        gutter={16}
                        style={{ marginBottom: "8px" }}
                      >
                        <Col span={6}>
                          <strong>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </strong>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            name={["permissions", key, "read"]}
                            valuePropName="checked"
                          >
                            <Checkbox
                              defaultChecked={value.read}
                              style={{ color: "white" }}
                            >
                              Read
                            </Checkbox>
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            name={["permissions", key, "write"]}
                            valuePropName="checked"
                          >
                            <Checkbox
                              defaultChecked={value.write}
                              style={{ color: "white" }}
                            >
                              Write
                            </Checkbox>
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            name={["permissions", key, "delete"]}
                            valuePropName="checked"
                          >
                            <Checkbox
                              defaultChecked={value.delete}
                              style={{ color: "white" }}
                            >
                              Delete
                            </Checkbox>
                          </Form.Item>
                        </Col>
                      </Row>
                    ))}
                  </Col>
                </Row>
                <Form.Item>
                  <Row justify="space-between" style={{ marginTop: "5vh" }}>
                    <Col>
                      <Button
                        type="default"
                        onClick={() => {
                          adminForm.resetFields();
                          setAdminModal(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ backgroundColor: "#73d13d" }}
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
        <Modal
          open={globalStopModal}
          onCancel={() => setGlobalStopModal(false)}
          onClose={() => setGlobalStopModal(false)}
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
            <h4
              style={{ color: "white", fontFamily: "Popins", fontWeight: 600 }}
            >
              You have opt to delete this record , please proceed with yes if
              you want to delete it .
            </h4>
            <Row gutter={[20, 20]} justify={"space-between"}>
              <Button type="primary" onClick={() => setGlobalStopModal(false)}>
                Cancel
              </Button>

              <Button
                style={{ backgroundColor: "#73d13d" }}
                type="default"
                onClick={() =>
                  handleDeleteModal(deleteValue?.item, deleteValue?.type)
                }
              >
                Yes
              </Button>
            </Row>
          </Card>
        </Modal>
      </div>
    </Spin>
  );
};

export default AdminPage;
