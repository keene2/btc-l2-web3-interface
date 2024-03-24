import { cusTheme } from '@/consts/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { Provider } from 'jotai';
import React from 'react';

// export function rootContainer(container) {
//   return React.createElement(ConfigProvider, { theme: cusTheme }, React.createElement(Provider, {}, container));
// }

const queryClient = new QueryClient();

export function rootContainer(container) {
  return React.createElement(
    ConfigProvider,
    { theme: cusTheme },
    React.createElement(
      Provider,
      {},
      React.createElement(
        QueryClientProvider,
        {
          client: queryClient,
        },
        container,
      ),
    ),
  );
}
