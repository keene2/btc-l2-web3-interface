import disconnectIcon from '@/assets/icon/disconnect-icon.svg';
import { balanceAtom, mintBalanceAtom } from '@/features/unisatCore';
import { displaySortAddress, satsToBTC } from '@/helpers';
import { isMobileAtom } from '@/states';
import { CaretDownOutlined, CopyOutlined, RightOutlined, WalletOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Flex, Typography, message } from 'antd';
import { useAtomValue } from 'jotai';
import { useAtom } from 'jotai/index';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const { Text, Paragraph } = Typography;

export const ConnectWalletButton = ({ connected, unisatInstalled, handleAccountsChanged, handleNetworkChanged, address, network }: any) => {
  const [mintBalance, setMintBalance] = useAtom(mintBalanceAtom);
  const [balance, setBalance] = useAtom(balanceAtom);
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

  const items = [
    {
      key: 1,
      label: (
        <div style={{ background: '#212026', borderRadius: '10px' }} className="p16">
          <Flex vertical>
            <Flex justify="space-between">
              <Text className="t3">Wallet Address</Text>
              <CopyToClipboard
                onCopy={() => {
                  message.info('copy success!');
                }}
                text={address}
              >
                <CopyOutlined style={{ color: '#87868C' }} />
              </CopyToClipboard>
            </Flex>
            <span>{address}</span>
          </Flex>
          <Flex vertical className="mt8">
            <span className="t3">Total Balance (BTC)</span>
            <span>{satsToBTC(balance.total || 0)}</span>
          </Flex>
          <Flex vertical className="mt8">
            <span className="t3">Total Balance (ZKT)</span>
            <span>{mintBalance.amount || 0}</span>
          </Flex>
        </div>
      ),
    },
    // {
    //   key: 2,
    //   // https://explorer.zksats.io/tx/0x130f18ed9c8e3e241c744529052131bd0eff3334177c68e86f462aee840e097f
    //   label: (
    //     <a href={`${LINKS.Explorer}/tx`}>
    //       <Flex className="px8" align="center" style={{ height: '48px' }} gap={8}>
    //         <img src={activityIcon} width={24} height={24} />
    //         <span className="fw5">Activity</span>
    //         <Flex flex={1} justify="end">
    //           <RightOutlined />
    //         </Flex>
    //       </Flex>
    //     </a>
    //   ),
    // },
    {
      key: 3,
      label: (
        <>
          <Divider style={{ margin: 0 }} />
          <Flex className="px8" align="center" style={{ height: '48px' }} gap={8} onClick={() => handleAccountsChanged([])}>
            <img src={disconnectIcon} width={24} height={24} />
            <span className="fw5">Disconnect</span>
            <Flex flex={1} justify="end">
              <RightOutlined />
            </Flex>
          </Flex>
        </>
      ),
    },
  ];
  return (
    <>
      {connected ? (
        <>
          <Dropdown menu={{ items }} trigger={['click']}>
            <Button shape="round" type="default" icon={<WalletOutlined />}>
              {displaySortAddress(address)}
              <CaretDownOutlined />
            </Button>
          </Dropdown>
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
