import axios from "axios";

export const hostUrl = "https://digimazdoor.tech";

export const getLocations = async () => {
  const result = await axios.get(`${hostUrl}/mazdoor/v1/getLocationData`);

  if (result.status === 200)
    return result.data;
  else
    console.error("Failed to fetch locations data");
};

export const getFavoriteSPs = async (email) => {
  const result = await axios.get(`${hostUrl}/mazdoor/v1/getFavoriteSP?userEmailId=${email}`);

  if (result.status === 200)
    return result.data;
};

export const deleteFavoriteSp = async (email, favId) => {
  try {
    const result = await axios.delete(`${hostUrl}/mazdoor/v1/deleteFavoriteSP/${email}/${favId}`);
  } catch (err) {
    console.log(err);
  }
};
