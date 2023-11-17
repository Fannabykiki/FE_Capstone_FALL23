import { useState } from "react";

export default function useDetailView<T>(initialDetail: T | null = null) {
  const [detail, setDetail] = useState(initialDetail);
  const [openView, setOpenView] = useState(false);

  const onOpenView = (_detail?: T) => {
    setDetail(_detail || null);
    setOpenView(true);
  };

  const onCloseView = () => {
    setDetail(null);
    setOpenView(false);
  };

  return {
    onOpenView,
    onCloseView,
    detail,
    openView,
  };
}
