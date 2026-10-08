export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="sl">
  <head>
    <meta charset="utf-8" />
    <title>Stran se ni naložila — Le Cité</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 16px/1.6 Georgia, "Times New Roman", serif; background: #1B4332; color: #FAF7F2; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; box-sizing: border-box; }
      .card { max-width: 30rem; width: 100%; text-align: center; }
      .brand { letter-spacing: 0.3em; font-size: 1.4rem; color: #FAF7F2; text-decoration: none; }
      .code { margin: 3rem 0 0.75rem; font: 11px system-ui, sans-serif; letter-spacing: 0.18em; text-transform: uppercase; color: #B5884A; }
      h1 { font-weight: 400; font-size: 2.25rem; line-height: 1.2; margin: 0; }
      .rule { width: 4rem; height: 1px; background: #B5884A; margin: 2rem auto; }
      p { font-style: italic; color: rgba(250, 247, 242, 0.8); margin: 0 0 2.5rem; }
      .actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
      a.btn, button { font: 12px system-ui, sans-serif; letter-spacing: 0.18em; text-transform: uppercase; padding: 0.9rem 1.75rem; border: 1px solid #B5884A; background: transparent; color: #FAF7F2; cursor: pointer; text-decoration: none; }
      a.btn:hover, button:hover { background: #B5884A; }
    </style>
  </head>
  <body>
    <div class="card">
      <a class="brand" href="/">LE CITÉ</a>
      <div class="code">Errore · Something went wrong</div>
      <h1>Stran se ni naložila</h1>
      <div class="rule"></div>
      <p>Pri nas je šlo nekaj narobe. Poskusite znova ali se vrnite na začetno stran.</p>
      <div class="actions">
        <button onclick="location.reload()">Poskusi znova</button>
        <a class="btn" href="/">Na začetno stran</a>
      </div>
    </div>
  </body>
</html>`;
}
