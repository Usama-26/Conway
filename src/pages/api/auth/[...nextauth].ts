import {IncomingMessage} from 'http';
import NextAuth, {Session, User} from 'next-auth';
import {JWT} from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import {setLicenseDB} from 'server/db';
import customerModel from 'server/models/customerModel';
import userModel from 'server/models/userModel';
import {UserData} from '_types/next-auth';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {label: 'Email', type: 'text', placeholder: 'john'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials, req) {
        if (!(await setLicenseDB(req.headers?.host))) {
          return null;
        }
        const user: any = await customerModel.findByCredentials(credentials);
        console.log('user auth', user);
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user as unknown as User;
        } else {
          // If you return null or false then the credentials will be rejected
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt(params) {
      return {
        ...params.token,
        ...params.user,
      };
    },
    async session({session, token}) {
      token = token satisfies JWT;

      if (!token) {
        return session;
      }

      const user = {
        id: token.id,
        email: token.email,
        first_name: token.first_name,
        last_name: token.last_name,
        email_verified_at: token.email_verified_at,
        company_id: token.company_id,
        status: token.status,
        phone: token.phone,
        locked: token.locked,
        address: token.address,
      };

      return {
        ...session,
        user: {
          ...session.user,
          ...(user || undefined),
        },
      } as Session;
    },
  },
  // session: {strategy: 'jwt'},
  // secret: process.env.JWT_SECRET,
});
