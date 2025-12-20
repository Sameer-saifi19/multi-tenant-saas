// app/posts/[id]/page.tsx
export default function PostPage({ params }: { params: { slug: string } }) {
  return <div>Post ID: {params.slug}</div>;
}
