import Icon, {
  CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";

const circleSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 0 512 512"
    fill="#2F54EB"
  >
    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
  </svg>
);
const CircleIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={circleSvg} {...props} />
);

export default CircleIcon;
