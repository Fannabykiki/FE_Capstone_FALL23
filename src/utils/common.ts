import { JwtTokenInfo } from "@/interfaces/user";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import { DATETIME_FORMAT, DATE_FORMAT } from "./constants";

function classNames(...className: (string | undefined | boolean)[]) {
  return className.filter((name) => Boolean(name)).join(" ");
}

function makePath(keys: string[]) {
  return [...keys].join("/");
}

function getPathSegments(path: string) {
  // Split the path by '/' and filter out any empty strings
  // that occur due to the leading '/'
  const segments = path.split("/").filter(Boolean);

  // Reduce the segments to create the array of paths
  return segments.reduce((acc: string[], current, index) => {
    // Concatenate the current segment to the accumulated path
    // If it's the first segment, prepend a '/' to it
    const segmentPath = `${acc.length > 0 ? acc[index - 1] : ""}/${current}`;
    // Push the new path into the accumulator
    acc.push(segmentPath);
    return acc;
  }, []);
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
  getPathSegments,
  checkTokenValid,
  defaultFormatDate,
  defaultFormatDateTime,
};
