import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page" style={{ display: "block", padding: "80px 32px" }}>
      <h1 className="profile-name">Sahifa topilmadi</h1>
      <p className="muted">Bunday foydalanuvchi yoki sahifa yo'q.</p>
      <p><Link href="/" className="link">Bosh sahifaga qaytish</Link></p>
    </div>
  );
}
