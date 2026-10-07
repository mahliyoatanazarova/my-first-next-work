import Link from "next/link";
import PostCard from "@/components/PostCard";
import Avatar from "@/components/Avatar";
import FollowButton from "@/components/FollowButton";
import { getPosts, getUsers } from "@/lib/api";
import { title } from "@/lib/format";
import type { User } from "@/lib/types";

const FOLLOWING: number[] = [2, 3, 5]; 

interface HomeProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { tab = "for-you" } = await searchParams;
  const [posts, users] = await Promise.all([getPosts(), getUsers()]);
  const byId: Record<number, User> = Object.fromEntries(users.map((u) => [u.id, u]));

  const list = tab === "following" ? posts.filter((p) => FOLLOWING.includes(p.userId)) : posts;
  const picks = posts.filter((p) => [7, 23, 41].includes(p.id));
  const suggestions = users.filter((u) => u.id !== 1 && !FOLLOWING.includes(u.id)).slice(0, 3);

  return (
    <div className="page">
      <main className="feed">
        <div className="tabs">
          <Link href="/" className={tab !== "following" ? "active" : ""}>For you</Link>
          <Link href="/?tab=following" className={tab === "following" ? "active" : ""}>Following</Link>
        </div>

        {list.slice(0, 20).map((post) => (
          <PostCard key={post.id} post={post} author={byId[post.userId]} />
        ))}
      </main>

      <aside className="rail">
        <section>
          <h3 className="rail-title">Staff Picks</h3>
          {picks.map((p) => (
            <div key={p.id} className="pick">
              <Link href={`/profile/${p.userId}`} className="post-author">
                <Avatar name={byId[p.userId].name} id={p.userId} size={20} />
                <span>{byId[p.userId].name}</span>
              </Link>
              <p className="pick-title">{title(p.title)}</p>
            </div>
          ))}
        </section>

        <section>
          <h3 className="rail-title">Who to follow</h3>
          {suggestions.map((u) => (
            <div key={u.id} className="who">
              <Avatar name={u.name} id={u.id} size={40} />
              <Link href={`/profile/${u.id}`} className="who-text">
                <strong>{u.name}</strong>
                <span className="muted">{u.company.catchPhrase}</span>
              </Link>
              <FollowButton small />
            </div>
          ))}
        </section>
      </aside>
    </div>
  );
}
