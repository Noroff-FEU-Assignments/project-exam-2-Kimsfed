import Head from "../../components/layout/head";
import Link from "next/link";

import { API_URL } from "../../components/api/url";

import Enquiry from "../../components/layout/enquiry";

const Hotel = ({ hotel }) => {
  return (
    <div>
      <Head title={hotel.title} />
      <div className="home-navigation_container">
        <Link href="/">
          <a>
            <i className="fas fa-arrow-left"></i>
          </a>
        </Link>
      </div>
      <div className="slug_container">
        <h2>{hotel.title}</h2>
        <img src={hotel.meta_description} />
        <p className="price-tag">{hotel.price}kr</p>
        <div className="hotel_description">
          <p>{hotel.description}</p>
        </div>
      </div>
      <div className="enquiry_container">
        <Enquiry />
      </div>
    </div>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const hotel_response = await fetch(`${API_URL}/hotels/?slug=${slug}`);
  const result = await hotel_response.json();

  return {
    props: {
      hotel: result[0],
    },
  };
}
export async function getStaticPaths() {
  const hotels_response = await fetch(`${API_URL}/hotels`);
  const hotels = await hotels_response.json();
  return {
    paths: hotels.map((hotel) => ({
      params: { slug: String(hotel.slug) },
    })),
    fallback: false,
  };
}
export default Hotel;
