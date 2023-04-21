import customerModel from 'server/models/customerModel';
import type {NextApiRequest, NextApiResponse} from 'next';
import {withLicenseDB} from 'server/middlewares/withLicenseDB';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({});
  }

  const {token, email} = req.body;

  if (!token || !email) {
    return res.status(422).json({message: 'Invalid body'});
  }

  const verified = await customerModel.verifyEmail(
    token as string,
    email as string
  );
  if (verified) {
    return res.status(200).json({message: 'Verified email'});
  }
  return res.status(500).json({message: 'Unable to verify email.'});
}

export default withLicenseDB(handler);
