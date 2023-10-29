import React from "react";
import { Layout } from "antd";
import { useTranslation } from "react-i18next";

export default function DashboardFooter() {
  const { t } = useTranslation();
  return (
    <>
      <Layout.Footer
        style={{
          textAlign: "center",
        }}
      >
        {t("layout.footer.copyright")}
      </Layout.Footer>
    </>
  );
}
