import { Provider } from "jotai";
import React from "react";
import { Button, ConfigProvider, Input, Space, theme } from "antd";
import { cusTheme } from "@/consts/theme";

export function rootContainer(container) {
  return React.createElement(
    ConfigProvider,
    { theme: cusTheme },
    React.createElement(Provider, {}, container),
  );
}
