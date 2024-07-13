import { useAuthStore } from "../zustand/authStore";

const useProfileImage = () => {
  const { gender } = useAuthStore();

  if (gender === "M") {
    return "https://files.stickerkade.ir/7523/19.webp";
  } else {
    return "https://i.pinimg.com/736x/0f/10/55/0f105565e20366e9c76dec4a16d55a2b.jpg";
  }
};

export default useProfileImage;
