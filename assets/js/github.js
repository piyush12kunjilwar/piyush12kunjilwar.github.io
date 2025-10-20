(() => {
  async function fetchRepos(username) {
    const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;
    const res = await fetch(url, { headers: { 'Accept': 'application/vnd.github+json' } });
    if (!res.ok) throw new Error('GitHub API error');
    return res.json();
  }

  function repoToCard(repo) {
    const lang = repo.language ? `<span>${repo.language}</span>` : '';
    const stars = repo.stargazers_count ? `★ ${repo.stargazers_count}` : '';
    const forks = repo.forks ? `⑂ ${repo.forks}` : '';
    return `
      <article class="card">
        <div class="name">${repo.name}</div>
        <div class="desc">${repo.description || 'No description provided.'}</div>
        <div class="meta">${lang} <span>${stars}</span> <span>${forks}</span></div>
        <div style="margin-top:10px">
          <a class="btn" href="${repo.html_url}" target="_blank" rel="noreferrer">View on GitHub</a>
        </div>
      </article>
    `;
  }

  function pickFeatured(allRepos) {
    if (Array.isArray(window.__FEATURED_REPOS__) && window.__FEATURED_REPOS__.length) {
      const byName = new Map(allRepos.map(r => [r.name.toLowerCase(), r]));
      return window.__FEATURED_REPOS__.map(n => byName.get(String(n).toLowerCase())).filter(Boolean);
    }
    return allRepos
      .filter(r => !r.fork)
      .sort((a,b) => (b.stargazers_count + b.forks) - (a.stargazers_count + a.forks))
      .slice(0, 6);
  }

  async function injectFeatured() {
    const el = document.getElementById('featured-projects');
    if (!el || !window.__GITHUB_USERNAME__) return;
    try {
      const repos = await fetchRepos(window.__GITHUB_USERNAME__);
      const featured = pickFeatured(repos);
      el.innerHTML = featured.map(repoToCard).join('');
    } catch (e) {
      el.innerHTML = '<p class="sub">Unable to load featured repositories right now.</p>';
    }
  }

  let allRepos = [];
  let filteredRepos = [];

  function populateLanguageFilter(repos) {
    const languages = [...new Set(repos.map(r => r.language).filter(Boolean))].sort();
    const select = document.getElementById('languageFilter');
    if (select) {
      select.innerHTML = '<option value="">All Languages</option>' + 
        languages.map(lang => `<option value="${lang}">${lang}</option>`).join('');
    }
  }

  function filterAndSort() {
    const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const language = document.getElementById('languageFilter')?.value || '';
    const sort = document.getElementById('sortFilter')?.value || 'updated';
    
    filteredRepos = allRepos.filter(repo => {
      const matchesSearch = !search || repo.name.toLowerCase().includes(search) || 
        (repo.description && repo.description.toLowerCase().includes(search));
      const matchesLanguage = !language || repo.language === language;
      return matchesSearch && matchesLanguage && !repo.archived;
    });

    // Sort
    filteredRepos.sort((a, b) => {
      switch (sort) {
        case 'stars': return (b.stargazers_count || 0) - (a.stargazers_count || 0);
        case 'name': return a.name.localeCompare(b.name);
        default: return new Date(b.updated_at) - new Date(a.updated_at);
      }
    });

    renderFiltered();
  }

  function renderFiltered() {
    const grid = document.getElementById('all-projects');
    if (grid) {
      grid.innerHTML = filteredRepos.map(repoToCard).join('');
      
      // Animate cards in
      if (window.gsap) {
        gsap.fromTo('.card', 
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
        );
      }
    }
  }

  async function injectAllProjects() {
    const grid = document.getElementById('all-projects');
    if (!grid || !window.__GITHUB_USERNAME__) return;
    try {
      allRepos = await fetchRepos(window.__GITHUB_USERNAME__);
      populateLanguageFilter(allRepos);
      filterAndSort();
      
      // Add event listeners
      document.getElementById('searchInput')?.addEventListener('input', filterAndSort);
      document.getElementById('languageFilter')?.addEventListener('change', filterAndSort);
      document.getElementById('sortFilter')?.addEventListener('change', filterAndSort);
    } catch (e) {
      grid.innerHTML = '<p class="sub">Failed to load repositories.</p>';
    }
  }

  window.__injectFeaturedRepos = injectFeatured;
  window.__injectAllProjects = injectAllProjects;
})();


