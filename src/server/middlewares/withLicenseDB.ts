import type {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import {setLicenseDB} from 'server/db';

export function withLicenseDB(handler: NextApiHandler) {
  return async function (request: NextApiRequest, response: NextApiResponse) {
    if (!(await setLicenseDB(request.headers.host)))
      return response.status(404).json({});

    return handler(request, response);
  };
}
