# **`How to deploy react frontend`**

1. Check build
   - `npm run build`
   - `npx serve -s build`
2. Login to Netlify, go to "Add new site"
3. Connect to GitHub, pick the repository you want to deploy
4. Configure build settings
   - Base directory : `intdesk_frontend`
   - Build command : `npm run build`
   - Publish directory : `intdesk_frontend/build`
5. Since react is a single page application, we need to set the "Redirects". Put the `netlify.toml` file in the root directory of the repository. The file should contain the following:
   ```
   [[redirects]]
   from = "/*"
   to = "/index.html"
   status = 200
   force = false
   ```
