import Link from "next/link";
import { useState } from "react";

export default function HotelsDisplay({ hotels }) {
  const [search, setSearch] = useState("");

  return (
    <div>
      <div className="border-top"></div>
      <div className="search-bar_container">
        <input
          type="text"
          placeholder="Search..."
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>
      <div className="content_container">
        {hotels // First I need to filter the hotels if the user want to search for some hotels
          .filter((hotelValue) => {
            if (search == "") {
              return hotelValue; // If nothing is written, return all hotels
            } else if (
              hotelValue.title
                .toLowerCase()
                .includes(search.toLocaleLowerCase()) // Need to make sure that everthing is lowercase
            ) {
              return hotelValue; // return the hotels that match with what the user has written
            }
          })
          .map(
            (
              hotel // Now I can loop through the hotels, and display the values I want
            ) => (
              <div key={hotel.id} className="hotel_container">
                <Link href={`/hotel/${hotel.slug}`}>
                  <a>
                    <div className="hotel-title_container"> {hotel.title}</div>
                  </a>
                </Link>
                <div>{hotel.price}kr</div>
                <div className={hotel.title}>
                  <Link href={`/hotel/${hotel.slug}`}>
                    <a>
                      {" "}
                      <img src={hotel.meta_description}></img>
                    </a>
                  </Link>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
}
