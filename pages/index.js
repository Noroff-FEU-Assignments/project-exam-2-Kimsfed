import Head from "../components/layout/head";
import Heading from "../components/layout/heading";
import HotelsDisplay from "../components/layout/hotelsDisplay";

import { API_URL } from "../components/api/url";

export default function Home({ hotels }) {
  return (
    <div>
      <Head title="Home" />

      <Heading title="Holidaze" />

      <HotelsDisplay hotels={hotels} />
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch(`${API_URL}/hotels/`);
  const hotels = await response.json();

  return {
    props: {
      hotels,
    },
  };
}
