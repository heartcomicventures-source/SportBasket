# sportBasket (website + phone app)

A static website that installs on your phone like an app. No build step.

## Put it online (free, about 2 minutes)
Pick one:
- **Netlify Drop**: open app.netlify.com/drop and drag this whole folder onto the page.
- **Cloudflare Pages**: Create a project → Upload assets → upload this folder.
- **GitHub Pages**: push this folder to a repo and enable Pages.
The site must be served over https (all of these do this) for "Add to Home Screen" to work.

## Install on your phone
- **iPhone (Safari)**: Share → Add to Home Screen.
- **Android (Chrome)**: menu ⋮ → Install app / Add to Home screen.

## Connect live data
Open Settings in the app, paste your API-Sports key, press Save, then Test.
The key is stored only on that device.

## If the browser blocks the API (proxy, optional)
If a refresh says the browser could not reach the API, deploy `proxy/worker.js`:
1. Cloudflare dashboard → Workers & Pages → Create → Worker → paste `proxy/worker.js` → Deploy.
2. Worker Settings → Variables and Secrets → add a Secret `API_KEY` with your key.
3. Paste the worker URL into Settings → Proxy URL in the app (leave the key field empty).
