import React, { useEffect } from "react";
import { SocketEventHandler } from "@/interfaces/shared/common";
import { API_PATH } from "@/utils/constants";
import { HubConnectionBuilder } from "@microsoft/signalr";

interface Props {
  eventHandlers: SocketEventHandler[];
}

const SIGNALR_URL = `${API_PATH}/notification`;

export default function SignalRHandler({ eventHandlers }: Props) {
  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    if (!jwtToken) {
      return;
    }
    const connection = new HubConnectionBuilder()
      .withUrl(SIGNALR_URL, { accessTokenFactory: () => jwtToken })
      .withAutomaticReconnect()
      .build();
    connection
      .start()
      .then(() => console.log("Connected to the SignalR Hub"))
      .catch((err) =>
        console.error("Error while establishing connection: ", err)
      );

    eventHandlers.forEach(({ message, handler }) => {
      connection.on(message, handler);
    });

    return () => {
      connection
        .stop()
        .then(() => console.log("Disconnected from the Hub"))
        .catch((err) => console.error("Error while disconnecting: ", err));
    };
  }, [eventHandlers]);

  return <></>;
}
