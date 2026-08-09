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
    console.log("metadata", metadata);
    const fullName =
      typeof metadata.full_name === "string" ? metadata.full_name : "";
    const nameParts = fullName.trim().split(/\s+/).filter(Boolean);
    const avatarPath =
      typeof metadata.avatar_url === "string" ? metadata.avatar_url : "";

    const { data } = supabase.storage
      .from("profile_pictures")
      .getPublicUrl(avatarPath);

    const avatarUrl = data.publicUrl;
    return {
      firstName: nameParts[0] ?? "",
      lastName: nameParts.slice(1).join(" ") ?? "",
      username: typeof metadata.username === "string" ? metadata.username : "",
      email: user.email ?? "",
      profilePhotoUrl: avatarUrl,
      birthDate:
        typeof metadata.birth_date === "string" ? metadata.birth_date : "",
    };
  };

  const [formData, setFormData] = useState<ProfileFormState>(
    createProfileFormState,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handlePictureSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImg = e.target.files?.[0] ?? null;
    setFile(selectedImg);
  };

  const handleChange =
    (field: keyof ProfileFormState) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const uploadProfilePicture = async (
    file: File,
    userId: string,
  ): Promise<string | undefined> => {
    const extension = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${extension}`;
    const filePath = `${userId}/${fileName}`;

    const { data, error } = await supabase.storage
      .from("profile_pictures")
      .upload(filePath, file);

    if (error) {
      console.error("Upload failed:", error);
      return;
    }

    console.log("Uploaded:", data.path);
    return data.path;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    let imgPath = formData.profilePhotoUrl;

    try {
      if (file && user) {
        const path = await uploadProfilePicture(file, user.id);
        if (path) {
          imgPath = path;
        }
      }
      const fullName = [formData.firstName.trim(), formData.lastName.trim()]
        .filter(Boolean)
        .join(" ");

      const { error } = await supabase.auth.updateUser({
        email: formData.email.trim(),
        data: {
          full_name: fullName,
          username: formData.username.trim(),
          avatar_url: imgPath,
          birth_date: formData.birthDate,
        },
      });

      if (error) {
        throw error;
      }

      setMessage("Profile information updated successfully.");
    } catch (error: unknown) {
      setMessage(
        error instanceof Error
          ? error.message
          : "An error occurred while updating the profile.",
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

  console.log(formData.profilePhotoUrl);

  return (
    <div className='mt-16 flex flex-1 items-center justify-center px-4 py-8'>
      <Card className='w-full max-w-3xl bg-background/90 shadow-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Update Profile Information</CardTitle>
          <CardDescription>
            You can update your first name, last name, username, email, profile
            photo, and birth date.
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
                      alt={formData.firstName || "Profile photo"}
                    />
                  ) : null}
                  <AvatarFallback>{initials || "U"}</AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-medium'>Profile photo</p>
                  <p className='text-xs text-muted-foreground'>
                    You can add and preview a photo URL.
                  </p>
                </div>
              </div>

              <div className='w-full sm:max-w-sm gap-2 flex-col flex'>
                <Label htmlFor='profilePic'>Update profile photo</Label>
                <Input
                  id='profilePic'
                  type='file'
                  accept='image/*'
                  onChange={handlePictureSelect}
                />
              </div>
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              <div className='grid gap-2'>
                <Label htmlFor='firstName'>First Name</Label>
                <Input
                  id='firstName'
                  placeholder='First Name'
                  value={formData.firstName}
                  onChange={handleChange("firstName")}
                  required
                />
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='lastName'>Last Name</Label>
                <Input
                  id='lastName'
                  placeholder='Last Name'
                  value={formData.lastName}
                  onChange={handleChange("lastName")}
                  required
                />
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='username'>Username</Label>
                <Input
                  id='username'
                  placeholder='username'
                  value={formData.username}
                  onChange={handleChange("username")}
                  required
                />
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='example@mail.com'
                  value={formData.email}
                  onChange={handleChange("email")}
                  required
                />
              </div>

              <div className='grid gap-2 md:col-span-2'>
                <Label htmlFor='birthDate'>Birth Date</Label>
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
                className={`text-sm ${message.includes("successfully") ? "text-emerald-500" : "text-red-500"}`}
              >
                {message}
              </p>
            ) : null}

            <div className='flex justify-end'>
              <Button
                type='submit'
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default UpdateProfile;
