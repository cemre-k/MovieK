import { useEffect, useState } from "react";

import { supabase } from "@/utils/supabase";
import { useAuth } from "./useAuth";

export const useCurrentUserImage = () => {
  const [image, setImage] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserImage = () => {
      if (user != null) {
        const { data: imgData } = supabase.storage
          .from("profile_pictures")
          .getPublicUrl(user.user_metadata.avatar_url);

        setImage(imgData.publicUrl);
      }
    };
    fetchUserImage();
  }, [user]);

  return image;
};
