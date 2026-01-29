import { Table, Form, Modal, Button, Input, Space, message, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';
interface products {
	productId: number;
	productName: string;
	quantity: number;
	price: number;
}
interface OrderType {
	id: string;
	customerName: string;
	phone: string;
	address: string;
	products: products[];
	totalAmount: number;
	status: string;
	createdAt: string;
}
export default function Order() {
	const [openModal, setOpenModal] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [form] = Form.useForm();
	const [updateStatus, setUpdateStatus] = useState<number | null>(null);

	const columns: ColumnsType<OrderType> = [
		{ title: 'Mã đơn', dataIndex: 'id', align: 'center' },
		{ title: 'Khách hàng', dataIndex: 'customerName', align: 'center' },
		{ title: 'Số điện thoại', dataIndex: 'phone', align: 'center' },
		{ title: 'Địa chỉ', dataIndex: 'address', align: 'center' },
		{ title: 'Số sản phẩm', dataIndex: 'products', align: 'center', render: (products) => products.length },
		{ title: 'Tổng tiền', dataIndex: 'totalAmount', align: 'center' },
		{ title: 'Trạng thái', dataIndex: 'status', align: 'center' },
		{
			title: 'Ngày tạo',
			dataIndex: 'createdAt',
			align: 'center',
			render: (date) => new Date(date).toLocaleDateString('vi-VN'),
		},
	];

	const dataSource = [
		{
			id: 'DH001',
			customerName: 'Nguyễn Văn A',
			phone: '0912345678',
			address: '123 Nguyễn Huệ, Q1, TP.HCM',
			products: [{ productId: 1, productName: 'Laptop Dell XPS 13', quantity: 1, price: 25000000 }],
			totalAmount: 25000000,
			status: 'Chờ xử lý',
			createdAt: '2024-01-15',
		},
	];

	return (
		<>
			<Space style={{ marginBottom: 16 }}>
				<Input.Search
					placeholder='Tim'
					allowClear
					onChange={(e) => setSearchText(e.target.value)}
					style={{ width: 260 }}
				/>
				<Button
					type='primary'
					onClick={() => {
						setOpenModal(true);
					}}
				>
					Them khach hang
				</Button>
			</Space>

			<Table<OrderType> rowKey='id' columns={columns} dataSource={dataSource} bordered />
			<Modal title='Them don hang' visible={openModal} okText='Them' cancelText='Huy' onOk={() => form.submit()} onCancel={() => setOpenModal(false)}>
				<Form form={form} layout='vertical'>
					<Form.Item
						label='Ten khach hang'
						name='customerName'
						rules={[{ required: true, message: 'Vui long nhap ten khach hang' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='So dien thoai'
						name='phone'
						rules={[{ required: true, message: 'Vui long nhap sdt cua khach hang' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='Dia chi'
						name='address'
						rules={[{ required: true, message: 'Vui long nhap dia chi khach hang' }]}
					>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}

{
	/*🧠 Bảng trạng thái → kho (dễ nhớ)
Trạng thái đơn	          Kho thay đổi không?	    Giải thích
Chờ xử lý	                ❌ Không	              Chưa chắc bán
Đang giao	                ❌ Không	              Chưa kết thúc
Hoàn thành	              ✅ Trừ kho	            Giao + thu tiền xong
Đã hủy(trước hoàn thành)  ❌ Không	              Chưa bán
Đã hủy(sau hoàn thành)	  ✅ Hoàn kho	          Đã trừ rồi */
}
