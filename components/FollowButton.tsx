"use client";
import { useState } from "react";

interface FollowButtonProps {
  small?: boolean;
}

export default function FollowButton({ small = false }: FollowButtonProps) {
  const [following, setFollowing] = useState<boolean>(false);
  return (
    <button
      type="button"
      onClick={() => setFollowing((v) => !v)}
      className={`btn-follow${following ? " on" : ""}${small ? " small" : ""}`}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
}
