import {Html, Head, Main, NextScript} from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* <link rel="stylesheet" href="http://127.0.0.1:8000/admin-assets/css/bootstrap.min.css" />
                <link rel="stylesheet" href="http://127.0.0.1:8000/admin-assets/css/icons.min.css" />
                <link rel="stylesheet" href="http://127.0.0.1:8000/admin-assets/css/app.min.css" /> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bitter:wght@100;200;300;400;500;600;700;800;900&family=PT+Sans:wght@400;700&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
