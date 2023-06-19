import { Space, Table } from "antd";
import { FaPen, FaTrash, FaPlus } from "react-icons/fa";
import ButtonComponents from "../components/button";
function CampList() {
  const handleClick = () => {
    console.log("clicked");
  };
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      action: (
        <div className=" flex flex-wrap gap-2 justify-center">
          <ButtonComponents
            text="Edit"
            icons={<FaPen />}
            className="text-white bg-slate-700"
            onClick={handleClick}
          />
          <ButtonComponents
            text="Delete"
            icons={<FaTrash />}
            className="text-white bg-rose-700"
            onClick={handleClick}
          />
        </div>
      ),
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];
  const columns = [
    {
      title: "No",
      dataIndex: "name",
      key: "name",

      ellipsis: true,
    },
    {
      title: "Nama Camp",
      dataIndex: "age",
      key: "age",

      ellipsis: true,
    },
    {
      title: "Harga",
      dataIndex: "address",
      key: "address",

      ellipsis: true,
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  return (
    <>
      <div className="header flex flex-wrap justify-between p-2">
        <h1 className="text-2xl text-slate-700 ">Camp List</h1>
        <ButtonComponents
          text="Add Camp"
          icons={<FaPlus />}
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
}

export default CampList;
