import home1000xImg from '@/assets/home/1000x.png';
import home100xImg from '@/assets/home/100x_img.png';
import homeBtcImg from '@/assets/home/bitcoin_level_security.png';
import homeCodeImg from '@/assets/home/code_img.png';
import { LINKS } from '@/consts/links';
import { isMobileAtom } from '@/states';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Flex, Image, Layout, message, Typography } from 'antd';
import { useAtomValue } from 'jotai';
import { history } from 'umi';
// import { FRIENDS_OPTIONS, GROWING_OPTIONS } from './consts';
/*100x_img.png
1000x.png
bitcoin_level_security.png
code_img.png*/
import arrorIcon from '@/assets/arrorIcon.svg';
import s from './index.less';

const { Content } = Layout;

export default function HomePage() {
  return (
    <Content className={s.home + ' m-auto'}>
      <Flex vertical gap={40} className="pb40 xs:mx-4">
        <Flex vertical align="center">
          <Typography.Text className="lg:text-4xl xs:text-2xl tc tup fw6">
            The future of decentralized <br /> applications, on Bitcoin
          </Typography.Text>
          <Typography.Text type="secondary" className="xs:mt-2">
            Build and use DeFi, NFTs, and other decentralized applications on Bitcoin, with the speed, affordability, and security of Layer
            2.
          </Typography.Text>
        </Flex>
        <div className="flex flex-row md:flex-row xs:flex-col gap-6">
          {[
            {
              title: 'Bridge',
              text: 'Bridge your assets to the ZKSats Network',
              onClick: () => {
                history.push('/bridge');
              },
            },
            {
              title: 'Build',
              text: 'Get access to our documents, and start building.',
              onClick: () => {
                window.open(LINKS.GitBook, '_blank');
              },
            },
            {
              title: 'Stake',
              text: 'Earn rewards while securing the ZKSats network',
              onClick: () => {
                message.info('comming soom');
              },
            },
          ].map((item) => (
            <Flex onClick={item.onClick} key={item.title} vertical className={s.section1Card + ' lg:px-10 lg:py-8 xs:px-6 xs:py-4'}>
              {/*//padding: 32px 24px;*/}
              {/*{ +  }*/}
              <Typography.Title level={4} className="my0">
                {item.title}
              </Typography.Title>
              <Typography.Text style={{ height: '48px', marginTop: '8px' }} type="secondary">
                {item.text}
              </Typography.Text>
              <Flex vertical={false} justify="end">
                <Image width={30} height={30} src={arrorIcon} preview={false} />
              </Flex>
            </Flex>
          ))}
        </div>
      </Flex>
      <Flex vertical align="center" className="tc xs:mx-4">
        <Typography.Text className="lg:text-3xl xs:text-2xl fw6">The first ZK Rollup Bitcoin Layer 2 network</Typography.Text>
        <Typography.Text type="secondary" className="lg:text-xl fw4 xs:mt-1 xs:text-sm">
          The Bitcoin Layer 2 network is a high-throughput, low-fee, EVM-compatible network that
          <br /> uses Bitcoin as gas.
        </Typography.Text>
      </Flex>

      <Flex vertical align="center" className={s.infoView + ' xs:mx-4'} gap={40}>
        <SectionCardInfoTemp
          title="Lightning-fast speed"
          text={`ZKSats transactions are 1,000 times faster than Bitcoin's mainnet, allowing you to send Bitcoin instantly.`}
          img={home1000xImg}
        />
        <SectionCardInfoTemp
          title="Affordable cost"
          text={`ZKSats transactions cost 100 times less than Bitcoin's mainnet, making small payments more economical.`}
          img={home100xImg}
          reverse
        />
        <SectionCardInfoTemp
          title="Bitcoin-level security"
          text={`ZKSats inherit the security of Bitcoin's mainnet, keeping your assets safe and sound.`}
          img={homeBtcImg}
        />
        <SectionCardInfoTemp
          title="EVM compatibility"
          text={`ZKSats are fully compatible with Ethereum Virtual Machine (EVM), allowing you to run any dApp.`}
          img={homeCodeImg}
          reverse
        />
      </Flex>

      {/*<Flex vertical align="center" gap={40}>*/}
      {/*  <Typography.Title level={2}>A growing and thriving ZKSats ecosystem</Typography.Title>*/}
      {/*  <Row gutter={[40, 40]}>*/}
      {/*    {GROWING_OPTIONS.map((item, index) => (*/}
      {/*      <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>*/}
      {/*        <a className={s.growingCard} href={item.url} target="_blank">*/}
      {/*          <Image preview={false} src={item.img} width={60} height={60} />*/}
      {/*          <Typography.Text className="f32 fw5 mt24">{item.title}</Typography.Text>*/}
      {/*          <Typography.Text className="mt8 f16" type="secondary">*/}
      {/*            {item.desc}*/}
      {/*          </Typography.Text>*/}
      {/*        </a>*/}
      {/*      </Col>*/}
      {/*    ))}*/}
      {/*  </Row>*/}
      {/*</Flex>*/}
      {/*<Flex vertical align="center" gap={40} className="mt80">*/}
      {/*  <Typography.Text className="f50 fw6">Friends & Investors</Typography.Text>*/}
      {/*  <Row gutter={[40, 40]}>*/}
      {/*    {FRIENDS_OPTIONS.map((item, index) => (*/}
      {/*      <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>*/}
      {/*        <Flex className={s.friendCard}>*/}
      {/*          <Image preview={false} src={item.img} width={item.width} height={item.height} />*/}
      {/*        </Flex>*/}
      {/*      </Col>*/}
      {/*    ))}*/}
      {/*  </Row>*/}
      {/*  /!*GROWING_OPTIONS.map((item,index)=>(*!/*/}
      {/*  /!*<Col span={8}>*!/*/}
      {/*  /!*    <Flex className={s.growingCard}>*!/*/}
      {/*  /!*        <Image preview={false} src={item.img} width={60} height={60} />*!/*/}
      {/*  /!*        <Typography.Text>{item.title}</Typography.Text>*!/*/}
      {/*  /!*        <Typography.Text type='secondary'>{item.desc}</Typography.Text>*!/*/}
      {/*  /!*    </Flex>*!/*/}
      {/*  /!*</Col>*!/*/}

      {/*  /!*))*!/*/}
      {/*</Flex>*/}
    </Content>
  );
}

// ZKSats transactions are 1,000 times faster than Bitcoin's mainnet, allowing you to send Bitcoin instantly.

const SectionCardInfoTemp = ({ title, text, img, reverse }) => {
  const isMobile = useAtomValue(isMobileAtom);
  return (
    <Flex className="xs:gap-1 lg:gap-36" vertical={isMobile} style={!isMobile && reverse ? { flexDirection: 'row-reverse' } : {}}>
      <Flex vertical align="start" justify="center" style={{ maxWidth: '600px' }}>
        <Flex className="lg:mb16 xs:mb-2">
          <Typography.Text className="lg:text-2xl xs:text-xl fw6">{title}</Typography.Text>
        </Flex>
        <Typography.Text className="my0 f16" type="secondary">
          {text}
        </Typography.Text>
        <Button
          type="primary"
          shape="round"
          className=" xs:mt-4 lg:mt-10"
          style={{
            // marginTop: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            flexDirection: 'row-reverse',
          }}
          icon={<ArrowRightOutlined style={{ transform: 'rotate(-45deg)' }} />}
          href={LINKS.GitBook}
          target="_blank"
        >
          Learn More
        </Button>
      </Flex>
      <Flex flex={1}>
        <img width={382} src={img} />
      </Flex>
    </Flex>
  );
};
