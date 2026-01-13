import PostDetailView from "@/views/PostDetailView";

export default async function EssayPage({ params }: { params: { slug: string } }) {
    return <PostDetailView slug={params.slug} type="essay" />;
}
