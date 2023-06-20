import { Space, Table, Modal, Button, Form, Input } from "antd";
import { FaPen, FaTrash, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ButtonComponents from "../components/button";
import axios from "axios";
const CampList = () => {
  const navigate = useNavigate();
  const [camp, setCamp] = useState([]);
  const getData = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/camps");
      setCamp(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (camp_id) => {
    try {
      await axios.delete("http://127.0.0.1:8000/api/camp", camp_id);
    } catch (error) {
      console.log(error);
    }
  };

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
  const data = camp.map((item) => ({
    key: `${item.id}`,
    title: `${item.title}`,
    price: `${rupiah(item.price * 1000)}`,
    action: (
      <div className=" flex flex-wrap gap-2 justify-center">
        <ButtonComponents
          text="Edit"
          onClick={() =>
            navigate(
              `/edit/${item.id}/${item.title}/${item.slug}/${item.price}`
            )
          }
          icons={<FaPen />}
          className="text-white bg-slate-700"
          //   onClick={modalupdate}
        />
        <ButtonComponents
          text="Delete"
          icons={<FaTrash />}
          className="text-white bg-rose-700"
          onClick={handleDelete}
        />
      </div>
    ),
  }));

  const columns = [
    {
      title: "No",
      dataIndex: "key",
      key: "id",

      ellipsis: true,
    },
    {
      title: "Nama Camp",
      dataIndex: "title",
      key: "title",

      ellipsis: true,
    },
    {
      title: "Harga",
      dataIndex: "price",
      key: "price",

      ellipsis: true,
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values) => {
    const transformedValues = {
      ...values,
      price: parseInt(values.price),
    };
    try {
      const post = await axios.post(
        "http://127.0.0.1:8000/api/camp",
        transformedValues
      );
      Swal.fire({
        icon: "success",
        title: "Good job!",
        text: "Add Camp!",
        showCancelButton: true,
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });

      return post.data.data;
    } catch (error) {
      console.log(error);
    }
    console.log("Success:", transformedValues);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Modal title="Add Camp" open={isModalOpen} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input the title!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Slug"
            name="slug"
            rules={[
              {
                required: true,
                message: "Please input the slug!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input the price!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <ButtonComponents
              text="Submit"
              className="text-white bg-blue-500"
            />
          </Form.Item>
        </Form>
      </Modal>
      <div className="header flex flex-wrap justify-between p-2">
        <h1 className="text-2xl text-slate-700 ">Camp List</h1>
        <ButtonComponents
          text="Add Camp"
          icons={<FaPlus />}
          onClick={showModal}
          className="text-white bg-emerald-500"
        />
      </div>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        {/* <Button onClick={setAgeSort}>Sort age</Button>
            <Button onClick={clearFilters}>Clear filters</Button>
            <Button onClick={clearAll}>Clear filters and sorters</Button> */}
      </Space>
      <Table columns={columns} dataSource={data} />
    </>
  );
};
export default CampList;
