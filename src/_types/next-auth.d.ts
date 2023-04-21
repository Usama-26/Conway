import NextAuth from 'next-auth';
import {DefaultJWT, JWT} from 'next-auth/jwt';

type UserData = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  email_verified_at: Date | null;
  password: string;
  company_id: number | null;
  remember_token: string | null;
  created_at: Date;
  updated_at: Date | null;
  status: number;
  phone: string;
  locked: 0 | 1;
  address: string;
};

declare module 'next-auth/jwt' {
  interface JWT extends Omit<DefaultJWT, 'name'> {
    token: UserData;
  }
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserData;
  }

  interface User extends UserData {}
}
