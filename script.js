const githubUser = "kolaricmatej";
const repoGrid = document.querySelector("#repo-grid");

function createIcons() {
  if (window.lucide) {
    window.lucide.createIcons({
      attrs: {
        "stroke-width": 1.9,
      },
    });
  }
}

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function repoLanguage(repo) {
  return repo.language || "Code";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderRepos(repos) {
  if (!repoGrid || !repos.length) return;

  repoGrid.innerHTML = repos
    .map((repo) => {
      const description =
        repo.description ||
        "Public GitHub repository with source code, project history, and implementation details.";
      const updated = formatDate(repo.pushed_at);

      return `
        <article class="repo-card">
          <div class="repo-card-top">
            <h3>${escapeHtml(repo.name)}</h3>
            <span>${escapeHtml(repoLanguage(repo))}</span>
          </div>
          <p>${escapeHtml(description)}</p>
          <div class="repo-meta" aria-label="Repository details">
            ${repo.stargazers_count ? `<span>${repo.stargazers_count} stars</span>` : ""}
            ${updated ? `<span>Updated ${updated}</span>` : ""}
          </div>
          <a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noreferrer">Open repository</a>
        </article>
      `;
    })
    .join("");
}

async function loadGitHubRepos() {
  if (!repoGrid) return;

  try {
    const response = await fetch(
      `https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=12`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
      },
    );

    if (!response.ok) return;

    const repos = await response.json();
    const visibleRepos = repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
      .slice(0, 6);

    renderRepos(visibleRepos);
  } catch {
    // The static fallback stays visible when the GitHub API is unavailable.
  }
}

function setupPrintButton() {
  const printButton = document.querySelector("[data-print]");
  if (!printButton) return;

  printButton.addEventListener("click", () => window.print());

  if (window.location.hash === "#print") {
    window.setTimeout(() => window.print(), 300);
  }
}

createIcons();
loadGitHubRepos().finally(createIcons);
setupPrintButton();
