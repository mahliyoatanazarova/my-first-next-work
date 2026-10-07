import type { Post, User } from "./types";
import { ME } from "./me";

const BASE = "https://jsonplaceholder.typicode.com";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(BASE + path, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`API xatosi: ${path} (${res.status})`);
  return res.json() as Promise<T>;
}

// 1-foydalanuvchi ma'lumotini sizning ismingiz bilan almashtiramiz
const withMe = (u: User): User =>
  u.id === ME.id ? { ...u, name: ME.name, username: ME.username } : u;

export const getPosts = () => get<Post[]>("/posts");
export const getUsers = async () => (await get<User[]>("/users")).map(withMe);
export const getUser = async (id: string | number) => withMe(await get<User>(`/users/${id}`));
export const getUserPosts = (id: string | number) => get<Post[]>(`/users/${id}/posts`);