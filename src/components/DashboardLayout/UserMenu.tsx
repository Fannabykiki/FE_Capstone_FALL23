import { Dropdown } from "antd";
import { AuthContext } from "@/context/Auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MenuInfo } from "rc-menu/lib/interface";

enum KeyActions {
  SignOut = "sign-out",
}

interface Props {
  children: React.ReactElement;
}

export default function UserMenu({ children }: Props) {
  const { setAuthenticate } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSignOut = () => {
    // call api to logout, disable token, etc
    localStorage.removeItem("token");
    setAuthenticate({
      isAuthenticated: false,
      userInfo: null,
    });
    navigate("/login");
  };

  const onSelectAction = ({ key }: MenuInfo) => {
    switch (key) {
      case KeyActions.SignOut:
        onSignOut();
        break;
      default:
        break;
    }
  };

  const actions = [
    {
      key: KeyActions.SignOut,
      label: "Sign out",
    },
  ];

  return (
    <>
      <Dropdown menu={{ items: actions, onClick: onSelectAction }}>
        {children}
      </Dropdown>
    </>
  );
}
