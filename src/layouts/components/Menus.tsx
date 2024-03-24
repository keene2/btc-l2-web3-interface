import LOGO from '@/assets/logo/LOGO.png';
import footer1 from '@/assets/logo/footer1.svg';
import footer2 from '@/assets/logo/footer2.svg';
import footer3 from '@/assets/logo/footer3.svg';
import footer4 from '@/assets/logo/footer4.svg';
import tg_fff from '@/assets/logo/tg_fff.svg';
import twitter_fff from '@/assets/logo/twitter_fff.svg';
import { LINKS } from '@/consts/links';
import { mintBalanceAtom } from '@/features/unisatCore';
import { ConnectWalletButton } from '@/features/wallet';
import { isMobile } from '@/helpers';
import http from '@/helpers/http';
import { CloseOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import type { MenuProps } from 'antd';
import { Divider, Drawer, Flex, Layout as LayoutComponent, Menu, Tooltip, Typography } from 'antd';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { Link } from 'umi';

const { Header, Content, Footer } = LayoutComponent;

const items = [
  { key: '', label: 'Home', showInFooter: false },
  { key: 'bridge', label: 'Bridge', showInFooter: true },
  { key: 'staking', label: 'Staking', disabled: true, showInFooter: true },
  { key: 'launchpad', label: 'Launchpad', showInFooter: true },
  {
    key: 'explorer',
    label: 'Explorer',
    href: LINKS.Explorer,
    showInFooter: true,
  },
  { key: 'ecosystem', label: 'Ecosystem', showInFooter: true },
  {
    key: 'documentation',
    label: 'Documentation',
    href: LINKS.GitBook,
    showInFooter: true,
  },
];

export const MenusView: React.FC = ({
  connected,
  setAccounts,
  setConnected,
  handleAccountsChanged,
  address,
  unisatInstalled,
  network,
  setNetwork,
  handleNetworkChanged,
}: any) => {
  const [visible, setVisible] = React.useState(false);
  const [current, setCurrent] = useState('mail');
  const [mintBalance, setMintBalance] = useAtom(mintBalanceAtom);

  const res = useQuery({
    queryKey: ['get-balance-info'],
    queryFn: async () => {
      try {
        const res = await http.post(`balance`, { address });
        return res;
        return res.data;
      } catch (e) {
        console.log('eeeeeeee: ', e);
      }
    },
  });

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const showMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const drawerTitle = () => {
    return (
      <Flex align="center" justify="space-between">
        <Flex gap={8}>
          <img src={LOGO} width={26} height={26} />
          <span>ZKSats</span>
        </Flex>
        <CloseOutlined onClick={closeMenu} />
      </Flex>
    );
  };

  if (isMobile()) {
    return (
      <>
        <Flex align="center" flex={1} justify="space-between">
          <Link to={'/'}>
            <img src={LOGO} width={36} height={36} />
          </Link>
          <Flex gap={12}>
            <ConnectWalletButton
              connected={connected}
              network={network}
              balance={mintBalance}
              unisatInstalled={unisatInstalled}
              address={address}
              handleAccountsChanged={handleAccountsChanged}
              handleNetworkChanged={handleNetworkChanged}
            />
            <Flex onClick={showMenu}>
              {visible ? <MenuUnfoldOutlined style={{ fontSize: '24px' }} /> : <MenuFoldOutlined style={{ fontSize: '24px' }} />}
            </Flex>
          </Flex>
        </Flex>
        <Drawer width="100%" title={drawerTitle()} closeIcon={null} placement="right" onClose={closeMenu} visible={visible}>
          <Menu theme="dark" mode="vertical" selectedKeys={[location.pathname.replace('/', '')]}>
            {items.map((item, index) => (
              <Menu.Item key={item.key} disabled={item.disabled}>
                {item.disabled ? (
                  <Tooltip placement="topLeft" title="comming soom">
                    <Typography.Text style={{ color: 'rgba(255, 255, 255, 0.65)' }}>{item.label}</Typography.Text>
                  </Tooltip>
                ) : item.href ? (
                  <a style={{ color: 'rgba(255, 255, 255, 0.65)' }} href={item.href} target="_blank" onClick={closeMenu}>
                    {item.label}
                  </a>
                ) : (
                  <Link onClick={closeMenu} to={`/${item.key}`}>
                    {item.label}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </Menu>
        </Drawer>
      </>
    );
  }

  return (
    <>
      <div className="f0 mr20 flex justify-center items-center">
        <Link to={'/'} className="flex justify-center items-center">
          <img src={LOGO} width={40} height={40} />
        </Link>
      </div>
      <Flex flex={1}>
        <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname.replace('/', '')]}>
          {items.map((item, index) => (
            <Menu.Item key={item.key} disabled={item.disabled}>
              {item.disabled ? (
                <Tooltip placement="topLeft" title="comming soom">
                  <Typography.Text style={{ color: 'rgba(255, 255, 255, 0.65)' }}>{item.label}</Typography.Text>
                </Tooltip>
              ) : item.href ? (
                <a style={{ color: 'rgba(255, 255, 255, 0.65)' }} href={item.href} target="_blank">
                  {item.label}
                </a>
              ) : (
                <Link to={`/${item.key}`}>{item.label}</Link>
              )}
            </Menu.Item>
          ))}
        </Menu>
      </Flex>
      <Flex justify="end" gap="18px" align="center">
        <a href={LINKS.Twitter} target="_blank" className="df">
          <img src={twitter_fff} width={20} height={20} alt="twitter" style={{ fontSize: 0, fill: '#fff' }} />
        </a>
        <a href={LINKS.TG} target="_blank" className="df">
          <img src={tg_fff} width={20} height={20} alt={'tg'} style={{ fontSize: 0, color: '#fff' }} />
        </a>
        <ConnectWalletButton
          connected={connected}
          balance={mintBalance}
          network={network}
          unisatInstalled={unisatInstalled}
          address={address}
          handleAccountsChanged={handleAccountsChanged}
          handleNetworkChanged={handleNetworkChanged}
        />
      </Flex>
    </>
  );
};

export const FooterView = () => {
  return (
    <Footer className="mxauto mt80">
      <Flex vertical align="center" gap={32}>
        <img src={LOGO} width={40} height={40} />
        <Flex gap={48}>
          {items
            .filter((i) => i.showInFooter)
            .map((item, index) => (
              <div key={index}>
                {item.disabled ? (
                  <Tooltip placement="topLeft" title="comming soom">
                    <Typography.Text style={{ color: 'rgba(255, 255, 255, 0.65)' }}>{item.label}</Typography.Text>
                  </Tooltip>
                ) : item.href ? (
                  <a href={item.href} target="_blank">
                    {item.label}
                  </a>
                ) : (
                  <Link to={`/${item.key}`}>{item.label}</Link>
                )}
              </div>
            ))}
        </Flex>
        <Flex gap={32}>
          {[
            { img: footer1, href: LINKS.Twitter },
            { img: footer2, href: LINKS.TG },
            { img: footer3, href: LINKS.GitHub },
            { img: footer4, href: LINKS.GitBook },
          ].map((item) => (
            <a href={item.href} key={item.href} target="_blank">
              <img src={item.img} width={24} height={24} />
            </a>
          ))}
        </Flex>
        <Divider />
        <Flex style={{ width: '100%', height: '60px' }} align="center" justify="center">
          <Typography.Text type="secondary">Copyright © 2023-2024 zksats.io</Typography.Text>
        </Flex>
      </Flex>
    </Footer>
  );
};
