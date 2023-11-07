import { JwtTokenInfo } from "@/interfaces/user";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import { DATETIME_FORMAT, DATE_FORMAT } from "./constants";

function classNames(...className: (string | undefined)[]) {
  return className.filter((name) => Boolean(name)).join(" ");
}

function makePath(keys: string[]) {
  return [...keys].join("/");
}

const checkTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  const tokenInfo: JwtTokenInfo = jwtDecode(token);
  if (new Date() >= new Date(tokenInfo.exp * 1000)) {
    localStorage.removeItem("token");
    return false;
  }
  return true;
};

const defaultFormatDate = (date: Date | string) =>
  dayjs(date).format(DATE_FORMAT);

const defaultFormatDateTime = (date: Date | string) =>
  dayjs(date).format(DATETIME_FORMAT);

export {
  classNames,
  makePath,
  checkTokenValid,
  defaultFormatDate,
  defaultFormatDateTime,
};
