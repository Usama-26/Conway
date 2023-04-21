import type {NextApiRequest, NextApiResponse} from 'next';
import {withLicenseDB} from 'server/middlewares/withLicenseDB';
import productModel from 'server/models/productModel';

async function handler(_req: NextApiRequest, res: NextApiResponse) {
  // Get data from your database
  res.status(200).json(await productModel.find({}));
}

export default withLicenseDB(handler);
