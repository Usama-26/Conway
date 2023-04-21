import customerModel from 'server/models/customerModel';
import type {NextApiRequest, NextApiResponse} from 'next';
import {withCustomValidations} from 'server/middlewares/withCustomValidations';
import {withLicenseDB} from 'server/middlewares/withLicenseDB';

async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const data = _req.body;
  delete data.password_confirmation;
  const created = await customerModel.create({data});
  if (created)
    return res.status(201).json({
      message:
        'Thank you, you will receive welcome email. Please check spam also.',
    });
  return res.status(400).json({});
}

export default withLicenseDB(withCustomValidations(1, handler));
