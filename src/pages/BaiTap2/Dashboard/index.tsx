import { Card, Row, Col } from 'antd';

export default function Dashboard() {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Tổng sản phẩm">120</Card>
      </Col>
      <Col span={8}>
        <Card title="Đơn hàng hôm nay">15</Card>
      </Col>
      <Col span={8}>
        <Card title="Doanh thu">5.200.000đ</Card>
      </Col>
    </Row>
  );
}
