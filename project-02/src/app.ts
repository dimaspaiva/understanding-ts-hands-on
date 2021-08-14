import axios from "axios";

export type GoogleGeoCodingResponse = {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
  status: "OK" | "ZERO_RESULTS";
};

const form = document.querySelector("form")!;
const addressInput = document.getElementById(
  "address"
)! as HTMLInputElement;

const GOOGLE_API = "YOU_GOOGLE_API";

const searchAddressHandler = (event: Event) => {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  axios
    .get<GoogleGeoCodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API}`
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Could note fetch location!");
      }
      const coordinates = response.data.results.map(
        (result) => result.geometry.location
      );
      const map = new google.maps.Map(document.getElementById("map")!, {
        center: { lat: coordinates[0].lat, lng: coordinates[0].lng },
        zoom: 16,
      });
      new google.maps.Marker({
        position: coordinates[0],
        map: map,
      });
      console.log(coordinates);
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
};

form.addEventListener("submit", searchAddressHandler);
