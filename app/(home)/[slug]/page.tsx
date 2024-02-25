
"use client";

export default function SlugPage(
  {
  params: { slug },
}: {
  params: { slug: string };
}
) {
 
    return <h1>{slug}</h1>
}
