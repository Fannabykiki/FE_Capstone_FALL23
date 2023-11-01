import { useEffect, useState } from "react";
import { Button, Form, Image, Input, Typography } from "antd";
import {
  Link,
  useNavigate,
  useParams,
  useRoutes,
  useSearchParams,
} from "react-router-dom";
import { authApi } from "@/utils/api/auth";
import { paths } from "@/routers/paths";
import { useMutation } from "@tanstack/react-query";
import { classNames } from "@/utils/common";
import BrandFull from "@/assets/images/BrandFull.png";
import { LoadingOutlined } from "@ant-design/icons";

export default function VerifyAccount() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isVerifySuccess, setIsVerifySuccess] = useState<boolean | undefined>(
    undefined
  );

  const { mutate: verifyAccount, isLoading } = useMutation({
    mutationFn: authApi.verifyAccount,
    mutationKey: [authApi.verifyAccountKey],
    onSuccess: () => {
      setIsVerifySuccess(true);
    },
    onError: () => {
      setIsVerifySuccess(false);
    },
  });

  useEffect(() => {
    const email = searchParams.get("email");
    const verifyToken = searchParams.get("token");
    if (!email && !verifyToken) {
      navigate(paths.login);
    } else {
      verifyAccount({ email: email!, verifyToken: verifyToken! });
    }
  }, [searchParams, navigate, verifyAccount]);

  return (
    <div className="auth min-h-screen">
      <div
        className={classNames(
          "w-96 rounded-md bg-neutral-50/75 flex flex-col items-center p-4",
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        )}
      >
        <Image preview={false} src={BrandFull} />
        {isLoading ? (
          <div className="p-4">
            <LoadingOutlined className="text-6xl" />
          </div>
        ) : (
          <>
            {isVerifySuccess === true && (
              <Typography.Title level={4} className="text-center">
                Your email has been verified! You can now{" "}
                <Link to={paths.login}>
                  login
                </Link>{" "}
                into our system and enjoy all the features
              </Typography.Title>
            )}
            {isVerifySuccess === false && (
              <Typography.Title level={4} className="text-center">
                An attempt to verify your email has failed! Please try again
                later
              </Typography.Title>
            )}
          </>
        )}
      </div>
    </div>
  );
}
