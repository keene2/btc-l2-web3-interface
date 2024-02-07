import { CustomFromAmoutInput } from '@/pages/Bridge/components/CustomFromAmoutInput';
import { Button, Card, Input, Typography } from 'antd';
import { useState } from 'react';

const { Title, Paragraph, Text, Link } = Typography;
export function SendBitcoin() {
  const [toAddress, setToAddress] = useState(
    'tb1qmfla5j7cpdvmswtruldgvjvk87yrflrfsf6hh0',
  );
  const [satoshis, setSatoshis] = useState(1000);
  const [txid, setTxid] = useState('');

  const handleSubmitSend = async ({ toAddress, toAmount: satoshis }) => {


    try {
      const txid = await (window as any).unisat.sendBitcoin(
        'tb1qmfla5j7cpdvmswtruldgvjvk87yrflrfsf6hh0',
        satoshis,
      );
      setTxid(txid);
    } catch (e) {
      setTxid((e as any).message);
    }
  };

  return (
    <Card size="small" title="Send Bitcoin" style={{ width: 300, margin: 10 }}>
      {/*  ------- */}
      <div style={{ textAlign: 'left', marginTop: 10 }}>
        <div style={{ fontWeight: 'bold' }}>Receiver Address:</div>
        <Input
          defaultValue={toAddress}
          onChange={(e) => {
            setToAddress(e.target.value);
          }}
        ></Input>
      </div>

      <div style={{ textAlign: 'left', marginTop: 10 }}>
        <div style={{ fontWeight: 'bold' }}>Amount: (satoshis)</div>
        <CustomFromAmoutInput
          value={satoshis}
          onChange={(value) => {
            setSatoshis(parseInt(e.target.));
          }}
        />
        {/*<Input*/}
        {/*  defaultValue={satoshis}*/}
        {/*  */}
        {/*></Input>*/}
      </div>
      <div style={{ textAlign: 'left', marginTop: 10 }}>
        <div style={{ fontWeight: 'bold' }}>txid:</div>
        <div style={{ wordWrap: 'break-word' }}>{txid}</div>
      </div>
      <Button
        style={{ marginTop: 10 }}
        onClick={async () => {
          console.log('wwwwwwwwww: ', toAddress, satoshis, unisat);
          try {
            const txid = await (window as any).unisat.sendBitcoin(
              toAddress,
              satoshis,
            );
            setTxid(txid);
          } catch (e) {
            setTxid((e as any).message);
          }
        }}
      >
        SendBitcoin
      </Button>
    </Card>
  );
}
