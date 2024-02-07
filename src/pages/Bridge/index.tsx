import { Flex, Layout, Typography } from 'antd';
import { DepositWithdrawalForm } from './components/DepositWithdrawalForm';
import s from './index.less';

const { Text } = Typography;

const BridgePage = () => {
  return (
    <Layout className={s.bg}>
      <Flex className="normalPageRoot" vertical>
        <DepositWithdrawalForm />
      </Flex>
    </Layout>
  );
};

export default BridgePage;
