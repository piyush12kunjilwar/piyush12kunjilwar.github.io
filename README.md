# Piyush Kunjilwar Portfolio

A modern, animated portfolio website showcasing projects, experience, and skills.

## Features

- **Animated Landing Page**: Three.js background with GSAP animations
- **GitHub Integration**: Auto-fetches and displays repositories with search/filter
- **Responsive Design**: Mobile-first approach with dark/light theme toggle
- **Performance Optimized**: Lazy loading, prefetching, and efficient rendering

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Animations**: GSAP, Three.js
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **API**: GitHub REST API v3

## Deployment

### GitHub Pages + Custom Domain

1. **Create Repository**: Create a public repository named `piyush12kunjilwar.github.io`
2. **Upload Files**: Push all files to the repository root
3. **Custom Domain**: 
   - Add `CNAME` file with `www.piyush12kunjilwar.com`
   - Configure DNS: CNAME `www` → `piyush12kunjilwar.github.io`
   - Enable "Enforce HTTPS" in GitHub Pages settings

### DNS Configuration

```
Type: CNAME
Name: www
Value: piyush12kunjilwar.github.io

Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

## File Structure

```
/
├── index.html              # Landing page
├── projects.html           # GitHub projects with filters
├── experience.html         # Resume timeline
├── about.html             # Skills and education
├── contact.html           # Contact information
├── CNAME                  # Custom domain
├── assets/
│   ├── css/
│   │   └── styles.css     # Main stylesheet
│   ├── js/
│   │   ├── main.js       # Core functionality, including Three.js setup
│   │   └── github.js     # GitHub API integration
│   └── resume/
│       └── Piyush_Kunjilwar_Resume.pdf
```

## Customization

### GitHub Username
Update in each HTML file:
```javascript
window.__GITHUB_USERNAME__ = "piyush12kunjilwar";
```

### Featured Repositories
Pin specific repos on landing page:
```javascript
window.__FEATURED_REPOS__ = ["repo-name-1", "repo-name-2"];
```

### Resume
Place your resume PDF at `assets/resume/Piyush_Kunjilwar_Resume.pdf`

## Performance

- Lazy loading for images
- Prefetch critical resources
- Minified CSS/JS
- Efficient GitHub API usage
- Three.js optimization

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## License

MIT License - feel free to use this template for your own portfolio.
