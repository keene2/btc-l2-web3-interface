import homeBannerImg from '@/assets/home/home-banner-img.webp';
import { LINKS } from '@/consts/links';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Image, Layout, Row, Typography } from 'antd';
import { ALL_DATA } from './consts';
import s from './index.less';
const { Content } = Layout;
const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' };

export default function Ecosystem() {
  // const productsQuery = useQuery(["products"], {
  //   queryFn() {
  //     return axios.get("/api/products").then((res) => res.data);
  //   },
  // });

  return (
    <Content
      style={{
        maxWidth: '1200px',
        justifyContent: 'center',
        margin: 'auto',
        marginTop: '40px',
      }}
    >
      <Flex vertical={false} justify="space-between">
        <Flex
          gap={16}
          style={{
            flexDirection: 'column',
            width: '650px',
            paddingRight: 100,
            paddingTop: '20px',
          }}
        >
          <Typography.Title
            level={1}
            style={{ margin: 0, fontSize: '40px', fontWeight: '600' }}
          >
            Unlocking the Power of Bitcoin #OnZKSats
          </Typography.Title>
          <Typography.Text type="secondary" style={{ fontSize: '20px' }}>
            Explore decentralized apps built on ZKSats, the secure and reliable
            Bitcoin L2 solution. Discover exciting apps for finance,
            collectibles, games, and many more! Experience the future of Bitcoin
            now!
          </Typography.Text>
          <Flex>
            <Button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                flexDirection: 'row-reverse',
              }}
              shape="round"
              type="primary"
              href={LINKS.ListYourDAPPForm}
              target="_blank"
              icon={<ArrowRightOutlined className={s.arrow} />}
            >
              List Your dApp Now
            </Button>
          </Flex>
        </Flex>
        <Image width={400} height={350} src={homeBannerImg} preview={false} />
      </Flex>
      <Flex
        style={{ marginTop: '80px' }}
        justify="center"
        align="center"
        flex={1}
        vertical
      >
        <Typography.Title level={2}>Explore all dApps</Typography.Title>
        <Row gutter={[16, 16]} wrap>
          {ALL_DATA.map((item, index) => (
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              key={index}
            >
              <a href={item.href} target="_blank" className={s.card}>
                <div className="f0">
                  <Image
                    src={item.url}
                    width={60}
                    height={60}
                    preview={false}
                  />
                </div>
                <Typography.Title style={{ marginBottom: '8px' }} level={3}>
                  {item.title}
                </Typography.Title>
                <Typography.Text
                  type="secondary"
                  style={{ fontSize: '16px', lineHeight: '24px' }}
                >
                  {item.desc}
                </Typography.Text>
              </a>
            </Col>
          ))}
        </Row>
      </Flex>
    </Content>
  );
}
