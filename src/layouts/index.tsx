import { Network } from '@/consts';
import { addressAtom, balanceAtom, connectedAtom, networkAtom, publicKeyAtom, unisatInstalledAtom } from '@/features/unisatCore';
import { isMobileAtom } from '@/states';
import { Layout as LayoutComponent } from 'antd';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'umi';
import { FooterView, MenusView } from './components/Menus';
import s from './index.less';

const { Header, Content, Footer } = LayoutComponent;

export default function Layout({}) {
  const [unisatInstalled, setUnisatInstalled] = useAtom(unisatInstalledAtom);
  const [connected, setConnected] = useAtom(connectedAtom);
  const [, setAccounts] = useState<string[]>([]);
  const [publicKey, setPublicKey] = useAtom(publicKeyAtom);
  const [address, setAddress] = useAtom(addressAtom);
  const [balance, setBalance] = useAtom(balanceAtom);
  const [network, setNetwork] = useAtom(networkAtom);
  const location = useLocation();
  const isMobile = useAtomValue(isMobileAtom);

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
      <Header className="flex xs:px-4 lg:px-6" style={{ background: isMobile ? '#001529' : 'transparent' }}>
        <MenusView
          connected={connected}
          setAccounts={setAccounts}
          setConnected={setConnected}
          handleAccountsChanged={handleAccountsChanged}
          address={address}
          unisatInstalled={unisatInstalled}
          network={network}
          setNetwork={setNetwork}
          handleNetworkChanged={handleNetworkChanged}
        />
      </Header>

      <Outlet />
      {isMobile ? null : <FooterView />}
    </LayoutComponent>
  );
}
