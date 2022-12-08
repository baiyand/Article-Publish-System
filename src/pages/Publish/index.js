import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./index.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { http } from "@/utils";
import { useRef, useEffect } from "react";

const Publish = () => {
  const [fileList, setFileList] = useState([]);

  const onUploadChange = ({ fileList }) => {
    const formatList = fileList.map((file) => {
      if (file.response) {
        return {
          url: file.response.data.url,
        };
      }
      return file;
    });
    setFileList(formatList);
    cacheImgList.current = formatList;
  };
  const cacheImgList = useRef();

  //Change Pictures
  const [imgCount, setImgCount] = useState(1);
  const radioChange = (e) => {
    const rawValue = e.target.value;
    console.log(e.target.value);
    setImgCount(rawValue);

    if (rawValue === 1) {
      const img = cacheImgList.current ? cacheImgList.current[0] : [];
      setFileList([img]);
    } else if (rawValue === 3) {
      setFileList(cacheImgList.current);
    }
  };
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log(values);
    const { content, title, type } = values;
    const params = {
      content,
      title,
      type,
      cover: {
        type: type,
        images: fileList.map((item) => item.url),
      },
    };
    if (id) {
      await http.put(`/mp/articles/${id}?draft=false`, params);
    } else {
      await http.post("/mp/articles?draft=false", params);
    }
    navigate("/article");
    message.success(`${id ? "Update Success" : "Publish Success"}`);
  };
  //Edit Articles
  const [params] = useSearchParams();
  const id = params.get("id");
  const form = useRef();

  //Data Refill
  useEffect(() => {
    async function loadDetail() {
      const res = await http.get(`/mp/articles/${id}`);
      const data = res.data;
      form.current.setFieldsValue({ ...data, type: data.cover.type });
      const formatImgList = data.cover.images.map((url) => {
        return {
          url,
        };
      });
      setFileList(formatImgList);
      cacheImgList.current = formatImgList;
    }
    //Only when editig the article
    if (id) {
      loadDetail();
    }
  }, [id]);

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {id ? "Edit " : "Publish "}Article
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          // initialValues={{ type: 1, content: "this is content" }}
          onFinish={onFinish}
          ref={form}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input
              placeholder="Please enter the title"
              style={{ width: 400 }}
            />
          </Form.Item>

          <Form.Item label="Cover">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>Single Picture</Radio>
                <Radio value={3}>Three Piactures</Radio>
                <Radio value={0}>No Picture</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                multiple={imgCount > 1}
                maxCount={imgCount}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: "Please enter the content" }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="Please enter the content"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {id ? "Update" : "Publish"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default observer(Publish);
