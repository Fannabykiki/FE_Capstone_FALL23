import BrandHeader from "@/assets/images/BrandHeader.png";
import BrandIcon from "@/assets/images/BrandIcon.png";

interface Props {
  menuCollapse: boolean;
}

export default function Brand({ menuCollapse }: Props) {
  return menuCollapse ? (
    <img
      className="h-16"
      src={BrandIcon}
      alt={`Dev Tasker collapse logo`}
    />
  ) : (
    <img
      className="h-16"
      src={BrandHeader}
      alt={`Dev Tasker full sized logo`}
    />
  );
}
