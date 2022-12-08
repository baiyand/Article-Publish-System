import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Popconfirm,
} from "antd";
import { Table, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./index.scss";
import img404 from "@/assets/error.png";
import { useEffect, useState } from "react";
import { http } from "@/utils";
import { observer } from "mobx-react-lite";

const { RangePicker } = DatePicker;

const Article = () => {
  // Articles management
  const [articleData, setArticleData] = useState({
    list: [],
    count: 0,
  });
  //Parameters management
  const [params, setParams] = useState({
    page: 1,
    per_page: 10,
    // status: 0
  });

  useEffect(() => {
    const loadList = async () => {
      const res = await http.get("/mp/articles", { params });
      console.log(res);
      const { results, total_count } = res.data;
      setArticleData({
        list: results,
        count: total_count,
      });
    };
    loadList();
  }, [params]);

  const onFinish = (values) => {
    console.log(values);
    const { status, date } = values;
    const _params = {};
    _params.status = status;
    if (date) {
      _params.begin_pubdate = date[0].format("YYYY-MM-DD");
      _params.end_pubdate = date[1].format("YYYY-MM-DD");
    }
    setParams({
      ...params,
      ..._params,
    });
  };

  const pageChange = (page) => {
    setParams({
      ...params,
      page,
    });
  };

  const delArticle = async (data) => {
    await http.delete(`/mp/articles/${data.id}`);
    // Update
    setParams({
      page: 1,
      per_page: 10,
    });
  };
  const navigate = useNavigate();
  const goPublish = (data) => {
    navigate(`/publish?id=${data.id}`);
  };

  const columns = [
    {
      title: "Cover",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        return (
          <img
            src={cover.images[0] || img404}
            width={200}
            height={150}
            alt=""
          />
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (data) => <Tag color="green">Approved</Tag>,
    },
    {
      title: "Publish Time",
      dataIndex: "pubdate",
    },
    {
      title: "Click Number",
      dataIndex: "read_count",
    },
    {
      title: "Comment",
      dataIndex: "comment_count",
    },
    {
      title: "Thumbup",
      dataIndex: "like_count",
    },
    {
      title: "Action",
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => goPublish(data)}
            />
            <Popconfirm
              title="Are you sure to delete this article?"
              onConfirm={() => delArticle(data)}
              okText="Confirm"
              cancelText="Cancel"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Content Management</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: null }} onFinish={onFinish}>
          <Form.Item label="Status" name="status">
            <Radio.Group>
              <Radio value={null}>All</Radio>
              <Radio value={0}>Draft</Radio>
              <Radio value={1}>Pending</Radio>
              <Radio value={2}>Approved</Radio>
              <Radio value={3}>Failed</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Date" name="date">
            <RangePicker></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              Filter
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <div>
        {/* Articles */}
        <Card title={`Filter ${articleData.count} results: `}>
          <Table
            rowKey="id"
            dataSource={articleData.list}
            columns={columns}
            pagination={{
              position: ["bottomCenter"],
              current: params.page,
              pageSize: params.per_page,
              onChange: pageChange,
            }}
          />
        </Card>
      </div>
    </div>
  );
};

export default observer(Article);
