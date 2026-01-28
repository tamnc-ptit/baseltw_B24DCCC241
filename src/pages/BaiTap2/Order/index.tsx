import { Table } from 'antd';

export default function Order() {
  const columns = [
    { title: 'Mã đơn', dataIndex: 'id' },
    { title: 'Khách hàng', dataIndex: 'customer' },
    { title: 'Tổng tiền', dataIndex: 'total' },
  ];

  const dataSource = [
    { id: 1, customer: 'Nguyễn Văn A', total: 120000 },
    { id: 2, customer: 'Trần Văn B', total: 300000 },
  ];

  return <Table rowKey="id" columns={columns} dataSource={dataSource} />;
}
