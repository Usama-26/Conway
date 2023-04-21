import {useSession} from 'next-auth/react';
// TODO: can remove it later
export default function Home() {
  const {data: session, status} = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>You are not signed in, please sign in first</div>;
  }

  return (
    <div>
      <h1>Home</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
