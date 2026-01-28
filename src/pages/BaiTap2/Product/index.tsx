import React, { useMemo, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Space, message, Popconfirm, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface SanPham {
	id: number;
	name: string;
	category: string;
	price: number;
	quantity: number;
}

export default function Product() {
	const [sanPham, setSanPham] = useState([
		{ id: 1, name: 'Laptop Dell XPS 13', category: 'Laptop', price: 25000000, quantity: 15 },
		{ id: 2, name: 'iPhone 15 Pro Max', category: 'Điện thoại', price: 30000000, quantity: 8 },
		{ id: 3, name: 'Samsung Galaxy S24', category: 'Điện thoại', price: 22000000, quantity: 20 },
		{ id: 4, name: 'iPad Air M2', category: 'Máy tính bảng', price: 18000000, quantity: 5 },
		{ id: 5, name: 'MacBook Air M3', category: 'Laptop', price: 28000000, quantity: 12 },
		{ id: 6, name: 'AirPods Pro 2', category: 'Phụ kiện', price: 6000000, quantity: 0 },
		{ id: 7, name: 'Samsung Galaxy Tab S9', category: 'Máy tính bảng', price: 15000000, quantity: 7 },
		{ id: 8, name: 'Logitech MX Master 3', category: 'Phụ kiện', price: 2500000, quantity: 25 },
	]);

	const [openModal, setOpenModal] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [form] = Form.useForm();
	const [updateID, setUpdateID] = useState<number | null>(null);

	const filteredData = useMemo(() => {
		return sanPham.filter((sp) => sp.name.toLowerCase().includes(searchText.toLowerCase()));
	}, [sanPham, searchText]);

	const handleAdd = (values: Omit<SanPham, 'id'>) => {
		const newProduct: SanPham = {
			id: Date.now(),
			...values,
		};

		setSanPham([...sanPham, newProduct]);
		message.success('Them thanh cong');
		form.resetFields();
		setOpenModal(false);
	};

	const handleDelete = (id: number) => {
		setSanPham(sanPham.filter((sp) => sp.id !== id));
		message.success('Xoa thanh cong');
	};

	const handleUpdate = (value: Omit<SanPham, 'id'>) => {
		setSanPham(sanPham.map((sp) => (sp.id === updateID ? { ...sp, ...value } : sp)));
		message.success('Cap nhat thanh cong');
		setOpenModal(false);
		setUpdateID(null);
		form.resetFields();
	};

	const columns: ColumnsType<SanPham> = [
		{
			title: 'STT',
			width: 60,
			render: (_, __, index) => index + 1,
		},
		{
			title: 'Ten san pham',
			dataIndex: 'name',
		},
		{
			title: 'Danh Muc',
			dataIndex: 'category',
		},
		{
			title: 'Gia',
			dataIndex: 'price',
			render: (price: number) => price.toLocaleString('vi-VN') + ' d',
		},
		{
			title: 'So luong',
			dataIndex: 'quantity',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'quantity',
			render: (quantity: number) => {
				if (quantity > 10) {
					return <Tag color='green'>Còn hàng</Tag>;
				}
				if (quantity >= 1) {
					return <Tag color='orange'>Sắp hết</Tag>;
				}
				return <Tag color='red'>Hết hàng</Tag>;
			},
		},

		{
			title: 'Thao tac',
			render: (_, record) => (
				<Space>
					<Popconfirm title='Chac chan xoa khong' onConfirm={() => handleDelete(record.id)}>
						<Button danger size='small'>
							Xoa
						</Button>
					</Popconfirm>
					<Button
						danger
						size='small'
						onClick={() => {
							setUpdateID(record.id);
							form.setFieldsValue(record);
							setOpenModal(true);
						}}
					>
						Sua
					</Button>
				</Space>
			),
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
					Them san pham
				</Button>
			</Space>

			<Table
				rowKey='id'
				columns={columns}
				dataSource={filteredData}
				bordered
				pagination={{
					// Dùng để phân trang
					pageSize: 5, // 5 dòng
					showSizeChanger: false,
				}}
			/>
			<Modal
				title='them san pham moi'
				visible={openModal}
				onCancel={() => setOpenModal(false)}
				okText='them'
				cancelText='Huy'
				onOk={() => form.submit()}
			>
				<Form form={form} layout='vertical' onFinish={updateID == null ? handleAdd : handleUpdate}>
					<Form.Item
						label='Tên sản phẩm'
						name='name'
						rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='Danh Muc'
						name='category'
						rules={[{ required: true, message: 'Vui long nhap ten danh muc' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='Giá'
						name='price'
						rules={[
							{ required: true, message: 'Vui lòng nhập giá' },
							{ type: 'number', min: 1, message: 'Giá phải là số dương' },
						]}
					>
						<InputNumber style={{ width: '100%' }} min={1} />
					</Form.Item>

					<Form.Item
						label='Số lượng'
						name='quantity'
						rules={[
							{ required: true, message: 'Vui lòng nhập số lượng' },
							{
								type: 'number',
								min: 0,
								message: 'Số lượng phải là số nguyên dương',
							},
						]}
					>
						<InputNumber style={{ width: '100%' }} min={0} precision={0} />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

