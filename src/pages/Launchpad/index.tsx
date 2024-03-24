import nftImg from '@/assets/nft/nft-img.png';
import { MINT_AMOUNT, MINT_PROJECT_ADDRESS, Network, TOKEN_ID } from '@/consts';
import { IMAGES } from '@/consts/images';
import { LINKS } from '@/consts/links';
import { addressAtom, connectedAtom, networkAtom, publicKeyAtom } from '@/features/unisatCore';
import { NumUtils } from '@/helpers/Numutils';
import http from '@/helpers/http';
import { useQuery } from '@tanstack/react-query';
import { Button, Divider, Flex, Form, Input, Layout, Progress, Select, Typography, notification } from 'antd';
import { useAtomValue } from 'jotai';
import { useState } from 'react';

import s from './index.less';

const { Title, Paragraph, Text, Link } = Typography;
const { Option } = Select;

const LaunchpadPage = () => {
  const address = useAtomValue(addressAtom);
  const publicKey = useAtomValue(publicKeyAtom);
  const { isLoading, error, data } = useQuery({
    queryKey: ['get-token-info'],
    queryFn: async () => {
      try {
        const res = await http.get(`token/:id`, {
          id: TOKEN_ID,
        });
        return res.data;
      } catch (e) {
        console.log('eeeeeeee: ', e);
      }
    },
    initialData: {
      name: 'ZKT',
      symbol: 'ZKT',
      totalSupply: 0,
      minted: 0,
      limit: 10000,
      holder: 0,
    },
  });

  const connected = useAtomValue(connectedAtom);
  const network = useAtomValue(networkAtom);
  const [isSignatured, setIsSignatured] = useState(false);

  const handleSubmitSend = async ({ toAddress }: any) => {
    // debugger;
    setIsSignatured(true);
    const toAddressLow = toAddress.toLowerCase();
    const signature = await (window as any).unisat.signMessage(toAddressLow);
    const txid = await (window as any).unisat.sendBitcoin(MINT_PROJECT_ADDRESS, MINT_AMOUNT);
    const res = await http.post('sign', {
      from: address,
      to: toAddressLow,
      publicKeyHex: publicKey,
      signature,
    });
    notification.open({
      type: 'success',
      message: 'Transaction submitted',
      description: (
        <Text>
          TxId is{' '}
          <Link href={`${LINKS.Mempool}/${network === Network.livenet ? '' : 'testnet/'}tx/${txid}`} target="_blank">
            {txid}
          </Link>
        </Text>
      ),
    });
  };

  console.log('data.minted / data.totalSupply) * 100', data.minted, data.totalSupply);

  // 前端调mint之前还是要调用一下sign接口，需要加多一个类型跟之前的区分

  return (
    <Layout className={s.bg}>
      <Flex className="normalPageRoot" vertical>
        <Flex className={s.root} vertical>
          <Title level={3} className="my0">
            Mint
          </Title>
          <Divider />
          <Flex gap={24}>
            <img alt="nft" src={nftImg} width={150} height={150} className="rounded-lg" />
            <Flex vertical gap={16}>
              <Text className="text-xl">Join the community and shape the future of Bitcoin</Text>
              <Flex vertical>
                <Text className="text-sm text-gray-400">
                  {NumUtils.displayPercent(data.minted / data.totalSupply)}{' '}
                  <Text className="font-semibold colorPrimary">{data.holder} Minters</Text>
                </Text>
                <Progress showInfo={false} percent={(data.minted / data.totalSupply) * 100} />
                <Text className="text-gray-500">
                  Total Minted / Maximum Mint Amount{' '}
                  <Text className="font-semibold colorPrimary">{NumUtils.displayCount(data.minted)}</Text>/
                  {NumUtils.displayCount(data.totalSupply)}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Text className="text-gray-500 my-4">Join us now</Text>
          <Form className={s.form} onFinish={handleSubmitSend}>
            <Form.Item>
              <Flex className={s.inputWrap} align="center" vertical={false} justify="space-between">
                <Text className="text-gray-500">Token</Text>
                <Flex className={s.inputLeftWrap} align="center" gap={4}>
                  <img src={IMAGES.logo} width={20} height={20} />
                  <Text>ZKT</Text>
                </Flex>
              </Flex>
            </Form.Item>
            <Form.Item>
              <Flex className={s.inputWrap} align="center" vertical={false} justify="space-between">
                <Text className="text-gray-500">Amount</Text>
                <Text className="fw5">{NumUtils.displayCount(data.limit)}</Text>
              </Flex>
            </Form.Item>

            <Form.Item name="toAddress" rules={[{ required: true, message: 'Please input to address!' }]}>
              <Flex className={s.inputWrap} align="center" vertical={false}>
                <Input
                  variant="borderless"
                  placeholder="Please enter your ETH wallet address"
                  addonBefore={
                    <Flex className="text-gray-500" align="center" gap={2}>
                      Address
                    </Flex>
                  }
                />
              </Flex>
            </Form.Item>

            <Form.Item style={{ marginTop: '40px' }}>
              <Button block size="large" type="primary" htmlType="submit" disabled={!connected || isSignatured}>
                {!connected ? 'Please Connect Wallet' : 'Fair Mint'}
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default LaunchpadPage;
