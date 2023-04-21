import type {NextApiRequest, NextApiResponse} from 'next';
import {withLicenseDB} from 'server/middlewares/withLicenseDB';
import categoryModel from 'server/models/categoryModel';

async function handler(_req: NextApiRequest, res: NextApiResponse) {
  // Get data from your database
  res.status(200).json(await categoryModel.find({}));
}

export default withLicenseDB(handler);
