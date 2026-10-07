import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import Avatar from "@/components/Avatar";
import FollowButton from "@/components/FollowButton";
import { getUser, getUserPosts } from "@/lib/api";
import type { Post, User } from "@/lib/types";

interface ProfileProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}

export async function generateMetadata({ params }: Pick<ProfileProps, "params">): Promise<Metadata> {
  const { id } = await params;
  try {
    const u = await getUser(id);
    return { title: `${u.name} — Medium` };
  } catch {
    return { title: "Profile — Medium" };
  }
}

export default async function Profile({ params, searchParams }: ProfileProps) {
  const { id } = await params;
  const { tab = "home" } = await searchParams;

  let user: User;
  let posts: Post[];
  try {
    [user, posts] = await Promise.all([getUser(id), getUserPosts(id)]);
  } catch {
    notFound();
  }
  if (!user.id) notFound();

  const hue = (user.id * 47) % 360;
  const isMe = user.id === 1;

  return (
    <div className="page">
      <main className="feed">
        <div
          className="cover"
          style={{ background: `linear-gradient(120deg, hsl(${hue} 40% 22%), hsl(${(hue + 50) % 360} 45% 30%))` }}
        />
        <div className="profile-head">
          <Avatar name={user.name} id={user.id} size={96} />
          <div className="profile-actions">
            {isMe ? <button className="btn-outline" type="button">Edit profile</button> : <FollowButton />}
          </div>
        </div>

        <h1 className="profile-name">{user.name}</h1>
        <p className="muted">@{user.username.toLowerCase()} · {posts.length} stories</p>
        <p className="profile-bio">
          {user.company.catchPhrase}. Writing about {user.company.bs}.
        </p>

        <div className="tabs">
          <Link href={`/profile/${user.id}`} className={tab !== "about" ? "active" : ""}>Home</Link>
          <Link href={`/profile/${user.id}?tab=about`} className={tab === "about" ? "active" : ""}>About</Link>
        </div>

        {tab === "about" ? (
          <dl className="about">
            <dt>City</dt><dd>{user.address.city}</dd>
            <dt>Company</dt><dd>{user.company.name}</dd>
            <dt>Website</dt><dd>{user.website}</dd>
            <dt>Email</dt><dd>{user.email}</dd>
            <dt>Phone</dt><dd>{user.phone}</dd>
          </dl>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} author={user} />)
        )}
      </main>

      <aside className="rail">
        <section>
          <h3 className="rail-title">{user.name}</h3>
          <p className="muted">{posts.length} stories · {user.company.name}</p>
          <p className="rail-note">{user.address.city} · {user.website}</p>
        </section>
      </aside>
    </div>
  );
}
