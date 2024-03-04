import { displaySortAddress } from '@/helpers';
import { isMobileAtom } from '@/states';
import { Button, Typography } from 'antd';
import { useAtomValue } from 'jotai';

const { Text } = Typography;

export const ConnectWalletButton = ({ connected, unisatInstalled, handleAccountsChanged, handleNetworkChanged, address, network }: any) => {
  const isMobile = useAtomValue(isMobileAtom);
  if (!unisatInstalled) {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <Button
              onClick={() => {
                window.location.href = 'https://unisat.io';
              }}
            >
              Install Unisat Wallet
            </Button>
          </div>
        </header>
      </div>
    );
  }

  return (
    <>
      {connected ? (
        <>
          <Button
            type="primary"
            onClick={async () => {
              handleAccountsChanged([]);
            }}
          >
            {displaySortAddress(address)}
          </Button>
          {network !== 'livenet' ? (
            <Button type="default" style={{ marginLeft: '12px' }} onClick={handleNetworkChanged}>
              <Text style={{ color: '#e85f5f' }} className="f12">
                {network}
              </Text>
            </Button>
          ) : null}
        </>
      ) : (
        <Button
          // type="primary"
          onClick={async () => {
            const result = await (window as any).unisat.requestAccounts();
            handleAccountsChanged(result);
          }}
        >
          Connect Wallet
        </Button>
      )}
    </>
  );
};
