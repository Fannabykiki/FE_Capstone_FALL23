import CircleIcon from "@/assets/icons/iconCircle";
import { Avatar, List } from "antd";

const data = [
  {
    title: "Ant Design Title 1 ",
    time: "6 minutes ago",
    status: 0,
  },
  {
    title: "Ant Design Title 2",
    time: "9 minutes ago",
    status: 0,
  },
  {
    title: "Ant Design Title 3",
    time: "8 minutes ago",
    status: 1,
  },
  {
    title: "Ant Design Title 4",
    time: "7 hours ago",
    status: 1,
  },
];

export default function NotiAll() {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
              />
            }
            title={
              item.status === 0 ? (
                <a href="/">{item.title}</a>
              ) : (
                <a style={{ color: "#a0a3a7" }} href="/">
                  {item.title}
                </a>
              )
            }
            description={item.time}
          />
          <List.Item.Meta
            title={
              item.status === 0 ? (
                <div className="float-right">
                  <CircleIcon style={{ fontSize: "12px" }} />
                </div>
              ) : (
                <div></div>
              )
            }
          />
        </List.Item>
      )}
    />
  );
}
