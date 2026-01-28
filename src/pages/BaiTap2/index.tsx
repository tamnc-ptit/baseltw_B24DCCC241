import { Tabs } from 'antd';
import Product from './Product';
import Order from './Order';
import Dashboard from './Dashboard';
import Report from './Report';

const { TabPane } = Tabs;

const BaiTap2 :React.FC = () => {
	console.log(Product, Order, Dashboard, Report); // ✅ function
	console.log(typeof Product, typeof Order, typeof Dashboard, typeof Report);

	return (
		<Tabs defaultActiveKey='product'>
			<TabPane tab='Sản phẩm' key='product'>
				<Product />
			</TabPane>

			<TabPane tab='Đơn hàng' key='order'>
				<Order />
			</TabPane>

			<TabPane tab='Thống kê' key='dashboard'>
				<Dashboard />
			</TabPane>

			<TabPane tab='Báo cáo' key='report'>
				<Report />
			</TabPane>
		</Tabs>
	);
}
export default BaiTap2;