import { fetchPosts } from '../lib/api';
import Link from 'next/link';

export async function getStaticProps() {
  const posts = await fetchPosts();
  return { props: { posts }, revalidate: 60 };
}

export default function Home({ posts }) {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">My Headless Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/posts/${post.slug}`}>
              <div dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
