import React, { useEffect, useState } from "react";
import "./ViewPermission.css";
import { Spin, Tree, Typography } from "antd";
import { useParams } from "react-router-dom";
import { getPermissionInfo } from "../domains/ViewPermissionDomain";

const { TreeNode } = Tree;

const ViewPermission = () => {
  const { id } = useParams();
  console.log(id);
  const [permissionData, setPermissionData] = useState(null);
  const [expandedKeys, setExpandedKeys] = useState([]);

  useEffect(() => {
    const fetchPermissionData = async () => {
      try {
        const data = await getPermissionInfo(id);
        console.log(data);
        setPermissionData(data); // Cập nhật state permissionData với dữ liệu từ API
        // Tìm tất cả các khóa của nút đã mở rộng và cập nhật vào expandedKeys
        const keys = [];
        const traverse = (node) => {
          keys.push(node.permissionId);
          if (node.roles) {
            node.roles.forEach((role) => {
              keys.push(role.roleId);
            });
          }
          if (node.children) {
            node.children.forEach((child) => {
              traverse(child);
            });
          }
        };
        traverse(data);
        setExpandedKeys(keys);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPermissionData();
  }, [id]);

  const renderTreeNodes = (data) => {
    if (!data) {
      return null;
    }

    return data.map((permission) => (
      <TreeNode key={permission.permissionId} title={permission.name}>
        {permission.roles &&
          permission.roles.map((role) => (
            <TreeNode key={role.roleId} title={role.roleName} />
          ))}
      </TreeNode>
    ));
  };

  return (
    <div className="view-permission">
      <div className="form-view-permission">
        <div>
          <Typography className="titleList">Permission Info</Typography>
        </div>
        {permissionData && permissionData.rolePermissions ? (
          <Tree
            defaultExpandAll
            expandedKeys={expandedKeys}
            onExpand={(newExpandedKeys) => setExpandedKeys(newExpandedKeys)}
          >
            {renderTreeNodes(permissionData.rolePermissions)}
          </Tree>
        ) : (
          <Spin />
        )}
      </div>
    </div>
  );
};

export default ViewPermission;
