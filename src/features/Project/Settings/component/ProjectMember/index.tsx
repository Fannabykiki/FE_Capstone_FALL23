import { projectApi } from "@/utils/api/project";
import { randomBgColor } from "@/utils/random";
import { UserDeleteOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useParams } from "react-router-dom";

export default function ProjectMember() {
  const { projectId } = useParams();

  const { data: memberList } = useQuery({
    queryKey: [projectApi.getListUserInProjectByProjectIdKey, projectId],
    queryFn: async ({ signal }) =>
      projectApi.getListUserInProjectByProjectId(signal, projectId),
  });

  const managerProject = memberList?.find((member) => member.isOwner);

  const columns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "fullname",
      width: "40%",
      render: (name, record) => (
        <Row>
          <Col span={4} className="flex justify-center items-center">
            <Avatar style={{ backgroundColor: randomBgColor() }}>
              {name?.charAt(0).toUpperCase()}
            </Avatar>
          </Col>
          <Col span={20}>
            <Typography.Title level={5} className="!m-0 min-h-[24px]">
              {name}
            </Typography.Title>
            <Typography.Text className="min-h-[19px]">
              {record.email}
            </Typography.Text>
          </Col>
        </Row>
      ),
    },
    {
      title: "Role",
      dataIndex: "roleName",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "statusName",
      width: "20%",
      render: (status) => (
        <Row align="middle" className="gap-2">
          <Typography.Text
            className={`px-2 py-1 rounded font-medium ${
              status === "In Team"
                ? "text-green-500 bg-[#43ff641a]"
                : "text-red-500 bg-[#ef44441a]"
            }`}
          >
            {status}
          </Typography.Text>
        </Row>
      ),
    },
    {
      dataIndex: "action",
      width: "20%",
      align: "center",
      render: () => (
        <Space size="middle">
          <Button icon={<UserDeleteOutlined />}>Remove</Button>
        </Space>
      ),
    },
  ];

  return (
    <Card className="min-h-screen">
      <Typography className="text-xl font-medium">Project Manager</Typography>
      <div className="mt-3">
        <Row>
          <Col span={1} className="flex justify-center items-center">
            {managerProject ? (
              <Avatar style={{ backgroundColor: randomBgColor() }}>
                {managerProject.fullname.charAt(0).toUpperCase()}
              </Avatar>
            ) : null}
          </Col>
          <Col className="ml-3" span={19}>
            {managerProject ? (
              <>
                <Typography.Title level={5} className="!m-0 min-h-[24px]">
                  {managerProject.fullname}
                </Typography.Title>
                <Typography.Text className="min-h-[19px]">
                  {managerProject.email}
                </Typography.Text>
              </>
            ) : null}
          </Col>
        </Row>
      </div>
      <Divider />
      <Typography className="text-xl font-medium mb-5">
        Project Member
      </Typography>
      <Table dataSource={memberList} columns={columns} />
    </Card>
  );
}
