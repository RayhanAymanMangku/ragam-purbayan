export default async function sitemap() {
    const baseUrl = "https://purbayancraft.vercel.app"

    return [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/craft`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/profile`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
        }
    ]
}