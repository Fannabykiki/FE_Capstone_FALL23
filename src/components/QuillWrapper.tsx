import ReactQuill from "react-quill";

interface Props {
  value?: string;
  onChange?: (_: string) => void;
}

export default function QuillWrapper({ value, onChange }: Props) {
  return <ReactQuill theme="snow" value={value} onChange={onChange} />;
}
