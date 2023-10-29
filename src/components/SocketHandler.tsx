import React, { useEffect } from "react";
import { SocketEventHandler } from "@/interfaces/shared/common";
import { API_PATH } from "@/utils/constants";
import io from "socket.io-client";

interface Props {
  eventHandlers: SocketEventHandler[];
}

export default function SocketHandler({ eventHandlers }: Props) {
  useEffect(() => {
    const socket = io(API_PATH);

    eventHandlers.forEach(({ message, handler }) => {
      socket.on(message, handler);
    });

    return () => {
      socket.disconnect();
    };
  }, [eventHandlers]);

  return <></>;
}
