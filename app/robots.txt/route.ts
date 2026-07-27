import { silanDevProfile } from "../../lib/site/projection";

export function GET() {
  return new Response(
    `User-agent: *\nAllow: /\nSitemap: ${silanDevProfile.publicOrigin}/sitemap.xml\n`,
    {
      headers: { "content-type": "text/plain; charset=utf-8" },
    },
  );
}
