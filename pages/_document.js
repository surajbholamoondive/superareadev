import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/logo-icon.svg" />
        <meta name="google-site-verification" content="e_ucosF5mTizOug9IBkRxVWOpuzhx6SDQWYLeyXxDaU" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-R2WBCJJXV2"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-R2WBCJJXV2');
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
