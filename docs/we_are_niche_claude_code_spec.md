# We Are Niche Website — Claude Code Implementation Spec

## Project Overview

Build a new corporate umbrella website for the Niche ecosystem at:

**Production Domain:** `we-are-niche.com`  
**Repository:** `https://github.com/AtlasHomesGroup/we-are-niche`  
**Hosting:** Vercel  
**Framework:** Next.js  

The purpose of this website is **not** to replace the existing Niche websites. All existing websites will continue to exist. The new website should act as the central umbrella hub that explains how the full Niche ecosystem connects and routes users to the correct dedicated website.

The website should be elegant, minimalistic, and corporate. It should provide a clean explanation of Niche as a connected real estate ecosystem built around technology, data, CRM, education, acquisitions, partnerships, and community.

The website should feel like a polished public-facing ecosystem site, not a hard-sell SaaS landing page.

---

## Core Brand Positioning

### Main Hero Headline

**WE ARE NICHE**

### Main Hero Subheadline

**A connected real estate ecosystem built around technology, data, CRM, education, acquisitions, partnerships, and community.**

### Footer Motto

**Driven by real estate. Powered by technology.**

### Central Ecosystem Concept

The center of the visual ecosystem map should be:

**NICHE**

Around it, show only three main branches:

1. **Ecosystem**
   - Niche Solutions
   - Niche Data
   - Niche CRM

2. **Community**
   - Get Niche Now
   - Niche Space

3. **Acquisitions**
   - Niche Acquisitions
   - JV With Niche
   - Niche Home Help

Do **not** include Company in the ecosystem map. Company is informational, not part of the operating ecosystem map.

---

## Design References

### Structural Reference

Use `https://a16z.com/` as a **layout and interaction reference only**.

Do not copy the a16z website. Use it as inspiration for:

- Minimal corporate header
- Left-side full-height menu panel
- Centered header text
- Search icon in the top-right corner
- Editorial corporate feeling
- Restrained typography
- Clean footer structure
- Minimal page structure

### Visual / Color Reference

Use `https://nichedata.ai/` as the primary reference for:

- Light theme
- Clean corporate design
- Soft background gradients
- Niche color language
- Premium but approachable look
- Orange/coral accent direction
- Dark navy / dark teal text direction
- Rounded cards and subtle shadows

The site should be **light theme overall**, similar to Niche Data, not dark like a16z.

### Overall Design Direction

- Light, modern, minimal, premium
- Corporate but not boring
- Clean spacing
- Subtle motion
- Soft gradient backgrounds
- Rounded cards
- Small animation touches only where they improve the experience
- No clutter
- No aggressive sales sections
- No generic stock imagery unless absolutely necessary
- No dark-red a16z color imitation

---

## Required Tech Stack

Build as a **true multi-page Next.js website**.

Recommended stack:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Reusable components
- Static content stored in structured configuration files
- Lightweight client-side search over internal page metadata
- SEO metadata for every page
- Responsive design
- Vercel deployment ready

Recommended project setup:

```bash
npx create-next-app@latest we-are-niche --typescript --tailwind --eslint --app
```

Use sensible defaults if the project already exists.

---

## Deployment Requirements

- Code should live in: `https://github.com/AtlasHomesGroup/we-are-niche`
- Vercel will create/connect the project from this GitHub repository.
- Use the repository’s default branch for production unless a different branch is already configured.
- Vercel should auto-detect Next.js.
- Create a professional `README.md` with:
  - Project overview
  - Tech stack
  - Local setup instructions
  - Development command
  - Build command
  - Vercel deployment notes
  - Folder structure
  - Asset notes
  - SEO/search notes
  - Legal placeholder warning

---

## Brand Assets

### Footer Logo

Use this logo as the footer logo source:

`https://ik.imagekit.io/ldqszfymv/Niche%20Logos/Niche_niche-orange-horizontal.png?updatedAt=1774639484957`

Recommended implementation:

- Download/store locally in `/public/brand/`
- Use optimized local file paths in components
- Keep original ImageKit URL documented in the project
- Do not rely on external ImageKit URLs for core branding in production unless necessary

### Favicon / N Icon

Use this orange N icon as the favicon source:

`https://ik.imagekit.io/ldqszfymv/Niche%20Logos/Niche_niche-orange-icon.png?updatedAt=1774639480539`

Requirements:

- Crop/fit into proper square favicon proportions
- Do not stretch the icon
- Generate or configure appropriate favicon sizes if possible:
  - 16x16
  - 32x32
  - 48x48
  - 180x180 Apple touch icon
  - Web manifest icon sizes

---

## Site Header

Use the same general structure across all pages.

### Header Layout

- Left: small two-line menu icon
- Center: text **WE ARE NICHE**
- Right: search icon

### Header Behavior

- Minimal and clean
- Sticky or fixed header is acceptable if it does not feel heavy
- Should work well on desktop and mobile
- Header center should use **WE ARE NICHE** as text, not a logo image
- Use the Niche logo mainly in the footer and divider

---

## Menu System

Use an a16z-style left-side full-height panel.

### Menu Behavior

- Clicking the two-line menu icon opens a left-side full-height menu panel
- Menu panel should feel minimal, clean, and premium
- Include close button/icon
- Categories should be clearly grouped
- Nested menu items may expand/collapse
- On mobile, preserve the same concept but make it responsive and usable

### Menu Structure

#### Ecosystem
- Niche Solutions
- Niche Data
- Niche CRM

#### Community
- Get Niche Now
- Niche Space

#### Acquisitions
- Niche Acquisitions
- JV With Niche
- Niche Home Help

#### Company
- About Us
- Michael Franke
- Contact

---

## Search System

The top-right search icon must be functional, not decorative.

### Search Requirements

- Search icon opens a search overlay, modal, or dedicated search experience
- Search should index all internal pages
- Results should show:
  - Page title
  - Short description
  - Category
  - Link
- Keep search lightweight and client-side for the first version
- Use a static search index generated from page metadata/content config

### Search Should Index

- Home
- Niche Solutions
- Niche Data
- Niche CRM
- Get Niche Now
- Niche Space
- Niche Acquisitions
- JV With Niche
- Niche Home Help
- About Us
- Michael Franke
- Contact
- Terms & Conditions
- Privacy Policy
- Sitemap

---

## Footer System

Use a minimal a16z-inspired footer structure, but with Niche branding.

### Footer Divider

Before the footer content, include:

- A thin horizontal divider line
- N icon centered on the divider line
- Everything in the footer should appear below this divider

### Footer Layout

Left side:

- Niche horizontal logo
- Motto below logo:
  - **Driven by real estate. Powered by technology.**

Right side:

- Social buttons/links
- Copyright text
- Privacy Policy
- Terms & Conditions
- Sitemap

### Footer Copyright

Use:

**© 2026 We Are Niche**

### Social Links

Use these links:

- LinkedIn: `https://www.linkedin.com/in/michael-franke-4ab471248/`
- Linktree: `https://linktr.ee/michaelfranke`
- X / Twitter: `https://x.com/nichedataai`
- Facebook Group: `https://www.facebook.com/groups/1407032306746592`
- YouTube: `https://www.youtube.com/@michaeldfranke`
- Instagram: `https://www.instagram.com/michael_franke`

Label them as social links for the Niche ecosystem. Since several channels are Michael Franke’s public profiles, do not misrepresent them as separate corporate accounts.

Suggested footer label:

**Follow the Niche ecosystem**

---

## Routing Structure

Use category-based URLs.

Required routes:

```txt
/
/ecosystem/niche-solutions
/ecosystem/niche-data
/ecosystem/niche-crm
/community/get-niche-now
/community/niche-space
/acquisitions/niche-acquisitions
/acquisitions/jv-with-niche
/acquisitions/niche-home-help
/company/about
/company/michael-franke
/company/contact
/privacy-policy
/terms-and-conditions
/sitemap
/not-found or custom 404
```

---

## External Website Links

The umbrella website should include internal pages for each product/brand. It should not send users directly to external websites without first explaining the brand.

Each internal brand page should include:

- Summary of the brand/product
- 2–3 semantic contextual links to the main website
- One primary **Visit Website** button

External links should open in a new tab using:

```tsx
target="_blank" rel="noopener noreferrer"
```

Internal links should open in the same tab.

### External Brand Websites

- Niche Solutions: `https://www.nichesolutions.ai/`
- Niche Acquisitions: `https://www.nicheacquisition.com/`
- JV With Niche: `https://jvwithniche.com/`
- Get Niche Now: `https://www.getnichenow.com/`
- Niche Data: `https://nichedata.ai/`
- Niche Space: `https://www.niche-space.com/`
- Niche CRM: `https://www.nichecrm.ai/`
- Niche Home Help: `https://www.nichehomehelp.com/`

---

## First-Load Animation

Include a subtle first-load animation using the Niche N logo.

Requirements:

- Show only on first page load
- Do not show on every route transition
- Keep it fast and premium
- Do not block the user for too long
- Animation should feel like brand polish, not a gimmick
- Consider using session storage to avoid replaying it repeatedly in the same session

---

## Homepage Requirements

### Homepage Structure

1. Minimal header
2. Hero section
3. Visual ecosystem map
4. Minimal grouped cards
5. Corporate summary section split into 3 mini blocks
6. Footer divider
7. Footer

### Hero Section

- Light-theme, Niche Data-inspired background
- Text positioned slightly above center, not full-screen dead center
- Headline: **WE ARE NICHE**
- Subheadline: **A connected real estate ecosystem built around technology, data, CRM, education, acquisitions, partnerships, and community.**
- Include subtle motion/visual depth
- Create several hero animation options in code/config where practical:
  1. Large animated N
  2. NICHE in center with connected moving nodes
  3. Minimal wordmark plus soft network/data movement
  4. Circular ecosystem animation with NICHE in the center
- The first implementation can choose the best default, but the code should be clean enough to switch or iterate later

### Visual Ecosystem Map

Display **NICHE** in the center.

Show three connected branches only:

#### Ecosystem
- Niche Solutions
- Niche Data
- Niche CRM

#### Community
- Get Niche Now
- Niche Space

#### Acquisitions
- Niche Acquisitions
- JV With Niche
- Niche Home Help

The map should visually explain the ecosystem in 5 seconds. If it requires a long paragraph to understand, it is too complex.

### Grouped Cards Section

After the visual map, include minimal cards grouped by:

- Ecosystem
- Community
- Acquisitions
- Company

Each card should link to the relevant internal page.

### Corporate Summary Section

Split into 3 mini blocks:

#### Technology
Niche builds real estate technology products, including data tools and CRM systems that help investors identify opportunities, manage leads, and scale operations.

#### Community
Niche connects real estate professionals through education, coaching, office space, events, previous recordings, educational tools, and shared access to systems built for active investors.

#### Acquisitions
Niche supports property acquisition, homeowner solutions, and JV opportunities through connected deal flow and real estate execution.

---

## Standard Internal Brand Page Structure

Use the same standard structure for all product/brand pages.

Required sections:

1. Product / brand name
2. Short summary
3. 2–3 semantic links to the external website inside the copy
4. Primary **Visit Website** button
5. **How it fits into the Niche ecosystem** section
6. **Related Niche brands** section

Keep pages minimal and useful. No unnecessary images unless they support the page.

---

## Page Content Drafts

Claude should generate real first-draft content based on this spec. Do not use generic lorem ipsum for core pages.

The only placeholder pages should be:

- Terms & Conditions
- Privacy Policy

Those must be clearly marked as temporary legal placeholders for later attorney/legal review.

---

# Internal Page Content Direction

## 1. Niche Solutions Page

### Route

`/ecosystem/niche-solutions`

### External Website

`https://www.nichesolutions.ai/`

### Positioning

Niche Solutions is the technology company responsible for developing, maintaining, and improving the software, data systems, CRM tools, and digital infrastructure used across the Niche ecosystem.

### Suggested Page Copy

**Niche Solutions** is the technology development company behind the Niche ecosystem. It is responsible for building and improving the digital infrastructure that powers Niche products, including real estate data systems, CRM workflows, software tools, automation, and connected web platforms.

Through Niche Solutions, the ecosystem continues to develop technology that supports real estate professionals, acquisition teams, community members, and data-driven investors.

### Semantic Links

Include contextual links such as:

- Learn more about Niche Solutions
- Explore the technology behind the Niche ecosystem
- Visit the Niche Solutions website

### CTA Button

**Visit Niche Solutions**

### How It Fits Into The Niche Ecosystem

Niche Solutions is the development and infrastructure layer of the ecosystem. It supports the platforms, systems, and digital tools used by Niche Data, Niche CRM, community operations, acquisition workflows, and other Niche-connected brands.

### Related Niche Brands

- Niche Data
- Niche CRM
- Get Niche Now

---

## 2. Niche Data Page

### Route

`/ecosystem/niche-data`

### External Website

`https://nichedata.ai/`

### Positioning

Niche Data is a real estate data creation and intelligence platform. It collects, cleans, optimizes, enriches, and delivers unique real estate data for investors and real estate professionals.

### Suggested Page Copy

**Niche Data** is a real estate data creation and intelligence platform built for investors, wholesalers, acquisition teams, and real estate professionals who need reliable and actionable information.

Niche Data collects, cleans, optimizes, enriches, and delivers unique property data designed to help users identify opportunities, build targeted lists, analyze properties, and support smarter real estate decisions.

The platform is designed to serve as a centralized data solution for real estate professionals who need more than disconnected spreadsheets, generic property lists, or scattered data sources.

### Features To Mention

Mention where appropriate, but do not overload the page:

- Property lookup
- Parcel data
- List building
- Skip tracing
- Foreclosure data
- Probate and pre-probate data
- Predictive foreclosure data
- Equity estimates
- Mortgage and ownership insights
- Neighbor skip tracing
- Map-based search
- Advanced filters
- County-based data access
- Token-based usage system

### Semantic Links

- Explore Niche Data
- View real estate data solutions
- Visit the Niche Data platform

### CTA Button

**Visit Niche Data**

### How It Fits Into The Niche Ecosystem

Niche Data supports the technology and acquisitions side of Niche by helping real estate professionals identify property opportunities, organize information, and connect data-driven leads into CRM and acquisition workflows.

### Related Niche Brands

- Niche CRM
- Niche Acquisitions
- Get Niche Now

---

## 3. Niche CRM Page

### Route

`/ecosystem/niche-crm`

### External Website

`https://www.nichecrm.ai/`

### Positioning

Niche CRM is a real estate acquisition workflow-oriented CRM built from the ground up on Salesforce, using custom objects, custom workflows, and native integration with Niche Data.

### Suggested Page Copy

**Niche CRM** is an acquisition-focused real estate CRM built for investors and acquisition teams that need structured lead management, automated follow-up, pipeline visibility, communication tracking, and performance organization.

Built from the ground up on Salesforce, Niche CRM uses a custom object model, custom workflows, permissions, dashboards, and real estate-specific lead management structures. It is designed around the way real estate acquisition teams actually operate.

Niche CRM is natively integrated with Niche Data, helping users connect property intelligence with lead management and acquisition execution.

### Capabilities To Mention

- Lead management
- Deal pipeline tracking
- Follow-up automation
- SMS and calling integration
- Communication history
- Campaign tracking
- Custom dashboards
- User roles and permissions
- Real estate acquisition workflows
- Native integration with Niche Data
- Reporting and performance visibility
- Built on Salesforce with custom objects

### Semantic Links

- Explore Niche CRM
- See how Niche CRM supports real estate acquisition teams
- Visit the Niche CRM website

### CTA Button

**Visit Niche CRM**

### How It Fits Into The Niche Ecosystem

Niche CRM connects the data and acquisition sides of Niche by giving real estate professionals a structured system to manage leads, track communication, organize follow-up, and move opportunities from property data to active deals.

### Related Niche Brands

- Niche Data
- Niche Solutions
- Niche Acquisitions

---

## 4. Get Niche Now Page

### Route

`/community/get-niche-now`

### External Website

`https://www.getnichenow.com/`

### Positioning

Get Niche Now is the landing page for joining the Niche community. The community is led by Michael Franke and includes coaching, education, previous recordings, educational bot support, testimonials, success stories, and case studies.

### Suggested Page Copy

**Get Niche Now** is the primary landing page for real estate professionals who want to join the Niche community.

The Niche community is led by Michael Franke and gives members access to real estate education, coaching, community resources, previous recordings, educational support tools, and a network of real estate professionals focused on growth.

Get Niche Now also presents testimonials, success stories, and case studies from members and participants across the Niche ecosystem.

### Mention

- Community access
- Michael Franke’s coaching and education
- Live education / Zoom-style sessions if applicable
- Previous recordings
- Educational bot
- Case studies
- Success stories
- Testimonials
- Access to the broader Niche ecosystem

### Semantic Links

- Join the Niche community
- Explore member success stories
- Visit Get Niche Now

### CTA Button

**Visit Get Niche Now**

### How It Fits Into The Niche Ecosystem

Get Niche Now is the community entry point. It connects real estate professionals with education, coaching, shared resources, and access to the broader Niche ecosystem, including data, CRM tools, and acquisition opportunities.

### Related Niche Brands

- Niche Space
- Niche Data
- Niche CRM

---

## 5. Niche Space Page

### Route

`/community/niche-space`

### External Website

`https://www.niche-space.com/`

### Positioning

Niche Space is the Niche office building in Independence, Missouri, where in-person masterminds, real estate education, collaboration, and community gatherings take place.

### Suggested Page Copy

**Niche Space** is the Niche office building in Independence, Missouri. It serves as a physical home for in-person masterminds, real estate education, collaboration, and community gatherings.

As part of the broader Niche ecosystem, Niche Space gives the community a real-world place to connect, learn, collaborate, and build relationships beyond the digital platform.

### Semantic Links

- Learn about Niche Space
- Explore in-person Niche events and masterminds
- Visit the Niche Space website

### CTA Button

**Visit Niche Space**

### How It Fits Into The Niche Ecosystem

Niche Space connects the online Niche community with a physical location where members and real estate professionals can participate in in-person education, masterminds, and collaboration.

### Related Niche Brands

- Get Niche Now
- Michael Franke
- Niche Acquisitions

---

## 6. Niche Acquisitions Page

### Route

`/acquisitions/niche-acquisitions`

### External Website

`https://www.nicheacquisition.com/`

### Positioning

Niche Acquisitions is the real estate acquisition company focused on turning Niche Data leads into actual deals. It is also open to JV partnerships with people inside and outside the Niche community.

### Suggested Page Copy

**Niche Acquisitions** is the real estate acquisition arm of Niche. The company focuses on turning Niche Data leads into real property opportunities and completed deals.

Niche Acquisitions works in the market actively and supports deal execution across the ecosystem. It also collaborates with JV partners inside and outside the Niche community to evaluate, structure, and execute real estate opportunities.

Michael Franke is not only a coach or educator. He is actively in the market and involved in real estate deals every week through the Niche ecosystem.

### Semantic Links

- Explore Niche Acquisitions
- Learn how Niche turns data into deals
- Visit Niche Acquisitions

### CTA Button

**Visit Niche Acquisitions**

### How It Fits Into The Niche Ecosystem

Niche Acquisitions is the execution layer of the ecosystem. It connects real estate data, community knowledge, lead flow, and JV opportunities into real acquisition activity.

### Related Niche Brands

- Niche Data
- JV With Niche
- Niche Home Help

---

## 7. JV With Niche Page

### Route

`/acquisitions/jv-with-niche`

### External Website

`https://jvwithniche.com/`

### Positioning

JV With Niche is an automated deal submission portal where real estate professionals, investors, wholesalers, and community members can submit leads and opportunities to joint venture with Niche.

### Suggested Page Copy

**JV With Niche** is an automated deal submission portal for people who want to submit real estate leads and potential opportunities to joint venture with Niche.

Through the portal, real estate professionals, investors, wholesalers, and community members can submit leads for review. Submitted opportunities may be evaluated and potentially handled through Niche Acquisitions.

JV With Niche creates a structured path for collaboration between Niche and people who have opportunities but want support evaluating, negotiating, or executing the deal.

### Semantic Links

- Submit a JV opportunity
- Learn how JV With Niche works
- Visit JV With Niche

### CTA Button

**Visit JV With Niche**

### How It Fits Into The Niche Ecosystem

JV With Niche connects external and internal deal flow to Niche Acquisitions. It gives people a formal way to submit opportunities and potentially partner with Niche on real estate deals.

### Related Niche Brands

- Niche Acquisitions
- Niche Home Help
- Get Niche Now

---

## 8. Niche Home Help Page

### Route

`/acquisitions/niche-home-help`

### External Website

`https://www.nichehomehelp.com/`

### Positioning

Niche Home Help is the homeowner-facing landing page where property owners in difficult or distressed situations can submit a request for help. These requests are reviewed and handled through Niche Acquisitions.

### Suggested Page Copy

**Niche Home Help** is the homeowner-facing landing page where property owners in difficult or distressed situations can submit a request for help.

These requests are reviewed through the Niche acquisition process, with the goal of understanding the homeowner’s situation and identifying practical real estate solutions where appropriate.

Niche Home Help supports homeowners facing difficult property situations, including foreclosure, inherited property, vacant homes, landlord challenges, relocation, financial hardship, divorce, major repairs, or unwanted property ownership. The goal is to provide a practical path forward, not pressure homeowners into one specific option.

### Semantic Links

- Request homeowner help
- Learn how Niche Home Help works
- Visit Niche Home Help

### CTA Button

**Visit Niche Home Help**

### How It Fits Into The Niche Ecosystem

Niche Home Help is the homeowner intake layer of the acquisition ecosystem. It connects homeowners with Niche Acquisitions and helps convert qualified homeowner requests into real estate solutions and potential deals.

### Related Niche Brands

- Niche Acquisitions
- JV With Niche
- Niche Data

---

## 9. About Us Page

### Route

`/company/about`

### Content Focus

The About Us page should focus on:

- Niche story
- Mission
- Vision
- Ecosystem
- Michael Franke’s experience and background

### Suggested Page Structure

1. The Story of Niche
2. Mission
3. Vision
4. The Ecosystem
5. Michael Franke’s Role
6. Links to key pages

### Suggested Page Copy

**Niche** was built to connect the pieces real estate professionals need to grow: technology, data, CRM systems, education, community, acquisitions, and partnerships.

The ecosystem brings together software development, real estate intelligence, community education, acquisition execution, JV opportunities, and homeowner-facing solutions under one connected Niche brand.

The mission of Niche is to help real estate professionals access better tools, better information, better education, and better systems for building and scaling real estate businesses.

The vision is to continue building a national real estate ecosystem where data, technology, education, community, and real deal execution work together.

Niche is led publicly by Michael Franke, Founder of Niche, whose background as an educator and active real estate operator helps shape the practical, action-oriented nature of the community.

### Related Links

- Michael Franke
- Niche Data
- Niche CRM
- Niche Acquisitions
- Get Niche Now

---

## 10. Michael Franke Page

### Route

`/company/michael-franke`

### Title

**Michael Franke**  
**Founder of Niche**

### Required Background Points

Include:

- Founder of Niche
- Former high school algebra teacher
- School teaching education/background from college helps him educate Niche community members
- More than 10 years of real estate experience
- More than 1,000 successfully closed deals
- Active in the market
- Actively doing deals every week
- Coach, educator, investor, and operator

### Suggested Page Copy

**Michael Franke, Founder of Niche,** brings together more than 10 years of real estate experience, over 1,000 successfully closed deals, and a background as a high school algebra teacher.

Before building the Niche ecosystem, Michael taught algebra at the high school level. His teaching background and education experience continue to shape how the Niche community learns today: practical, structured, step-by-step, and focused on real-world understanding.

Michael is not only an educator or coach. He is actively in the real estate market and continues to work on real opportunities and deals through the Niche ecosystem every week.

Through Niche, Michael connects education, data, CRM systems, acquisition strategy, community, and real-world deal execution into one operating ecosystem for real estate professionals.

### Related Links

- Get Niche Now
- Niche Acquisitions
- JV With Niche
- Niche Space

---

## 11. Contact Page

### Route

`/company/contact`

### Content Requirements

Keep this page simple.

Include:

- Corporate phone
- Office address
- Emails
- Embedded map pointing to office location
- Social links

Do not include a complicated lead form for the first version.

### Contact Details

**Corporate Phone:** 816-310-1161  
**Office Address:** 3620 Arrowhead Ave, Independence, MO 64057

### Emails

Label clearly:

- **General / Corporate:** `info@nichesolutions.ai`
- **Niche Data Support:** `support@nichedata.ai`
- **Community Support:** `support@getnichenow.com`

### Map

Embed a map pointing to:

`3620 Arrowhead Ave, Independence, MO 64057`

Use a clean embedded Google Map or a map link if embedding requires an API key. Do not hardcode an API key into the project.

### Social Links

Use the social links listed in the Footer section.

---

## Legal Pages

## 12. Privacy Policy Page

### Route

`/privacy-policy`

Create a placeholder page only.

Required notice:

**This Privacy Policy is a placeholder and will be replaced with final legal content. It should not be treated as final legal advice or final compliance language.**

Do not invent complex legal promises. Keep it simple and clearly marked as temporary.

---

## 13. Terms & Conditions Page

### Route

`/terms-and-conditions`

Create a placeholder page only.

Required notice:

**These Terms & Conditions are placeholders and will be replaced with final legal content. They should not be treated as final legal advice or final contractual language.**

Do not invent complex legal promises. Keep it simple and clearly marked as temporary.

---

## Sitemap Page

## 14. Sitemap Page

### Route

`/sitemap`

Include both internal pages and external brand websites together, organized by category.

### Sitemap Structure

#### Home
- We Are Niche Home

#### Ecosystem
- Niche Solutions internal page
- Niche Solutions external website
- Niche Data internal page
- Niche Data external website
- Niche CRM internal page
- Niche CRM external website

#### Community
- Get Niche Now internal page
- Get Niche Now external website
- Niche Space internal page
- Niche Space external website

#### Acquisitions
- Niche Acquisitions internal page
- Niche Acquisitions external website
- JV With Niche internal page
- JV With Niche external website
- Niche Home Help internal page
- Niche Home Help external website

#### Company
- About Us
- Michael Franke
- Contact

#### Legal
- Privacy Policy
- Terms & Conditions

---

## 404 Page

Create a minimal branded 404 page.

Requirements:

- Message: **Page not found**
- Supporting line: **This page may have moved, or the link may no longer exist.**
- One main button: **Back to Home**
- Same header/footer styling as the rest of the site
- Light Niche-style background

---

## SEO Requirements

Every page should include full SEO metadata.

Required for each page:

- Page title
- Meta description
- Canonical URL
- Open Graph title
- Open Graph description
- Open Graph image
- Twitter/X card metadata
- Clean page-specific keywords where appropriate
- Structured metadata where useful

Use a default branded Open Graph image for first version. Allow page-specific images later.

### Suggested Site Title Pattern

`Page Name | We Are Niche`

Examples:

- `Niche Data | We Are Niche`
- `Niche CRM | We Are Niche`
- `Michael Franke | We Are Niche`

### Default Meta Description

**We Are Niche is the umbrella website for the Niche real estate ecosystem, connecting technology, data, CRM, education, acquisitions, partnerships, and community.**

---

## Suggested Component Structure

Create reusable components such as:

```txt
/components
  /layout
    Header.tsx
    Footer.tsx
    MenuPanel.tsx
    SearchOverlay.tsx
    FooterDivider.tsx
  /home
    Hero.tsx
    EcosystemMap.tsx
    CategoryCards.tsx
    SummaryBlocks.tsx
  /pages
    PageHero.tsx
    SemanticLinks.tsx
    VisitWebsiteButton.tsx
    EcosystemFit.tsx
    RelatedBrands.tsx
  /ui
    Button.tsx
    Card.tsx
    Container.tsx
    Section.tsx
```

Suggested data/config files:

```txt
/lib
  site-config.ts
  navigation.ts
  pages.ts
  search-index.ts
  seo.ts
```

Suggested app routes:

```txt
/app
  page.tsx
  layout.tsx
  not-found.tsx
  /ecosystem
    /niche-solutions/page.tsx
    /niche-data/page.tsx
    /niche-crm/page.tsx
  /community
    /get-niche-now/page.tsx
    /niche-space/page.tsx
  /acquisitions
    /niche-acquisitions/page.tsx
    /jv-with-niche/page.tsx
    /niche-home-help/page.tsx
  /company
    /about/page.tsx
    /michael-franke/page.tsx
    /contact/page.tsx
  /privacy-policy/page.tsx
  /terms-and-conditions/page.tsx
  /sitemap/page.tsx
```

---

## Styling Guidance

### Color Direction

Use a Niche-inspired light palette:

- Off-white / warm white background
- Light cream gradients
- Orange/coral accents from Niche branding
- Dark navy / dark teal text
- Soft gray borders
- Subtle shadows

### Typography

- Clean modern sans-serif
- Large elegant headings
- Strong spacing
- Avoid crowded text blocks
- Avoid overly decorative fonts

### Motion

Motion should be subtle:

- First-load N logo animation
- Slight hover effects on cards/buttons
- Smooth menu panel open/close
- Search overlay transition
- Soft ecosystem map movement or connecting-line animation

Do not over-animate. This is a corporate ecosystem site, not a game.

---

## Buttons And CTAs

Use clear CTAs.

Primary button pattern:

- **Visit Niche Data**
- **Visit Niche CRM**
- **Visit Niche Acquisitions**
- **Visit JV With Niche**
- **Visit Get Niche Now**

Secondary/contextual semantic links should be placed naturally in the text.

---

## Accessibility Requirements

- Use semantic HTML
- All icons should have accessible labels
- Search overlay should be keyboard accessible
- Menu panel should trap focus when open if practical
- Good color contrast
- Buttons and links should be clearly visible
- Images/logos should have meaningful alt text

---

## Performance Requirements

- Optimize images
- Use local assets for core brand files
- Avoid unnecessary third-party scripts
- Keep animations lightweight
- No heavy video backgrounds in first version
- Ensure fast Vercel deployment and good Lighthouse scores

---

## Content Rules

- Do not write the site as a hard-sell sales page.
- Do not make exaggerated legal or financial claims.
- Do not claim “best in the market” unless phrased carefully and professionally.
- Avoid sounding like a generic SaaS website.
- Keep content specific to Niche.
- Make it clear that each existing website remains separate and the umbrella site links to them.
- Do not over-explain. The website should feel clean and confident.

---

## Claims To Handle Carefully

### Niche CRM

User wants strong positioning around Niche CRM being highly acquisition-focused.

Recommended safe phrasing:

**Niche CRM is one of the most acquisition-focused real estate CRMs in the market, built on Salesforce with custom objects, custom workflows, and native integration with Niche Data.**

Avoid unsupported absolute claims like:

- “The best CRM in the market”
- “Guaranteed to close more deals”

### Niche Data

Position as a data creation/intelligence platform.

Do not write defensive copy like “not just a reseller.”

Use positive framing:

**Niche Data collects, cleans, optimizes, enriches, and delivers unique real estate data designed for investors and real estate professionals.**

### Niche Home Help

Keep homeowner distress language respectful.

Do not make the copy sound predatory.

Use language like:

**The goal is to provide a practical path forward, not pressure homeowners into one specific option.**

---

## Final Developer Notes

The finished first version should feel like:

- A premium umbrella website
- A clear directory into the Niche ecosystem
- A corporate credibility asset
- A clean explanation of how the brands connect
- A minimal but polished Next.js website ready for Vercel

The website should not feel like:

- A clone of a16z
- A replacement for existing Niche websites
- A generic SaaS landing page
- A cluttered directory
- A personal biography site only
- A hard-sell funnel

Build the project so that future products, pages, blogs, press items, investor content, or announcements can be added later without restructuring the whole site.
