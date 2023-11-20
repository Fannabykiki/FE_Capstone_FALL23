import { Modal } from "antd";

interface Props {
  taskId: string;
}

export default function TaskDetail({ taskId }: Props) {
  return (
    <>
      <Modal open={true} title="Task" width="90%">
        Test
      </Modal>
    </>
  );
}
