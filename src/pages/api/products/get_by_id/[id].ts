import type {NextApiRequest, NextApiResponse} from 'next';
import {withLicenseDB} from 'server/middlewares/withLicenseDB';
import productModel from 'server/models/productModel';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {id} = req.query;
  res.status(200).json(
    await productModel.findFirst({
      where: {id: id as unknown as number},
      withJoins: [
        'pt',
        'product_identifiers',
        'product_medias',
        'related_products',
        '3d_file',
        'bom_parts',
      ],
    })
  );
}

export default withLicenseDB(handler);
