import customerModel from 'server/models/customerModel';
import type {NextApiRequest, NextApiResponse} from 'next';
import {withLicenseDB} from 'server/middlewares/withLicenseDB';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {email} = req.body;
  const created = await customerModel.forgotPassword(email);
  return res
    .status(200)
    .json({message: "If username exist we'll send you reset link."});
}

export default withLicenseDB(handler);
