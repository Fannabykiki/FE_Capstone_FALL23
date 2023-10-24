import React, { useEffect, useState } from "react";
import axios from "axios";

const ProjectDetails = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("");

  useEffect(() => {
   
    const userId = sessionStorage.getItem("userId");


    axios
      .get(`your-api-url/${userId}`)
      .then((response) => {
        const { name, description, privacy } = response.data;

        // Cập nhật state vs dữ liệu từ API
        setName(name);
        setDescription(description);
        setPrivacy(privacy);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>Name: {name}</div>
      <div>Description: {description}</div>
      <div>Privacy: {privacy}</div>
    </>
  );
};

export default ProjectDetails;