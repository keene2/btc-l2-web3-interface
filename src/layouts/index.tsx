import LOGO from '@/assets/logo/LOGO.png';
import footer1 from '@/assets/logo/footer1.svg';
import footer2 from '@/assets/logo/footer2.svg';
import footer3 from '@/assets/logo/footer3.svg';
import footer4 from '@/assets/logo/footer4.svg';
import tg_fff from '@/assets/logo/tg_fff.svg';
import twitter_fff from '@/assets/logo/twitter_fff.svg';
import { Network } from '@/consts';
import { LINKS } from '@/consts/links';
import { addressAtom, balanceAtom, connectedAtom, publicKeyAtom, unisatInstalledAtom } from '@/features/unisatCore';
import { ConnectWalletButton } from '@/features/wallet';
import { Divider, Flex, Image, Layout as LayoutComponent, Menu, Tooltip, Typography } from 'antd';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'umi';
import s from './index.less';

const { Header, Content, Footer } = LayoutComponent;

const items = [
  { key: '', label: 'Home', showInFooter: false },
  { key: 'bridge', label: 'Bridge', showInFooter: true },
  { key: 'staking', label: 'Staking', disabled: true, showInFooter: true },
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

export default function Layout({}) {
  const [unisatInstalled, setUnisatInstalled] = useAtom(unisatInstalledAtom);
  const [connected, setConnected] = useAtom(connectedAtom);
  const [, setAccounts] = useState<string[]>([]);
  const [publicKey, setPublicKey] = useAtom(publicKeyAtom);
  const [address, setAddress] = useAtom(addressAtom);
  const [balance, setBalance] = useAtom(balanceAtom);
  const [network, setNetwork] = useState(Network.livenet);
  const location = useLocation();
  // if (location.pathname === '/login') {
  //   return (
  //     <SimpleLayout>
  //       <Outlet />
  //     </SimpleLayout>
  //   );
  // }

  const getBasicInfo = async () => {
    const unisat = (window as any).unisat;
    const [address] = await unisat.getAccounts();
    setAddress(address);

    const publicKey = await unisat.getPublicKey();
    setPublicKey(publicKey);

    const balance = await unisat.getBalance();
    setBalance(balance);

    const network = await unisat.getNetwork();
    setNetwork(network);
  };

  const selfRef = useRef<{ accounts: string[] }>({
    accounts: [],
  });
  const self = selfRef.current;
  const handleAccountsChanged = (_accounts: string[]) => {
    if (self.accounts[0] === _accounts[0]) {
      // prevent from triggering twice
      return;
    }
    self.accounts = _accounts;
    if (_accounts.length > 0) {
      setAccounts(_accounts);
      setConnected(true);
      setAddress(_accounts[0]);
      getBasicInfo();
    } else {
      setConnected(false);
      setAddress('');
      setPublicKey('');
      setBalance({ confirmed: 0, unconfirmed: 0, total: 0 });
    }
  };
  const unisat = (window as any).unisat;

  const handleNetworkChanged = (network: Network) => {
    setNetwork(network);
    getBasicInfo();
  };

  useEffect(() => {
    async function checkUnisat() {
      let unisat = (window as any).unisat;

      for (let i = 1; i < 10 && !unisat; i += 1) {
        await new Promise((resolve) => setTimeout(resolve, 100 * i));
        unisat = (window as any).unisat;
      }

      if (unisat) {
        setUnisatInstalled(true);
      } else if (!unisat) return;

      unisat.getAccounts().then((accounts: string[]) => {
        handleAccountsChanged(accounts);
      });

      unisat.on('accountsChanged', handleAccountsChanged);
      unisat.on('networkChanged', handleNetworkChanged);

      return () => {
        unisat.removeListener('accountsChanged', handleAccountsChanged);
        unisat.removeListener('networkChanged', handleNetworkChanged);
      };
    }
    checkUnisat().then();
  }, []);

  return (
    <LayoutComponent className={s.layout}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'transparent',
        }}
      >
        <div className="demo-logo f0 mr20">
          <Image preview={false} src={LOGO} width={40} height={40} />
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
        <Flex flex={1} justify="end" gap="18px" align="center">
          <a href={LINKS.Twitter} target="_blank" className="df">
            <img src={twitter_fff} width={20} height={20} alt="twitter" style={{ fontSize: 0, fill: '#fff' }} />
          </a>
          <a href={LINKS.TG} target="_blank" className="df">
            <img src={tg_fff} width={20} height={20} alt={'tg'} style={{ fontSize: 0, color: '#fff' }} />
          </a>
          {/*</Flex>*/}
          <ConnectWalletButton
            connected={connected}
            network={network}
            unisatInstalled={unisatInstalled}
            address={address}
            handleAccountsChanged={handleAccountsChanged}
            handleNetworkChanged={async () => {
              const network = await unisat.switchNetwork('livenet');
              setNetwork(network);
            }}
          />
        </Flex>
      </Header>
      <Outlet />

      <Footer className="mxauto mt80">
        <Flex vertical align="center" gap={32}>
          <Image preview={false} src={LOGO} width={40} height={40} />
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
                    <a
                      // style={{ color: 'rgba(255, 255, 255, 0.65)' }}
                      href={item.href}
                      target="_blank"
                    >
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
              <a href={item.href} target="_blank">
                <Image preview={false} src={item.img} width={24} height={24} />
              </a>
            ))}
          </Flex>
        </Flex>
        <Divider />
        <Flex style={{ width: '100%', height: '60px' }} align="center" justify="center">
          <Typography.Text type="secondary">Copyright © 2023-2024 zksats.io</Typography.Text>
        </Flex>
      </Footer>
    </LayoutComponent>
  );
}
