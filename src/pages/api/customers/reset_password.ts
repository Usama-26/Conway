import {setLicenseDB} from 'server/db';
import customerModel from 'server/models/customerModel';
import type {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!(await setLicenseDB(req.headers.host))) {
    return res.status(404).json({});
  }
  const created = await customerModel.resetPassword(req.body);
  if (created === 'TOKEN_EXPIRED')
    return res.status(422).json({message: 'Token has been expired.'});
  else if (created)
    return res.status(200).json({message: 'Password updated successfully.'});
  return res.status(404).json({message: 'Not found'});
}
