import { redirect } from "next/navigation";

// "Profile" tugmasi — joriy foydalanuvchi (id=1)
export default function MyProfile(): never {
  redirect("/profile/1");
}
