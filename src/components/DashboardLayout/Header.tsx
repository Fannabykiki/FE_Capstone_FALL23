import { useLocation } from "react-router-dom";
import { Breadcrumb, Layout } from "antd";

const Header = () => {
  const location = useLocation();

  return (
    <Layout.Header className="flex items-center justify-between !bg-white shadow-custom">
      <Breadcrumb
        className="whitespace-nowrap font-semibold"
        items={location.pathname
          .split("/")
          .filter(Boolean)
          .map((item) => ({
            title: item.charAt(0).toUpperCase() + item.slice(1),
          }))}
      />
    </Layout.Header>
  );
};

export default Header;
