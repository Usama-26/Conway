import customFormModel from 'server/models/customFormModel';
import type {NextApiRequest, NextApiResponse} from 'next';
import {withLicenseDB} from 'server/middlewares/withLicenseDB';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: {id, name},
    method,
  } = req;
  console.log('query', req.query);
  // await setLicenseDB(req.headers?.host);
  switch (method) {
    case 'GET': {
      // Get data from your database
      const record = await customFormModel.findFirst(`id=${id}`);
      console.log(record);
      res.status(200).json(record);
      break;
    }
    case 'PUT':
      // Update or create data in your database
      res.status(200).json({id, name: name || `User ${id}`});
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default withLicenseDB(handler);
