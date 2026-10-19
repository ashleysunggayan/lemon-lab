# Editing and deploying the Lemon Lab site

This website uses GitHub's authenticated web editor and GitHub Pages. The public website contains no repository credential or access token.

## Before editing

The repository owner must add each editor as a collaborator with write access under **Repository Settings → Collaborators**. Only approved collaborators can commit changes directly.

## Edit from the live website

1. Select the floating **Edit site** button on the live website.
2. Sign in to the approved GitHub account if prompted.
3. Update the appropriate file:
   - `index.html` for wording, links, and page sections
   - `css/styles.css` for colors and layout
   - `js/main.js` for navigation and interactive behavior
   - `assets/` for the local SVG artwork
4. Review the changes in the web editor.
5. Open **Source Control**, enter a commit message, and commit and sync to `main`.

## Automatic deployment

Every commit pushed to `main` triggers a GitHub Pages deployment. The live website normally updates after the Pages build finishes. Deployment progress and failures appear in the repository's **Actions** tab and under **Settings → Pages**.

## Safety

- Grant write access only to trusted editors.
- Never place passwords, access tokens, API keys, or private information in this public repository.
- Review substantial edits before committing them to `main`.
- Git history can be used to inspect and revert unwanted changes.
