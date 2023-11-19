export const API_PATH = import.meta.env.VITE_API_URL;

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export const formItemLayoutHorizontal = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

export const formItemLayoutVertical = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

export const DEFAULT_PER_PAGE = 20;

export const DATE_FORMAT = "DD/MM/YYYY";

export const DATETIME_FORMAT = "DD/MM/YYYY HH:mm";

export const REGEX_NUMBER = /\d/;

export const REGEX_PHONE = /^[0-9]+$/;

export const REGEXT_PHONE_VIETNAM =
  /^(0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

export const REGEX_SPECIAL_CHARACTER = /[~`!@#$%^&*()\-_+={}\[\]|\/:;"'<>,.?]/;

export const REGEX_CHARACTER = /(?=.*[a-z])(?=.*[A-Z])/;

export const AVATAR_BG_COLOR = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];

export const SAFE_DAY_TIL_DUE_DATE = -7;
export const WARNING_DAY_TIL_DUE_DATE = -2;

export const STATUS_COLOR = {
  "To do": {
    backgroundColor: "F5B7B1",
    color: "E74C3C",
  },
  Doing: {
    backgroundColor: "ABEBC6",
    color: "28B463",
  },
  Done: {
    backgroundColor: "F9E79F",
    color: "D4AC0D",
  },
  Close: {
    backgroundColor: "grey",
    color: "white",
  },
};
