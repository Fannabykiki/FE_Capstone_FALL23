import { useState } from "react";

export default function useMenuCollapse(defaultCollapse = false) {
  const [menuCollapse, setMenuCollapse] = useState(defaultCollapse);

  const onToggleMenu = () => {
    setMenuCollapse((c) => !c);
  };

  return { menuCollapse, onToggleMenu };
}
