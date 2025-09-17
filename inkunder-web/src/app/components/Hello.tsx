"use client";

type HelloProps = { name: string };

export default function Hello({ name }: HelloProps) {
  return <h1>Xin chào, {name}!</h1>;
}
