// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Divider, Input, Button } from "antd";
// import SidebarHome from "../../../../components/Layout/DefaultLayout/Sidebar/User/SidebarHome";
// import HeaderUser from "../../../../components/Layout/DefaultLayout/Header/HeaderUser/HeaderUser";
// import { Footer } from "antd/es/layout/layout";
// import SidebarSettingProject from "../../../../components/Layout/DefaultLayout/Sidebar/User/SideBarSettingProject";
// import "../ProjectSetting.css";
// import "./ProjectDetails.css";
// const { TextArea } = Input;
// const ProjectDetails = () => {
//   const [projectDetails, setProjectDetails] = useState([]);

//   useEffect(() => {
//     const projectId = sessionStorage.getItem("projectId"); // Lấy projectId từ session
//     console.log(projectId);
//     if (projectId) {
//       handleProjectClick(projectId);
//     }
//   }, []);

//   const handleProjectClick = async (projectId) => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_URL}/api/project-management/projects/info/${projectId}`
//       );
//       setProjectDetails(response.data);
//       console.log(response);
//     } catch (error) {
//       console.error("Error fetching project data:", error);
//     }
//   };

//   return (
//     <>
//       <div className="Container">
//         <HeaderUser />
//         <div className="HomeUser">
//           <SidebarHome />
//           <SidebarSettingProject />
//           <br />
//           {projectDetails.map((project) => (
//             <div className="hihi">
//               <div>
//                 <span className="title">Name : </span>
//                 <span className="content">{project.projectName}</span>
//               </div>
//               <div>
//                 <span className="title">Description:</span>

//                 <span className="content">{project.description}</span>
//               </div>

//               <div>
//                 <span className="title">Start Date : </span>
//                 <span className="content" format="DD/MM/YYYY">
//                   {project.startDate}
//                 </span>
//               </div>
//               <div>
//                 <span className="title">End Date : </span>
//                 <span className="content" format="DD/MM/YYYY">
//                   {project.endDate}
//                 </span>
//               </div>

//               <div>
//                 <span className="title">Privacy:</span>

//                 <span className="content">
//                   {project.privacyStatus ? "Public" : "Private"}
//                 </span>
//               </div>
//               <br />
//               <Button style={{ margin: "20px" }}>Edit</Button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* <div>
//         <div>
//           <Divider className="divider-custom" />
//         </div>
//         <div className="FooterUser">
//           <Divider className="divider-custom" />
//           <Footer />
//         </div>
//       </div> */}
//     </>
//   );
// };

// export default ProjectDetails;
