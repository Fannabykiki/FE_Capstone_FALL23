import { JwtTokenInfo } from "@/interfaces/user";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import {
  DATETIME_FORMAT,
  DATE_FORMAT,
  REGEXT_PHONE_VIETNAM,
  REGEX_CHARACTER,
  REGEX_NUMBER,
  REGEX_PHONE,
  REGEX_SPECIAL_CHARACTER,
  SAFE_DAY_TIL_DUE_DATE,
  WARNING_DAY_TIL_DUE_DATE,
} from "./constants";

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

const calcTaskDueDateColor = (dueDate: Date) => {
  const colors = [
    "bg-green-200 text-green-600",
    "bg-yellow-200 text-yellow-600",
    "bg-red-200 text-red-600",
  ];
  const today = new Date();
  const dayDiff = dayjs(today).diff(dueDate, "day");
  if (dayDiff <= SAFE_DAY_TIL_DUE_DATE) {
    return colors[0];
  } else if (dayDiff < WARNING_DAY_TIL_DUE_DATE) {
    return colors[1];
  }
  return colors[2];
};

const handleValidatePassword = async (password: string) => {
  switch (true) {
    case password.length < 8:
      return Promise.reject(
        new Error("Password must be equal or longer than 8 characters")
      );
    case !REGEX_NUMBER.test(password):
      return Promise.reject(new Error("Password must have atleast one number"));
    case !REGEX_SPECIAL_CHARACTER.test(password):
      return Promise.reject(
        new Error("Password must have atleast one special character")
      );
    case !REGEX_CHARACTER.test(password):
      return Promise.reject(
        new Error(
          "Password must have atleast one upper and lower case character"
        )
      );
    default:
      break;
  }
};

const handleValidatePhoneNumber = async (phoneNumber: string) => {
  switch (true) {
    case phoneNumber.length < 10:
      return Promise.reject(
        new Error("Phone number must be at least 10 characters")
      );
    case !REGEX_PHONE.test(phoneNumber):
      return Promise.reject(
        new Error("Phone number must contain only numbers")
      );
    case !REGEXT_PHONE_VIETNAM.test(phoneNumber):
      return Promise.reject(new Error("Invalid phone number"));
    default:
      break;
  }
};

const stringToColor = (str: string) => {
  // Hash function to convert string to number
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit integer
  }

  // Convert the number to a hex color code and calculate RGB values
  let color = "#";
  let rgb = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 255;
    color += ("00" + value.toString(16)).substr(-2);
    rgb[i] = value;
  }

  // Calculate the luminance
  const luminance = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2];
  // Determine whether the color is light or dark
  const hue = luminance > 128 ? "light" : "dark";

  return { color, hue };
};

const lowerCaseFirstLetter = (str: string) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

export {
  classNames,
  makePath,
  getPathSegments,
  checkTokenValid,
  defaultFormatDate,
  defaultFormatDateTime,
  calcTaskDueDateColor,
  handleValidatePassword,
  handleValidatePhoneNumber,
  stringToColor,
  lowerCaseFirstLetter,
};
