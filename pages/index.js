import SearchInput from "../components/SearchInput";
import Head from "next/head";

const Home = () => {
  return (
    <div>
      <Head>
        <title>UniSearch</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Descripción de la página web" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Londrina+Shadow&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <SearchInput />
      </div>
    </div>
  );
};

export default Home;
