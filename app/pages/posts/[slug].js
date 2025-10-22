import { fetchPosts, fetchPostBySlug } from '../../lib/api';

export async function getStaticPaths() {
  const posts = await fetchPosts();
  return {
    paths: posts.map(p => ({ params: { slug: p.slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost/headless-wp/wp-json/wp/v2/posts?slug=${params.slug}&_embed`);
  const data = await res.json();
  if (!data.length) return { notFound: true };
  return { props: { post: data[0] }, revalidate: 60 };
}

export default function Post({ post }) {
  return (
    <article className="p-8">
      <h1 className="text-3xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </article>
  );
}
