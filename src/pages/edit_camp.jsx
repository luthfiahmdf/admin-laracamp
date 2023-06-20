import { Card, Form, Input } from "antd";
import axios from "axios";
import ButtonComponents from "../components/button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const EditCamp = () => {
  const { id } = useParams();
  const { title } = useParams();
  const { slug } = useParams();
  const { price } = useParams();
  const navigate = useNavigate();
  const initialValues = {
    title: `${title}`,
    slug: `${slug}`,
    price: `${price}`,
  };
  const onFinish = async (values) => {
    const transformedValues = {
      ...values,
      price: parseInt(values.price),
    };
    try {
      const post = await axios.patch(
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
  return (
    <div className="slice bg-slate-600 w-full h-screen flex justify-center ">
      <div className="layout h-screen flex items-center ">
        <Card
          title="Edit Camp"
          bordered={false}
          style={{
            width: 300,
          }}
        >
          <Form
            name="basic"
            initialValues={initialValues}
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
            //   onFinishFailed={onFinishFailed}
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

            <Form.Item wrapperCol={{}}>
              <div className="grid grid-cols-2 space-x-3">
                <ButtonComponents
                  text="Cancel"
                  onClick={() => navigate("/")}
                  className="text-white bg-rose-700"
                />
                <ButtonComponents
                  text="Submit"
                  className="text-white bg-blue-500"
                />
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};
export default EditCamp;
