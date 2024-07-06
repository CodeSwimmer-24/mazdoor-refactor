import axios from "axios";

export const hostUrl = "https://digimazdoor.tech";

export const getFavoriteSPs = async (email) => {
  const result = await axios.get(`${hostUrl}/mazdoor/v1/getFavoriteSP?userEmailId=${email}`);

  if (result.status === 200)
    return result.data;
};
