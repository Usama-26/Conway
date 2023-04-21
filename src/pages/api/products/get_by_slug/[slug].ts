import type {NextApiRequest, NextApiResponse} from 'next';
import {withLicenseDB} from 'server/middlewares/withLicenseDB';
import productModel from 'server/models/productModel';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {slug} = req.query;
  res
    .status(200)
    .json(await productModel.findFirst({where: {slug: slug as string}}));
}

export default withLicenseDB(handler);
