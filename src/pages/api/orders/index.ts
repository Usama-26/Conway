import type {NextApiRequest, NextApiResponse} from 'next';
import {withLicenseDB} from 'server/middlewares/withLicenseDB';
import orderModel from 'server/models/orderModel';
import orderService from 'server/services/orderService';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('method', req.method);
  if (req.method === 'GET') {
    res.status(200).json(await orderModel.find({}));
  } else if (req.method === 'POST') {
    res.status(200).json(await orderService.createOrder(req.body));
    // handle POST request
  } else {
    // handle other request methods
  }
  // Get data from your database
}

export default withLicenseDB(handler);
