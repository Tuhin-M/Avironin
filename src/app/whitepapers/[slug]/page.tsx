import PostDetailView from "@/views/PostDetailView";

export default async function WhitePaperPage({ params }: { params: { slug: string } }) {
    return <PostDetailView slug={params.slug} type="whitepaper" />;
}
