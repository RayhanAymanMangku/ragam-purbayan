import { MetadataRoute } from "next";

export default function robots():MetadataRoute.Robots {
    const baseUrl = "https://purbayancraft.vercel.app"
    return {
        rules: [
            {
                userAgent: "*",
                allow: ["/", "/craft", "/profile", "/contact"],
                disallow: ["/api/"],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`, 
    }
}