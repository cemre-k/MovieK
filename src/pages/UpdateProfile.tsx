import { useState, type ChangeEvent, type FormEvent } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

type ProfileFormState = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profilePhotoUrl: string;
  birthDate: string;
};

const initialFormState: ProfileFormState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  profilePhotoUrl: "",
  birthDate: "",
};

function UpdateProfile() {
  const { supabase, user } = useAuth();

  const createProfileFormState = () => {
    if (!user) {
      return initialFormState;
    }

    const metadata = (user.user_metadata ?? {}) as Record<string, unknown>;
    const fullName =
      typeof metadata.full_name === "string" ? metadata.full_name : "";
    const nameParts = fullName.trim().split(/\s+/).filter(Boolean);

    return {
      firstName: nameParts[0] ?? "",
      lastName: nameParts.slice(1).join(" ") ?? "",
      username: typeof metadata.username === "string" ? metadata.username : "",
      email: user.email ?? "",
      profilePhotoUrl:
        typeof metadata.avatar_url === "string" ? metadata.avatar_url : "",
      birthDate:
        typeof metadata.birth_date === "string" ? metadata.birth_date : "",
    };
  };

  const [formData, setFormData] = useState<ProfileFormState>(
    createProfileFormState,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange =
    (field: keyof ProfileFormState) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const fullName = [formData.firstName.trim(), formData.lastName.trim()]
        .filter(Boolean)
        .join(" ");

      const { error } = await supabase.auth.updateUser({
        email: formData.email.trim(),
        data: {
          full_name: fullName,
          username: formData.username.trim(),
          avatar_url: formData.profilePhotoUrl.trim(),
          birth_date: formData.birthDate,
        },
      });

      if (error) {
        throw error;
      }

      setMessage("Profil bilgileri başarıyla güncellendi.");
    } catch (error: unknown) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Profil güncellenirken bir hata oluştu.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const initials = [formData.firstName, formData.lastName]
    .filter(Boolean)
    .join(" ")
    .trim()
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className='mt-16 flex flex-1 items-center justify-center px-4 py-8'>
      <Card className='w-full max-w-3xl  bg-background/90 shadow-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>
            Profil bilgilerini güncelle
          </CardTitle>
          <CardDescription>
            İsim, soyisim, kullanıcı adı, e-posta, profil fotoğrafı ve doğum
            tarihini güncelleyebilirsiniz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className='space-y-6'
          >
            <div className='flex flex-col gap-4 rounded-lg border border-dashed border-border/70 bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between'>
              <div className='flex items-center gap-3'>
                <Avatar size='lg'>
                  {formData.profilePhotoUrl ? (
                    <AvatarImage
                      src={formData.profilePhotoUrl}
                      alt={formData.firstName || "Profil fotoğrafı"}
                    />
                  ) : null}
                  <AvatarFallback>{initials || "U"}</AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-medium'>Profil fotoğrafı</p>
                  <p className='text-xs text-muted-foreground'>
                    Fotoğraf URL&apos;sini ekleyip önizleyebilirsiniz.
                  </p>
                </div>
              </div>

              <div className='w-full sm:max-w-sm'>
                <Label htmlFor='profilePhotoUrl'>Profil fotoğrafı URL</Label>
                <Input
                  id='profilePhotoUrl'
                  type='url'
                  placeholder='https://example.com/avatar.jpg'
                  value={formData.profilePhotoUrl}
                  onChange={handleChange("profilePhotoUrl")}
                />
              </div>
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              <div className='grid gap-2'>
                <Label htmlFor='firstName'>İsim</Label>
                <Input
                  id='firstName'
                  placeholder='İsim'
                  value={formData.firstName}
                  onChange={handleChange("firstName")}
                  required
                />
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='lastName'>Soyisim</Label>
                <Input
                  id='lastName'
                  placeholder='Soyisim'
                  value={formData.lastName}
                  onChange={handleChange("lastName")}
                  required
                />
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='username'>Kullanıcı adı</Label>
                <Input
                  id='username'
                  placeholder='kullaniciadi'
                  value={formData.username}
                  onChange={handleChange("username")}
                  required
                />
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='email'>E-posta</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='ornek@mail.com'
                  value={formData.email}
                  onChange={handleChange("email")}
                  required
                />
              </div>

              <div className='grid gap-2 md:col-span-2'>
                <Label htmlFor='birthDate'>Doğum tarihi</Label>
                <Input
                  id='birthDate'
                  type='date'
                  value={formData.birthDate}
                  onChange={handleChange("birthDate")}
                  required
                />
              </div>
            </div>

            {message ? (
              <p
                className={`text-sm ${message.includes("başarıyla") ? "text-emerald-500" : "text-red-500"}`}
              >
                {message}
              </p>
            ) : null}

            <div className='flex justify-end'>
              <Button
                type='submit'
                disabled={isLoading}
              >
                {isLoading ? "Kaydediliyor..." : "Kaydet"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default UpdateProfile;
