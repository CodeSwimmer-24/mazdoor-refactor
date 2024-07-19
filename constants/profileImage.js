import { useAuthStore } from "../zustand/authStore";

const useProfileImage = () => {
  const { gender } = useAuthStore();

  if (gender === "M") {
    return "https://files.stickerkade.ir/7523/19.webp";
  } else {
    return "https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2022/02/06/962605803.png";
  }
};

export default useProfileImage;
