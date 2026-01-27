import React, { useMemo, useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Space,
  Popconfirm,
  message,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';

/* =======================
   KIỂU DỮ LIỆU SẢN PHẨM
======================= */
interface SanPham {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const BaiTap1: React.FC = () => {
  /* =======================
     STATE DANH SÁCH SẢN PHẨM
  ======================= */
  const [sanPhams, setSanPhams] = useState<SanPham[]>([
    { id: 1, name: 'Laptop Dell XPS 13', price: 25000000, quantity: 10 },
    { id: 2, name: 'iPhone 15 Pro Max', price: 30000000, quantity: 15 },
    { id: 3, name: 'Samsung Galaxy S24', price: 22000000, quantity: 20 },
    { id: 4, name: 'iPad Air M2', price: 18000000, quantity: 12 },
    { id: 5, name: 'MacBook Air M3', price: 28000000, quantity: 8 },
  ]);

  /* =======================
     STATE GIAO DIỆN
  ======================= */
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();
  const [updateID,setUpdateID] = useState<number | null>(null);

  /* =======================
     TÌM KIẾM REALTIME
  ======================= */
  const filteredData = useMemo(() => {
    return sanPhams.filter((sp) =>
      sp.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [sanPhams, searchText]);

  /* =======================
     THÊM SẢN PHẨM
  ======================= */
  const handleAddProduct = (values: Omit<SanPham, 'id'>) => {
    const newProduct: SanPham = {
      id: Date.now(),
      ...values,
    };

    setSanPhams([...sanPhams, newProduct]);
    message.success('Thêm sản phẩm thành công');
    form.resetFields();
    setOpenModal(false);
  };

  /* =======================
     XÓA SẢN PHẨM
  ======================= */
  const handleDelete = (id: number) => {
    setSanPhams(sanPhams.filter((sp) => sp.id !== id));
    message.success('Xóa sản phẩm thành công');
  };


  const handleUpdate = (value : Omit<SanPham,'id'>) =>{
    setSanPhams(
      sanPhams.map(sp => sp.id === updateID ? {...sp,...value} : sp)
      // rải cái cũ , xong rải cái mới , cái nào trùng field thì lấy của cái mới 
    )

    message.success('Cập nhật thành công');
  setOpenModal(false);
  setUpdateID(null);
  form.resetFields();
  }


  /* =======================
     CỘT TABLE
  ======================= */
  const columns: ColumnsType<SanPham> = [
    {
      title: 'STT',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: (price: number) =>
        price.toLocaleString('vi-VN') + ' đ',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'Thao tác',
      
      render: (_, record) => (
        <Space>
          
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa?"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button danger size="small">
            Xóa
          </Button>
        </Popconfirm>

        <Button danger size='small' onClick={() => {
          setUpdateID(record.id)
          form.setFieldsValue(record)
          setOpenModal(true)}}>
          SỬA
        </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* ====== SEARCH + ADD ====== */}
      <Space style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Tìm kiếm theo tên sản phẩm"
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 260 }}
        />

        <Button type="primary" onClick={() => setOpenModal(true)}>
          Thêm sản phẩm
        </Button>
      </Space>

      {/* ====== TABLE ====== */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredData}
        bordered
      />

      {/* ====== MODAL THÊM ====== */}
      <Modal
        title="Thêm sản phẩm mới"
        visible={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form 
          form={form}
          layout="vertical"
          onFinish={updateID == null ? handleAddProduct : handleUpdate}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[
              { required: true, message: 'Vui lòng nhập tên sản phẩm' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[
              { required: true, message: 'Vui lòng nhập giá' },
              { type: 'number', min: 1, message: 'Giá phải là số dương' },
            ]}
          >
            <InputNumber style={{ width: '100%' }} min={1} />
          </Form.Item>

          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[
              { required: true, message: 'Vui lòng nhập số lượng' },
              {
                type: 'number',
                min: 1,
                message: 'Số lượng phải là số nguyên dương',
              },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={1}
              precision={0}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BaiTap1;
