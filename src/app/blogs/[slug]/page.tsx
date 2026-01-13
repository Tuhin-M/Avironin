import PostDetailView from "@/views/PostDetailView";

export default async function BlogPage({ params }: { params: { slug: string } }) {
    return <PostDetailView slug={params.slug} type="blog" />;
}
