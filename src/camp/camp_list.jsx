import { Space, Table, Modal, Form, Input, Spin } from "antd";
import { FaPen, FaTrash, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ButtonComponents from "../components/button";
import axios from "axios";
const CampList = () => {
  const navigate = useNavigate();
  const [camp, setCamp] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true); // Set loading to true before making the API request
      const res = await axios.get("http://127.0.0.1:8000/api/camps");
      setCamp(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading back to false after the API request is complete
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
  const data = camp.map((item, index) => ({
    key: index + 1,
    camp_id: `${item.id}`,
    title: `${item.title}`,
    price: `${rupiah(item.price * 1000)}`,
    action: (
      <div className=" flex flex-wrap gap-2 justify-center">
        <ButtonComponents
          text="Edit"
          onClick={() =>
            navigate(
              `/edit/${item.id}/${item.title}/${item.slug}/${item.price}/${item.id}`
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
          onClick={async () => {
            try {
              await axios.delete("http://127.0.0.1:8000/api/camp", {
                data: {
                  camp_id: `${item.id}`,
                },
              });
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  setTimeout(() => {
                    Swal.fire(
                      "Deleted!",
                      "Your file has been deleted.",
                      "success"
                    );
                    // Refresh halaman
                    location.reload();
                  }, 1500); // Penundaan 1 detik sebelum merefresh halaman
                }
              });

              // console.log(`${item.id}`);
            } catch (error) {
              console.log(error);
            }
          }}
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
      <Modal
        title="Add Camp"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
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

      {loading ? (
        <div className="loading flex justify-center items-center p-9">
          <Spin size="large" />
        </div>
      ) : (
        <Table columns={columns} dataSource={data} />
      )}
    </>
  );
};
export default CampList;
