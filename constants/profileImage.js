import { useAuthStore } from "../zustand/authStore";
import mail from "../assets/assets/mail.png";
import femail from "../assets/assets/femail.png";

const useProfileImage = () => {
  const { gender } = useAuthStore();

  if (gender === "M") {
    return mail;
  } else if (gender === "F") {
    return femail;
  } else {
    return mail;
  }
};

export default useProfileImage;
