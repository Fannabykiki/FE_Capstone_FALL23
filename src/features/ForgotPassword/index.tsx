import { Image } from "antd";
import { classNames } from "@/utils/common";
import BrandFull from "@/assets/images/BrandFull.png";
import ForgotPasswordForm from "./forgot-password-form";
import { useSearchParams } from "react-router-dom";
import ResetPasswordForm from "./reset-password-form";

export default function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  return (
    <div className="auth min-h-screen">
      <div
        className={classNames(
          "w-96 rounded-md bg-neutral-50/75 flex flex-col items-center p-4",
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        )}
      >
        <Image preview={false} src={BrandFull} />
        {token && email ? (
          <ResetPasswordForm token={token} email={email} />
        ) : (
          <ForgotPasswordForm />
        )}
      </div>
    </div>
  );
}
