import {AddRFQProductData} from '@/store/reducers/cart';
import {TOrder} from '_types';
// import {closeConn} from 'server/db';
import orderModel from 'server/models/orderModel';

const createOrder = async (data: TOrder) => {
  console.log({data});
  const order = await orderModel.create(data);
  // if (order) {
  // }
  // await closeConn();
  return order;
};

const orderService = {
  createOrder,
};

export default orderService;
