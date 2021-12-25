import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://styleguide.brainly.com/203.0.0/style-guide.css"
          rel="stylesheet"
        />
        <script
          src="https://styleguide.brainly.com/images/subjects-icons-a01adb2d40.js"
          async
        ></script>
        <script
          src="https://styleguide.brainly.com/images/icons-6395e75cb2.js"
          async
        ></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
