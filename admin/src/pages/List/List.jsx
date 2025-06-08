import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
const List = () => {
  const url = "http://localhost:4000";

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message || "Item deleted successfully");
        // Update the list after deletion
        setList(list.filter(item => item._id !== id));
      } else {
        toast.error(response.data.message || "Failed to delete item");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred while deleting the item");
    }
  };

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className="delete-action" onClick={() => handleDelete(item._id)}>X</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
