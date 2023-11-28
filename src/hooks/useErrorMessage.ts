import { IErrorInfoState } from "@/interfaces/shared/state";
import { useEffect, useState } from "react";

export default function useErrorMessage() {
  const [errorInfo, setErrorInfo] = useState<IErrorInfoState>({
    isError: false,
    message: "",
  });

  const setErrorWithTimeout = (err: IErrorInfoState) => {
    setErrorInfo(err);

    return setTimeout(() => {
      setErrorInfo({
        isError: false,
        message: "",
      });
    }, 6000);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (errorInfo.isError) {
      timeoutId = setErrorWithTimeout(errorInfo);
      // Return a cleanup function to clear the timeout
    }
    return () => clearTimeout(timeoutId);
  }, [errorInfo]);

  return { errorInfo, setErrorInfo };
}
