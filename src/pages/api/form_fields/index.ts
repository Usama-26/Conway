import formFieldModel from 'server/models/formFieldModel';
import type {NextApiRequest, NextApiResponse} from 'next';
import {withLicenseDB} from 'server/middlewares/withLicenseDB';

async function handler(_req: NextApiRequest, res: NextApiResponse) {
  let where = '';
  if (_req.query?.custom_form_id) {
    where += ` custom_form_id=${_req.query.custom_form_id} `;
  }
  // Get data from your database
  res.status(200).json(await formFieldModel.find({where: where}));
}

export default withLicenseDB(handler);
