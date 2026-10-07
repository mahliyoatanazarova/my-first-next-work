interface AvatarProps {
  name: string;
  id: number;
  size?: number;
}

export default function Avatar({ name, id, size = 32 }: AvatarProps) {
  const hue = (id * 47) % 360;
  return (
    <span
      className="avatar"
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.45,
        background: `hsl(${hue} 42% 36%)`,
      }}
    >
      {name.charAt(0)}
    </span>
  );
}
