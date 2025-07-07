export const getSitesByCountry = (country) => {
  switch (country.toUpperCase()) {
    case "US":
      return ["amazon.in", "flipkart.com"];
    case "IN":
      return ["amazon.in", "flipkart.com"];
    default:
      return ["amazon.in"];
  }
};
