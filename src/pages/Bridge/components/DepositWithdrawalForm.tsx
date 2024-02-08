import { Network, PROJECT_ADDRESS } from '@/consts';
import { IMAGES } from '@/consts/images';
import { LINKS } from '@/consts/links';
import { addressAtom, connectedAtom, networkAtom, publicKeyAtom, txidsAtom } from '@/features/unisatCore';
import { btcToSats, removeTrailingZeros } from '@/helpers';
import http from '@/helpers/http';
import { WalletOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Form, Image, Input, Radio, Select, Typography, message, notification } from 'antd';
import { useAtom, useAtomValue } from 'jotai';
import { useState } from 'react';
import styles from '../index.less';
import { CustomFromAmoutInput } from './CustomFromAmoutInput';

const { Title, Paragraph, Text, Link } = Typography;
const { Option } = Select;

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export const DepositWithdrawalForm = () => {
  const address = useAtomValue(addressAtom);
  const connected = useAtomValue(connectedAtom);
  const publicKey = useAtomValue(publicKeyAtom);
  const [txids, setTxids] = useAtom(txidsAtom);
  const [isSignatured, setIsSignatured] = useState(false);
  const [form] = Form.useForm();
  const network = useAtomValue(networkAtom);

  const handleButtonClick = (value: number) => {
    form.setFieldsValue({ from: value });
  };

  const handleSubmitSend = async ({ toAddress, toAmount }: any) => {
    setIsSignatured(true);
    const toAddressLow = toAddress.toLowerCase();
    try {
      const signature = await (window as any).unisat.signMessage(toAddressLow);
      const txid = await (window as any).unisat.sendBitcoin(PROJECT_ADDRESS, btcToSats(toAmount));
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

      const res = await http.post('sign', {
        from: address,
        to: toAddressLow,
        publicKeyHex: publicKey,
        signature,
      });
      setTxids([...txids, txid]);
    } catch (e) {
      message.error(e.message);
    } finally {
      setIsSignatured(false);
    }
  };

  return (
    <Flex className={styles.root} vertical>
      <Title level={3} className="my0">
        Bridge
      </Title>
      <Divider />
      <Form className={styles.form} onFinish={handleSubmitSend}>
        <Form.Item name="size" style={{ marginBottom: '16px' }}>
          <Radio.Group
            className="mxauto"
            buttonStyle="solid"
            optionType="button"
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Radio.Button value="small">Deposit</Radio.Button>
            <Radio.Button disabled value="withdrawal">
              Withdrawal
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="toAmount"
          labelCol={{ span: 24 }}
          label={<Text type="secondary">Transfer from</Text>}
          rules={[{ required: true, message: 'Please input to amount!' }]}
        >
          <CustomFromAmoutInput disibled={isSignatured} />
        </Form.Item>
        <Text type="secondary">Transfer to</Text>
        <Form.Item name="toAddress" rules={[{ required: true, message: 'Please input to address!' }]}>
          <Flex className={styles.inputWrap} align="center" vertical={false}>
            <Input
              variant="borderless"
              placeholder="Please enter your ETH wallet address"
              addonBefore={
                <Flex className={styles.inputLeftWrap} align="center" gap={2}>
                  <WalletOutlined style={{ color: '#7C54F1' }} />
                  Address
                </Flex>
              }
            />
          </Flex>
        </Form.Item>

        <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.toAmount !== currentValues.toAmount}>
          {({ getFieldValue }) => (
            <Flex className={styles.inputWrap} align="center" vertical={false}>
              <Flex className={styles.inputLeftWrap} align="center" gap={4}>
                <Image preview={false} src={IMAGES.logo} width={20} height={20} />
                <Text>ZkSats</Text>
              </Flex>
              <Flex flex={1} align="end" vertical>
                <Flex className="t3">Receive</Flex>
                <Text className="f16 fw5">{getFieldValue('toAmount') ? removeTrailingZeros(getFieldValue('toAmount').toFixed(8)) : 0}</Text>
              </Flex>
            </Flex>
          )}
        </Form.Item>

        <Form.Item style={{ marginTop: '40px' }}>
          <Button block size="large" type="primary" htmlType="submit" disabled={!connected || isSignatured}>
            {!connected ? 'Please Connect Wallet' : 'Confirm'}
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
