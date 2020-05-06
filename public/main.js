// Foursquare API Info
const clientId = "FQVS433X4EK4HREHMI3YC2MMEZG5EHXLSCRMM0GIBXXZO3RD";
const clientSecret = "TVXJVCROMNMO3CF0B3WZUHBRGHU03KUUNSTC4ETCAA2WFKBI";
const url = "https://api.foursquare.com/v2/venues/explore?near=";

// OpenWeather Info
const openWeatherKey = "f13a836b3687748d3414ec212e841ea9";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";

// Page Elements
const $input = $("#city");
const $submit = $("#button");
const $destination = $("#destination");
const $container = $(".container");
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3")];
const $weatherDiv = $("#weather1");
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Add AJAX functions here:
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = `${url}${city}&limit=30&client_id=${clientId}&client_secret=${clientSecret}&v=20200504`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const items = jsonResponse.response.groups[0].items
      const random = Math.floor(Math.random() * items.length)
      const randomVenues = [];
      for (let i = 0; i < 3; i++) {
        random.push(items[random].venue)       
      }
      return randomVenues
    }
  } catch (error) {
    console.log(error);
  }
};

const getForecast = async () => {
  try {
    const urlToFetch = `${weatherUrl}?q=${$input.val()}&appid=${openWeatherKey}`;
    const response = await fetch(urlToFetch)
    if (response.ok) {
      const jsonResponse = await response.json(); 
      return jsonResponse
    }
  } catch (error) {
    console.log(error)
  }
};

// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
    const venue = venues[index]
    const venueIcon = venue.categories[0].icon
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`
    let venueContent = `<h2>${venue.name}</h2>
    <img class="venueimage" src="${venueImgSrc}"/>
    <h3>Address:</h3>
    <p>${venue.location.formattedAddress[0]}</p>
    <p>${venue.location.city}</p>
    <p>${venue.location.country}</p>`
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
};

const renderForecast = (day) => {
  const weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
};

const executeSearch = () => {
  $venueDivs.forEach((venue) => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues()
  .then(venues => renderVenues(venues))
  getForecast()
  .then(forecast => renderForecast(forecast))
  return false;
};

$submit.click(executeSearch);
