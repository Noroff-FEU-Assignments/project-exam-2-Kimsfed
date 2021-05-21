import Head from "../components/layout/head";
import Heading from "../components/layout/heading";

import { API_URL } from "../components/api/url";
import { parseCookies, destroyCookie } from "nookies";
import { useState } from "react";

export default function Admin({ enquiry, contacts, jwt }) {
  const [hotelTitle, setHotelTitle] = useState("");
  const [hotelDescription, setHotelDescription] = useState("");
  const [price, setPrice] = useState("");
  let slug = hotelTitle;
  let metaTitle = hotelTitle;
  const [imageUrl, setImage] = useState("");

  async function addNewHotel() {
    const hotelData = {
      title: hotelTitle,
      description: hotelDescription,
      slug: slug,
      meta_title: metaTitle,
      meta_description: imageUrl,
      price: price,
    };

    await fetch(`${API_URL}/hotels`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(hotelData),
    });
    console.log(hotelData);
  }
  return (
    <>
      <Head title="Admin" />
      <Heading title="Holidaze" />
      <div className="border-top"></div>
      <div>
        <div className="enquiries_container">
          <h2>Enquiries</h2>
          {enquiry.map((enquiry) => (
            <div className="enquiries-messages_container" key={enquiry.id}>
              <h4> {enquiry.subject}</h4>
              <p> {enquiry.message}</p>
            </div>
          ))}
        </div>
        <div className="messages_container">
          <h2>Messages</h2>
          {contacts.map((contact) => (
            <div className="direct-messages_container" key={contact.id}>
              <h4> {contact.subject}</h4>
              <p> {contact.content}</p>
              <p> {contact.email}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="add-hotel_container">
        <h2>Add Hotel</h2>
        <form>
          <input
            type="text"
            onChange={(title) => setHotelTitle(title.target.value)}
            value={hotelTitle}
            placeholder="Title"
          />
          <textarea
            onChange={(description) =>
              setHotelDescription(description.target.value)
            }
            value={hotelDescription}
            placeholder="Hotel Description"
          />
          <input
            type="number"
            onChange={(price) => setPrice(parseFloat(price.target.value))}
            value={price}
            placeholder="Price"
          />
          <input
            type="text"
            onChange={(imageUrl) => setImage(imageUrl.target.value)}
            value={imageUrl}
            placeholder="Image Url"
          />
          <button type="button" onClick={() => addNewHotel()}>
            Add Hotel
          </button>
        </form>
      </div>
      <div className="logout_container">
        <form>
          <button onClick={handleClick}>Logout</button>
        </form>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const jwt = parseCookies(ctx).jwt;

  const responseEnquiry = await fetch(`${API_URL}/enquiries`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  const responseContactMessages = await fetch(`${API_URL}/contacts`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  const enquiries = await responseEnquiry.json();

  const contacts = await responseContactMessages.json();

  return {
    props: {
      enquiry: enquiries,
      contacts: contacts,
      jwt: jwt,
    },
  };
}

function handleClick() {
  destroyCookie(null, "jwt");
}
