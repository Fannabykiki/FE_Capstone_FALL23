import { stringToColor } from "@/utils/common";
import { Avatar, AvatarProps } from "antd";

interface Props {
  stringContent: string | undefined;
}

export default function AvatarWithColor({
  stringContent = "",
  ...props
}: AvatarProps & Props) {
  const colorInfo = stringToColor(stringContent);
  return (
    <Avatar
      {...props}
      style={{
        backgroundColor: colorInfo.color,
        color: colorInfo.hue === "dark" ? "white" : "black",
        ...(props.style || {}),
      }}
    />
  );
}
