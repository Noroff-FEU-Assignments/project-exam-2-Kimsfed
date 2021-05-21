import { useState } from "react";
import { API_URL } from "../api/url";

export default function AddHotel({ jwt }) {
  const [hotelTitle, setHotelTitle] = useState("");
  const [hotelDescription, setHotelDescription] = useState("");
  const [price, setPrice] = useState("");
  let slug = hotelTitle;
  let metaTitle = hotelTitle;
  const [metaDescription, setMetaDescription] = useState("");
  const [imageurl, setImage] = useState("");

  async function addNewHotel() {
    const hotelData = {
      title: hotelTitle,
      description: hotelDescription,
      slug: slug,
      meta_title: metaTitle,
      meta_description: metaDescription,
      image: image,
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

    return (
      <>
        <div>
          <form>
            <input
              type="text"
              onChange={(title) => setHotelTitle(title.target.value)}
              value={hotelTitle}
              placeholder="Title"
            />
            <input
              type="textarea"
              onChange={(description) =>
                setHotelDescription(description.target.value)
              }
              value={hotelDescription}
              placeholder="Hotel Description"
            />
            <input
              type="text"
              onChange={(metaDescription) =>
                setMetaDescription(metaDescription.target.value)
              }
              value={metaDescription}
              placeholder="Meta Description"
            />
            <input
              type="number"
              onChange={(price) => setPrice(price.target.value)}
              value={price}
              placeholder="Price"
            />
            <input
              type="text"
              onChange={(imageurl) => setImage(imageurl.target.value)}
              value={imageurl}
              placeholder="image url"
            />
            <button type="button" onClick={() => addNewHotel()}>
              Add Hotel
            </button>
          </form>
        </div>
      </>
    );
  }
}
