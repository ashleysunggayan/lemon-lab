# From Heritage to Handcraft

A static, responsive website concept for **Lemon Lab Pottery Studio** in the First United Building, Escolta, Manila.

The site connects Lemon Lab's pottery activities with a proposed heritage interpretation experience centered on the First United (Perez-Samanillo) Building.

## Project structure

```text
.
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── lemon-lab-heritage.svg
│   └── lemon-lab-mark.svg
├── .nojekyll
└── README.md
```

## Preview

Use GitHub Pages after publishing, or use the static-site preview feature in your editor. The project has no packages, build step, or framework dependencies.

## Publish with GitHub Pages

After the content has been approved and the repository has been committed and pushed:

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the publishing branch (usually `main`) and the `/ (root)` folder.
5. Save and wait for GitHub Pages to publish the site.

Because `index.html` is in the repository root and all internal assets use relative paths, the site works for both user/organization Pages and project Pages.

## Collaborator editing

The floating **Edit site** button on the published page opens this repository in GitHub's authenticated web editor. Only GitHub users with write access to the repository can save changes to `main`.

For an approved collaborator:

1. Sign in to GitHub and select **Edit site** on the live page.
2. Edit `index.html`, `css/styles.css`, `js/main.js`, or files in `assets/`.
3. Open **Source Control** in the web editor.
4. Enter a clear commit message, then commit and sync the changes to `main`.
5. GitHub Pages automatically starts a new deployment. Check the repository's **Actions** or **Settings → Pages** screen for status.

Repository owners can grant or remove collaborator access in **Settings → Collaborators**. Do not add access tokens, passwords, or other secrets to this public repository.

## Editing notes

- Page content and section order are in `index.html`.
- Colors, layout, components, and responsive styles are in `css/styles.css`.
- Mobile navigation and scroll-in animations are in `js/main.js`.
- Original vector artwork is stored in `assets/` and can be edited as SVG.
- External class, booking, social, and source links should be rechecked before publication.
- Historical details, business information, permissions, class availability, pricing, and schedules should be verified with Lemon Lab and First United Building management before launch.

## Technology

Plain HTML, CSS, JavaScript, and SVG only. No framework or build system is required.
