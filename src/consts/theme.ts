import { theme } from 'antd';
export const cusTheme = {
  algorithm: theme.darkAlgorithm,
  components: {
    Menu: {
      darkItemSelectedBg: 'transparent',
      darkItemSelectedColor: '#7C54F1',
    },
    Dropdown: {
      colorBgElevated: '#131217',
      controlItemBgHover: 'rgba(255, 255, 255, 0)',
    },
    // ro,
    // colorBorder: "none",
  },
  token: {
    colorBgContainer: '#212026',
    // // Seed Token，影响范围大
    colorPrimary: '#7C54F1',
    // borderRadius: 2,
    // // 派生变量，影响范围小
    // colorBgContainer: "#f6ffed",
  },
};
