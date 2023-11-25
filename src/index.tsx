import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import "@/assets/styles/index.scss";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import relativeTime from "dayjs/plugin/relativeTime";
import { ConfigProvider } from "antd";

dayjs.extend(relativeTime);
dayjs.extend(weekday);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <ConfigProvider
      theme={{
        components: {
          Switch: {
            colorPrimary: "#22C55E",
            colorPrimaryHover: "#22C55E",
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
    <ToastContainer />
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
