import PostDetailView from "@/views/PostDetailView";


export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <PostDetailView slug={slug} type="essay" />;
}
