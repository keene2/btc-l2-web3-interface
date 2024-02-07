import { Button, Flex, Image, InputNumber, Typography } from 'antd';

import { IMAGES } from '@/consts/images';
import { balanceAtom } from '@/features/unisatCore';
import { satsToBTC } from '@/helpers';
import Decimal from 'decimal.js';
import { useAtomValue } from 'jotai';
import styles from '../index.less';

const { Title, Paragraph, Text, Link } = Typography;

export const CustomFromAmoutInput = ({ value, onChange, disibled }) => {
  const balance = useAtomValue(balanceAtom);

  return (
    <>
      <Flex className={styles.fromInputTopWrap} align="center">
        <Flex className={styles.inputLeftWrap} align="center" gap={2}>
          <Image src={IMAGES.btcIcon} width={20} height={20} />
          <Text>Bitcion</Text>
        </Flex>
        <Flex flex={1} align="end" vertical>
          <Flex className="t3">Balance</Flex>
          <Text className="f16 fw5">{satsToBTC(balance?.total)}</Text>
        </Flex>
      </Flex>
      <Flex className={styles.fromInputBottomWrap} align="center" vertical>
        <InputNumber
          controls={false}
          wheel={false}
          value={value}
          min={0}
          max={satsToBTC(balance?.total)}
          disabled={disibled}
          onChange={(value) => {
            onChange(value === null ? null : new Decimal(value).toDecimalPlaces(8).toNumber());
          }}
          variant="borderless"
          className={styles.customFromInput + ' f24 fw5'}
          addonAfter={
            <Flex className={styles.suffixBox} gap={8}>
              {[
                { label: '25%', value: 0.25 },
                { label: '50%', value: 0.5 },
                { label: 'Max', value: 1 },
              ].map((item, index) => (
                <Button
                  className={styles.fastInputTag}
                  key={item.value}
                  size="small"
                  type="text"
                  onClick={() => {
                    onChange(satsToBTC(parseInt(new Decimal(item.value || 0).mul(balance.total).toString())));
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Image src={IMAGES.btcIcon} width={20} height={20} />
              <Text className={styles.suffixBoxText}>BTC</Text>
            </Flex>
          }
        />
      </Flex>
    </>
  );
};
