import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body className='font-Noto'>
        <Main />
        <input type='checkbox' id='my-modal' className='modal-toggle' />
        <div id='_modal' className='modal'></div>
        <NextScript />
      </body>
    </Html>
  );
}
