import Link from "next/link";
import Avatar from "./Avatar";
import type { Post, User } from "@/lib/types";
import { title, excerpt, readTime, postDate, claps, replies, topic } from "@/lib/format";

interface PostCardProps {
  post: Post;
  author: User;
}

export default function PostCard({ post, author }: PostCardProps) {
  return (
    <article className="post">
      <div className="post-body">
        <Link href={`/profile/${author.id}`} className="post-author">
          <Avatar name={author.name} id={author.id} size={24} />
          <span>{author.name}</span>
          <span className="muted">· {postDate(post.id)}</span>
        </Link>
        <h2 className="post-title">{title(post.title)}</h2>
        <p className="post-excerpt">{excerpt(post.body)}</p>
        <div className="post-meta">
          <span className="chip">{topic(post.id)}</span>
          <span className="muted">{readTime(post.body)}</span>
          <span className="muted">👏 {claps(post.id)}</span>
          <span className="muted">💬 {replies(post.id)}</span>
        </div>
      </div>
      <img
        className="post-thumb"
        src={`https://picsum.photos/seed/medium-${post.id}/320/220`}
        alt=""
        loading="lazy"
        width={160}
        height={110}
      />
    </article>
  );
}
