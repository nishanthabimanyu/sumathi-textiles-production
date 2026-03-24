import { getStoryblokApi } from "@/lib/storyblok";
import HomeFallback from "@/components/HomeFallback";
import SareesFallback from "@/components/SareesFallback";
import ProductDetailFallback from "@/components/ProductDetailFallback";
import CartFallback from "@/components/CartFallback";
import AboutFallback from "@/components/AboutFallback";
import ConciergeFallback from "@/components/ConciergeFallback";
import CheckoutFallback from "@/components/CheckoutFallback";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content.server";

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug ? resolvedParams.slug.join("/") : "home";
  
  const storyblokApi = getStoryblokApi();
  const content = getContent();
  
  let Component = (
    <main className="p-8 text-center text-red-500">
      <h1 className="text-2xl font-bold">404 - Noble Page Not Found</h1>
      <p>The story for "{slug}" is yet to be written.</p>
    </main>
  );

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: "draft",
    });

    Component = (
      <main className="p-8">
        <h1 className="text-4xl font-bold mb-4">{data.story.name}</h1>
        <p className="text-stone-400">Content Loaded via Storyblok API.</p>
      </main>
    );
  } catch (err) {
    if (slug === "home") {
      Component = <HomeFallback content={content} />;
    } else if (slug === "sarees") {
      Component = <SareesFallback />;
    } else if (slug === "new-arrivals") {
      Component = <SareesFallback title="New Arrivals" />;
    } else if (slug.startsWith("product/")) {
      const productSlug = slug.split("/")[1];
      Component = <ProductDetailFallback slug={productSlug} />;
    } else if (slug === "cart") {
      Component = <CartFallback />;
    } else if (slug === "about") {
      Component = <AboutFallback />;
    } else if (slug === "concierge") {
      Component = <ConciergeFallback />;
    } else if (slug === "checkout") {
      Component = <CheckoutFallback />;
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-earthy-brown text-creamy-ivory">
      <Navbar content={content} />
      <div className="flex-grow">{Component}</div>
      <Footer content={content} />
    </div>
  );
}
