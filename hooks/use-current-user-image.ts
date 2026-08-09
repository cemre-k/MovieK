import { useEffect, useState } from 'react'

import { createClient } from '@/lib/client'
import { supabase } from '@/utils/supabase'

export const useCurrentUserImage = () => {
  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserImage = async () => {
      const { data, error } = await createClient().auth.getSession()
      if (error) {
        console.error(error)
      }

      const { data:imgData } = supabase
      .storage
      .from('profile_pictures')
      .getPublicUrl(data.session?.user.user_metadata.avatar_url)

      setImage(imgData.publicUrl)
    }
    fetchUserImage()
  }, [])

  return image
}
