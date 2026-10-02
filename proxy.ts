import {NextResponse, type NextRequest} from 'next/server';

const closedHtml = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex,nofollow">
    <title>Fermé</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #0b0b0b;
        --panel: #151515;
        --text: #f4f1ea;
        --muted: #a59f94;
        --line: #3d3931;
      }

      * {
        box-sizing: border-box;
      }

      html,
      body {
        min-height: 100%;
      }

      body {
        margin: 0;
        display: grid;
        min-height: 100vh;
        place-items: center;
        background: var(--bg);
        color: var(--text);
        font-family: Arial, Helvetica, sans-serif;
      }

      main {
        width: min(86vw, 520px);
        border: 1px solid var(--line);
        background: var(--panel);
        padding: 44px 36px;
        text-align: center;
      }

      p {
        margin: 0;
        color: var(--muted);
        font-size: 0.82rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }

      h1 {
        margin: 12px 0 0;
        font-size: clamp(3rem, 14vw, 7rem);
        font-weight: 800;
        letter-spacing: 0;
        line-height: 0.9;
        text-transform: uppercase;
      }
    </style>
  </head>
  <body>
    <main aria-label="Site fermé">
      <p>Site</p>
      <h1>Fermé</h1>
    </main>
  </body>
</html>`;

export function proxy(_request: NextRequest) {
  return new NextResponse(closedHtml, {
    status: 503,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.svg).*)'],
};
