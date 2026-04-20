# WEBSITE DEVELOPMENT PROPOSAL
## PerbiCubs Foundation — Official Digital Platform

**Prepared by:** [Your Name / Agency Name]
**Prepared for:** PerbiCubs Foundation
**Date:** April 2026
**Version:** 1.0

---

## TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [Project Overview & Objectives](#2-project-overview--objectives)
3. [Design Philosophy & Visual Identity](#3-design-philosophy--visual-identity)
4. [Typography System](#4-typography-system)
5. [Color Palette](#5-color-palette)
6. [Website Architecture — All Pages](#6-website-architecture--all-pages)
7. [Section-by-Section Breakdown](#7-section-by-section-breakdown)
8. [The Admin Panel — Website Management System](#8-the-admin-panel--website-management-system)
9. [Additional Features](#9-additional-features)
10. [Technology Stack](#10-technology-stack)
11. [Codebase Transfer & Deployment](#11-codebase-transfer--deployment)
12. [Database & Hosting Migration](#12-database--hosting-migration)
13. [6-Month Free Maintenance Plan](#13-six-month-free-maintenance-plan)
14. [Deliverables Summary](#14-deliverables-summary)

---

## 1. Executive Summary

This document constitutes a full technical and creative proposal for the design, development, and delivery of the PerbiCubs Foundation's official website — a world-class digital presence that reflects the Foundation's mission, credibility, partnerships, and programs with clarity, authority, and emotional depth.

The website is a fully custom-built, production-grade web application. It is not built on a generic template or website builder. Every page, section, animation, and interaction has been architecturally designed from the ground up to serve one purpose: to tell the complete, compelling story of PerbiCubs Foundation and convert visitors into donors, partners, and advocates.

The platform includes a full content management system (Admin Panel) that allows the Foundation's team to manage every dynamic element of the website — images, statistics, blog posts, team members, and gallery photos — in real time, without any coding knowledge.

---

## 2. Project Overview & Objectives

### 2.1 The Problem Being Solved

The Foundation exists at the intersection of one of the world's most urgent educational crises — 87% of 10-year-olds in Sub-Saharan Africa cannot read and understand a simple story. The website must communicate this urgency clearly, back it with evidence, and then pivot the visitor from awareness to action.

### 2.2 Website Goals

The website serves four primary strategic goals:

- **Inform** — Educate the public, institutions, and media about the scope of learning poverty across Sub-Saharan Africa, the Foundation's evidence-based response, and the proven results achieved
- **Inspire** — Move visitors emotionally through photography, data storytelling, and human-centered narrative design
- **Convert** — Turn informed visitors into donors, child sponsors, corporate partners, and advocates via carefully placed calls to action across every page
- **Manage** — Give the Foundation's non-technical team full control to update all website content in real time without ever touching code

### 2.3 Scope of Work

The scope covers the full design and development of a multi-page, fully responsive, database-powered website, including:

- 9 public-facing pages
- 1 fully secured Admin Portal with 6 management modules
- Stripe and Paystack payment gateway integration
- Contact form connected to a Foundation-specified email address
- Newsletter subscription module
- Supabase cloud database with image storage
- Full SEO optimisation
- Codebase handover and migration to preferred hosting

---

## 3. Design Philosophy & Visual Identity

### 3.1 Core Design Principle: Holistic Storytelling

The website has been designed as a single, unbroken narrative — not a collection of disconnected pages. A visitor who arrives at the home page and scrolls through the entire site will have experienced a complete story arc:

**Act 1 — The Problem:** The world is told, with data and imagery, that a generation is at risk. The home page opens with this urgency in its hero section. The dedicated "The Problem" page deepens it with statistics and consequence chains.

**Act 2 — The Solution:** The narrative pivots to hope. The Foundation is presented as a credible, tested, UNESCO-recognized organization with a proven model. The "Our Solution" and "Programs" pages make this concrete with methodology, numbers, and the flagship Literacy Scholarship.

**Act 3 — The Call to Action:** The visitor, now both informed and moved, is given multiple clear and accessible paths to act — sponsor a child, become a corporate partner, volunteer, or donate. Every page converges toward this outcome.

This three-act structure is maintained not only across the site's pages but within each individual page, ensuring every visitor entry point — whether from Google, a shared link, or a referral — lands them in the middle of a purposeful story.

### 3.2 Design Aesthetic

The visual language of the site is modern, sophisticated, and mission-driven. It deliberately avoids the aesthetic of a "generic charity website." Key design decisions include:

- **Full-screen hero photography** with cinematic gradient overlays that honor the dignity of the children and communities featured
- **Parallax scroll effects** on page banners that create a sense of depth and movement
- **Glassmorphism accents** — frosted glass cards and overlays used contextually for modern visual layering
- **Animated section reveals** — every section fades and rises into view as the user scrolls, maintaining energy and attention throughout
- **Animated infographics** — the solution model uses a bespoke circular infographic with animated connector lines and pulsing rings, making abstract methodology visually intuitive
- **Data-driven counter animations** — impact statistics count up when scrolled into view, making numbers feel alive and credible
- **Bento-grid gallery** with lightbox — photography is presented in an editorial mosaic format with full-screen lightbox navigation
- **Swiper carousels** — the hero, gallery preview, and blog sections use industry-standard carousel behavior with smooth transitions
- **Floating stat cards** — on the Programs page, floating data cards sit atop full-bleed photography for a magazine-editorial layout

---

## 4. Typography System

The website uses a carefully selected two-typeface system that balances warmth with authority.

### 4.1 Primary Typeface — Quicksand

**Usage:** All headings (H1–H5), body text, navigation, buttons, labels, and all UI elements

**Character:** Quicksand is a round, geometric sans-serif with excellent readability. Its rounded terminals convey approachability and warmth — appropriate for a children's literacy foundation — while its clean geometry maintains professionalism for institutional contexts (donors, partners, media).

**Weights used:**
- 300 — Light (large introductory paragraphs)
- 400 — Regular (body copy)
- 500 — Medium (secondary labels)
- 600 — SemiBold (card descriptions, navigation items)
- 700 — Bold (all headings, buttons, CTAs)

### 4.2 Accent Typeface — Playfair Display

**Usage:** Contextual editorial accents — pull quotes, highlighted statistics, and decorative headline variations

**Character:** Playfair Display is a high-contrast serif typeface with an editorial, literary feel. Its presence in select locations creates visual contrast and communicates intellectual authority — appropriate for a foundation engaged in literacy, research, and policy.

**Styles used:**
- Regular 400 — editorial body passages
- Bold 700 — strong headline accents
- Italic 400 — pull quotes and attributions

### 4.3 Base Font Size

The root font size is set to **17px** (above the standard 16px) to ensure optimal readability across all demographics, including parents, educators, and institutional partners who may be accessing the site in varied conditions.

---

## 5. Color Palette

The color system has been purpose-designed to carry the emotional weight of the Foundation's mission while meeting modern accessibility standards.

### 5.1 Brand Colors

| Role | Name | Hex Value | Usage |
|---|---|---|---|
| Primary | Teal Blue | `#00ABBE` | Navigation active states, buttons, links, section tags, icon fills, interactive UI |
| Primary Dark | Deep Teal | `#008fa0` | Button hover states, gradient depth |
| Primary Light | Sky Teal | `#33c4d3` | Hero section text accents, tag highlights |
| Accent | Coral Salmon | `#FF6B56` | Section tag lines, decorative borders, CTA highlights, "urgency" indicators |
| Accent Dark | Deep Coral | `#e5533e` | Accent button hover states |
| Deep Navy | Dark Base | `#0a1628` | Page backgrounds, dark sections, footer, admin panel sidebar |
| Navy 2 | Dark Complement | `#112240` | Footer gradient end, dark card backgrounds |
| Surface | Off-white | `#f8fdfe` | Page background, light section fills |
| Text Muted | Slate | `#647b8a` | Secondary body copy, captions, card descriptions |

### 5.2 Color Storytelling Rationale

**Teal (`#00ABBE`)** is the Foundation's primary identity color. It is associated with trust, clarity, and intelligence — appropriate for an educational organization seeking institutional credibility. It also carries associations with water and open sky — themes of possibility and freedom that align with the Foundation's vision of literacy as liberation.

**Coral (`#FF6B56`)** functions as the emotional accent. Used sparingly on section tags, decorative frames, and urgency indicators, it draws the eye and communicates warmth, energy, and human connection — the "heartbeat" of the site. It is not overused; its power comes from restraint.

**Deep Navy (`#0a1628`)** grounds the visual system in gravity and authority. It is used extensively on the footer, hero overlays, and dark sections to communicate institutional weight and seriousness of purpose.

---

## 6. Website Architecture — All Pages

The website comprises the following pages, accessible via a fixed navigation bar:

| Page | URL Route | Navigation Label |
|---|---|---|
| Home | `/` | Home |
| About Us | `/about` | About |
| The Problem | `/the-problem` | The Problem |
| Our Solution | `/our-solution` | Our Solution |
| Programs | `/programs` | Programs |
| Get Involved | `/get-involved` | Get Involved |
| Donate / Sponsor | `/donate` | — (CTA button) |
| Gallery | `/gallery` | — (footer) |
| Blog | `/blog` | — (footer) |
| Admin Portal | `/admin` | — (staff only, password protected) |

---

## 7. Section-by-Section Breakdown

### 7.1 Global Components (Present on All Pages)

#### Navigation Bar

The navigation bar is a floating, fixed-top element that adapts its visual state based on scroll position. When the page is at the top, it is fully transparent with white text — allowing the hero imagery to breathe and creating a seamless immersive experience. As the visitor scrolls past 20 pixels, it transitions to a white pill-shaped background with a subtle shadow and dark text — ensuring readability against any page content below.

**Desktop:** Logo (left) → Navigation links (center) → "Sponsor a Child" CTA button (right). The CTA button uses the primary teal brand color and includes a right-arrow icon.

**Mobile:** Logo (left) → Hamburger icon (right). Clicking the hamburger opens a full-height drawer panel from the right side of the screen, featuring all navigation links, a "Sponsor a Child" button, and a "Become a Partner" outlined button. A dark backdrop with blur effect closes the menu when clicked.

Navigation links include animated active state indicators that change to the brand teal color.

#### Footer

A rich, multi-column footer with a dark deep navy background. It is organized into five sections:

- **Newsletter Band** — A top strip with a subscription email form and arrow-send button in accent coral
- **Brand Column** — Foundation logo, mission description, contact information (email and location), and social media links (Facebook, X/Twitter, Instagram, YouTube)
- **Foundation Links** — About Us, The Problem, Our Solution, Programs
- **Get Involved Links** — Sponsor a Child, Become a Partner, Corporate Partnerships, Research Collaboration
- **Resources Links** — Blog & News, Impact Reports, Press & Media, FAQs
- **Partners Marquee** — An infinite scrolling ticker of partner and recognition names (UNESCO, Mastercard Foundation, EdTech Fellowship, World Book Capital, SDG 4 Alliance)
- **Copyright row** — Year, rights notice, and the tagline "Built with ♥ for every child's future"

#### Page Preloader

A full-screen animated preloader that displays while the page loads, branded to the Foundation's identity. It exits with a smooth fade animation.

#### Back to Top Button

A floating button that appears after the user scrolls down, allowing one-click return to the top of any page.

---

### 7.2 Home Page (`/`)

The home page is the Foundation's single most important piece of digital real estate. It is structured as a complete, self-contained narrative journey that encapsulates the entire purpose of the Foundation.

#### Hero — Three-Slide Autoplay Carousel

A full-screen, full-viewport-height carousel with a 6-second auto-rotation and smooth cross-fade transitions. Each slide features:

- A full-bleed background photograph of children and education contexts
- A Ken Burns zoom effect (slow image scale during the slide active state, creating cinematic motion)
- Three layered gradient overlays ensuring text legibility across all image types
- A micro-animation content reveal: the tag line slides in from the left, the headline rises from below, the subheading fades in, and the CTA buttons appear last

**Slide 1:** "Every Child Deserves to Read" — CTAs to Become a Founding Partner and Sponsor a Child

**Slide 2:** "Turning Pages, Changing Lives" — CTAs to Learn About the Crisis and Our Solution

**Slide 3:** "A Proven Model That Works" — UNESCO and Mastercard credibility highlighted — CTAs to See Our Impact and Join the Movement

#### Partners Marquee

Immediately below the hero, a light gray band displays the logos of the Foundation's institutional partners in an infinite scrolling ticker — UNESCO, World Book Capital, Mastercard Foundation, MEST, and the PerbiCubs Foundation logo. Each logo greyscales at rest and returns to full color on hover.

#### The Problem Section (Homepage Preview)

A preview of the literacy crisis teasing the full "The Problem" page, with a key statistic, headline statement, and a link to the full problem page.

#### Our Response — Solution Approach Section

An animated infographic section featuring the Foundation's four-pillar response model: **Access → Engagement → Assessment → Accountability**. On desktop, these are presented as a four-quadrant layout surrounding a central circular image of the Foundation's work, with animated connector lines and numbered bubbles. On mobile, this degrades gracefully to a vertical numbered list.

#### Proven Impact — Statistics Counter Section

Four animated stat cards that count up from zero when scrolled into view:

- **700,000+** Books Read
- **17,000+** Children Reached
- **12,000** Year-One Target
- **$35** Per Child Per Year

These numbers are pulled live from the database and can be updated by the admin.

#### Gallery Preview

A large centered Swiper carousel displaying gallery images with a "scale down" effect on the side cards, making the active center image visually dominant.

#### Donation Section

A visually compelling call-to-action band driving visitors toward the Donate page. Features the "$35 = 1 child, one full year" messaging with supporting imagery.

#### Blog Section — Stories of Change

A horizontally scrollable blog preview section displaying the latest three articles from the database. Each card displays a cover image, category badge, read time, headline, excerpt, author, and date. On mobile, this becomes a Swiper touch-scroll carousel.

#### Contact Section

A full-width contact form section (see Section 7.9 for details).

---

### 7.3 About Page (`/about`)

#### Page Hero Banner

A parallax-scroll hero banner with a photographic background and deep navy gradient overlay. Displays "About Us" as the primary heading with the "Who We Are" section tag.

#### Who We Are — Interactive Tab Section

A two-column layout featuring:

- **Left:** A dual-image composition with an artistic offset arrangement — one tall portrait image and one landscape image positioned at different heights. A decorative coral-bordered frame sits behind the first image on desktop. A floating dark card at the bottom displays "Africa's 186,548+ Children Need Literacy" with a volunteer link.
- **Right:** A section heading "Transforming Lives Through Literacy," a brief introductory paragraph, and three interactive tab pills — **Our Mission**, **Our Vision**, **Our Excellence**. Each tab reveals animated content: a checklist statement with highlighted numbers in teal, and a dashed-border two-column feature card with icon, title, and description.

This section communicates the Foundation's three core dimensions — purpose (mission), aspiration (vision), and credibility (excellence) — in an interactive, digestible format.

#### Why We Exist — Parallax Text Section

A full-bleed parallax section delivering the core thesis: "Millions Are in School, But Cannot Read," explaining the poverty-literacy cycle with a link to the Problem page.

#### Team Members Section

Profile cards for all Foundation team members, managed live through the Admin Panel. Each card displays a photo, name, role, and brief biography.

#### Proven Impact Section

Animated statistics counters.

#### Donation Section + Contact Section

---

### 7.4 The Problem Page (`/the-problem`)

#### Page Hero Banner

Parallax banner with the "The Crisis" section tag and "The Problem" headline.

#### By the Numbers — Stats Grid

Four large data cards in a 2×2 (mobile) or 4-column (desktop) grid:

- **87%** of 10-year-olds in Sub-Saharan Africa cannot read a simple story
- **2x** more likely to remain in poverty without basic literacy
- **600M+** children worldwide affected by learning poverty
- **SDG 4** — Quality Education — at risk without urgent intervention

Each card features a colored icon, oversized statistic in teal, and a descriptive statement. Cards have hover lift animations.

#### Low Literacy Leads to Life-Long Barriers

A split-screen section: on the left, a full-bleed photograph; on the right, a numbered consequence chain presented as an overlapping card that extends over the image on desktop. The four consequences: Weak Academic Performance, Reduced Confidence, Limited Employment, and Economic Inequality.

#### Without Urgent Intervention — Call to Action

A centered text section with the headline: "Without Urgent Intervention, We Risk Losing an Entire Generation." A button links directly to the Our Solution page, completing the narrative handoff.

#### Donation Section + Contact Section

---

### 7.5 Our Solution Page (`/our-solution`)

#### Page Hero Banner

Parallax banner with "Our Approach" section tag and "Our Solution" headline.

#### Solution Approach Section

The animated four-pillar infographic (Access, Engagement, Assessment, Accountability).

#### Why The PerbiCubs Model Works

Three feature cards in a three-column grid:

- **Digital Scale** — 10,000+ curated books, offline fallbacks for remote areas
- **Gamified Engagement** — Behavioral psychology and game mechanics (leaderboards, badges, levels) build intrinsic motivation
- **Real-Time Accountability** — Every page turned, every quiz answered, and every minute spent reading is tracked for precision intervention

#### Proven Impact + Team Members + Blog + Gallery Sections

---

### 7.6 Programs Page (`/programs`)

#### Page Hero Banner

Parallax banner with "What We Do" section tag and "Programs" headline.

#### How the Platform Works — Methodology

A three-step horizontal methodology flow:

1. **Platform Access** — A child logs into a curated library of thousands of age-appropriate books
2. **Engaged Learning** — Interactive elements, quizzes, and rewards turn reading into a habit
3. **Data & Growth** — Progress tracked in real-time to support teachers and parents

#### Three Program Pillars — Editorial Layout

Each program is a full-bleed split-screen panel (minimum 600px height). Programs alternate image-left and image-right layouts:

**Program 01 — Access to Literacy (Scholarships & Access)**
Full-bleed image with a floating stat card showing "12,000+ Children Targeted." Features: 10,000+ digital books, personalised reading levels, offline access.

**Program 02 — Reading Culture (National Campaigns)**
National campaigns, reading competitions, school-based reading clubs, community literacy festivals. Floating stat: "UNESCO Recognized Impact."

**Program 03 — Research & Policy (Evidence-Based Impact)**
Real-time data tracking, impact reports, EdTech innovation, policy recommendations. Floating stat: "700K+ Books Read."

#### Flagship Initiative — Literacy Scholarship Spotlight

A spotlight section on the Foundation's flagship program featuring two prominent callouts:

- **$35** per child, per year
- **12,000** Year-One Target

A CTA button links to the Donate page.

#### Contact Section

---

### 7.7 Get Involved Page (`/get-involved`)

#### Page Hero Banner

"Take Action" section tag with "Get Involved" headline.

#### You Can Be the Change — Storytelling Section

A two-column section with a large rounded-corner image on the left and the core motivation message on the right: *"Our model is proven. The technology is built. The only missing variable is the resources to scale it to every child who needs it."* A dark navy card highlights **100% Transparency & Accountability**.

#### Choose How You'll Impact — Action Tiles

Three full-height image-background cards with dark gradient overlays and hover animations:

- **Sponsor a Child** — $35/year gives a child full digital literacy access → `/donate`
- **Corporate Partnership** — CSR alignment and employee engagement → Contact section
- **Volunteer & Advocate** — Time, platform, book drives, operational support → Contact section

On hover, each card's content lifts upward and a teal button transitions to white.

#### Blog Section + Contact Section (anchor `#contact`)

---

### 7.8 Donate / Sponsor a Child Page (`/donate`)

#### Hero Banner

Full-bleed photography with the headline "You Can Change a Child's Story." Three trust badges: "Secure & Encrypted," "UNESCO Recognized," "Mastercard Foundation Partner."

#### Donation Form

A two-column layout (form left, impact panel right):

**Currency Toggle:** USD ($) / GHS (₵) pill toggle — all amounts and labels update accordingly.

**Amount Selector:** Six preset pill buttons. Custom amount input field. Default is $35.

**Payment Methods:** Three selectable cards:
- Credit / Debit Card (Visa, Mastercard, Amex) — via Stripe
- Bank Transfer — Direct bank payment
- Mobile Money (MTN, Airtel, Vodafone Cash) — via Paystack, Ghana labeled

**Donor Details:** Full Name and Email Address fields.

**Dedication Toggle:** Optional checkbox reveals an animated input to dedicate the donation in someone's name.

**Submit Button:** Teal "Donate [Amount] [Currency]" button with heart icon. Displays a spinner while processing, then redirects to the Stripe-hosted checkout page. On return, a success screen with animated heart is shown.

#### Impact Calculator (Right Panel)

Live-updating panel showing — based on the selected amount and currency — how many children would receive a full year of access and how many books those children would read.

**Quick reference:**
- $35 = 1 child, full year
- $175 = 5 children
- $350 = 10 children

#### Fund Allocation Panel

Animated bar chart:
- **80%** — Program Delivery
- **12%** — Operations
- **8%** — Outreach & Awareness

#### Trust Logos + Donation FAQ (Accordion)

---

### 7.9 Gallery Page (`/gallery`)

#### Page Hero Banner

Deep navy hero with teal radial glow background and "Our Gallery" headline.

#### Category Filter Pills

Dynamically generated from gallery image categories. Active category highlighted in teal. Grid re-filters with a smooth fade transition.

#### Bento-Grid Photo Gallery

Editorial mosaic layout. First image spans 2×2 cells (featured hero). On hover each image:
- Scales up by 8%
- Receives a teal wash overlay
- Reveals a zoom icon (top-right)
- Reveals the caption with upward slide animation
- Gains a teal inner ring glow

Clicking any image opens the Lightbox.

#### Lightbox

Full-screen dark modal with blur backdrop. Displays the selected image in 4:3 aspect ratio with caption and category badge. Left/right arrow navigation. Position counter (e.g., "3 / 12"). Close button exits.

---

### 7.10 Blog Page (`/blog`)

A living record of the Foundation's progress, stories, research findings, and news. Each article is created and managed through the Admin Panel. Individual posts display: cover image, category badge, read time, publication date, author name and role, and full article body.

---

## 8. The Admin Panel — Website Management System

The Admin Portal (`/admin`) is a fully secured, purpose-built content management system accessible only to authorized Foundation staff. It requires no technical knowledge to operate.

### 8.1 Access & Security

The admin portal is protected by a custom JWT (JSON Web Token) authentication system. Authentication is enforced at the infrastructure level via Next.js middleware — any attempt to directly access any `/admin` URL without a valid session is automatically redirected to the login page, **server-side**, before the page even renders.

**Login flow:** Staff navigate to `/admin/login`, enter their credentials, and receive a signed JWT session cookie. The session persists across browser refreshes.

**Logout:** A dedicated logout button in the sidebar clears the session cookie and redirects to the login page.

### 8.2 Admin Dashboard

Upon login, staff land on the Dashboard showing:

- **Welcome banner** with Foundation name and panel description
- **Live record counts** for all five managed sections as clickable stat cards
- **Total records indicator** with a live green "connected" status pulse
- **Section cards grid** — each content area with icon, item count, plain-English description, and direct action link
- **Quick Tips panel** — reminders that changes appear immediately, images upload directly from the computer, and buttons use dropdowns rather than manual URL typing

### 8.3 Module 1 — Hero Slides Manager

Controls the homepage full-screen carousel. Staff can:

- View all current slides
- **Add** a new slide: upload a background image, write the tag line, headline, subheadline, and configure two CTA buttons via page dropdown
- **Edit** any existing slide in a pre-populated form drawer
- **Delete** a slide (image also deleted from cloud storage automatically)
- **Reorder** slides via an ordering field

Changes appear on the homepage immediately upon save.

### 8.4 Module 2 — Impact Numbers Manager

Controls the "Proven Impact" statistics section on the Homepage, About, and Our Solution pages. Staff can:

- View all current statistics
- **Add** a new stat: numerical value, prefix (e.g., "$"), suffix (e.g., "+"), label (e.g., "Children Reached"), and accent color
- **Edit** or **delete** any existing stat

### 8.5 Module 3 — Photo Gallery Manager

Controls photos on the Gallery page and homepage gallery preview. Staff can:

- View all current photos in a grid
- **Add** photos: upload images directly from their computer, write a caption, assign a category (which powers the filter pills)
- **Edit** captions and categories
- **Delete** photos (automatically removed from cloud storage)

### 8.6 Module 4 — Blog Posts Manager

Controls all articles in the "Stories of Change" blog section. Staff can:

- View all published articles
- **Create** a new article: upload cover image, write title, excerpt, full body, category, date, read time, author name, and author role
- **Edit** any existing article
- **Delete** articles (cover image also removed from cloud storage)

### 8.7 Module 5 — Team Members Manager

Controls the team section on the About and Our Solution pages. Staff can:

- View all current team members
- **Add** a new member: upload profile photo, enter name, role/title, and biographical description
- **Edit** or **delete** existing team members

### 8.8 Admin Panel UI

- **Dark sidebar navigation** (fixed on desktop, spring-animated slide-in drawer on mobile) with Foundation logo, nav items with icons and descriptions, active state in brand teal, and "View Website" external link
- All form operations use a consistent **Drawer** (slide-in panel) pattern — no full-page navigation, context is always maintained
- Success and error states shown inline without page refreshes
- Image uploader supports drag-and-drop or click-to-browse
- All button destination fields use a dropdown of the website's real pages

---

## 9. Additional Features

### 9.1 Contact Form — Email Integration

The Contact Section form (on every page) will be connected to an email address of the Foundation's choice. Upon a visitor submitting the form (Name, Email, Phone, Subject, Message), the data will be automatically delivered to the specified Foundation inbox.

**Technical implementation:** A server-side API route processes the form submission and sends a formatted email using a transactional email service (Resend or Nodemailer via SMTP). The form also shows a confirmation message to the visitor upon successful submission.

**Requires from the Foundation:**
- The email address where messages should be delivered
- (Optional) A custom "from" sender name (e.g., "PerbiCubs Foundation Website")

### 9.2 Stripe Integration — International Donations

The donation form is fully integrated with the **Stripe** payment gateway for international credit and debit card payments.

**How it works:**
1. The donor selects USD currency, an amount, enters their name and email, and clicks Donate
2. The website's server creates a Stripe Checkout Session **server-side** (the visitor never touches raw card data)
3. The donor is redirected to Stripe's hosted, PCI-compliant checkout page
4. Upon successful payment, Stripe redirects back to the Foundation's website with a success confirmation

**Supported:** One-time donations in USD, credit card, debit card, Apple Pay, Google Pay (auto-enabled by Stripe)

**Requires from the Foundation:**
- A Stripe account at [stripe.com](https://stripe.com)
- Stripe Publishable Key and Secret Key to be configured in the deployment environment

### 9.3 Paystack Integration — Ghana / Africa Donations

The **Mobile Money** and **GHS (₵)** donation options are powered by the **Paystack** payment gateway, which natively supports:

- MTN Mobile Money
- Airtel Money
- Vodafone Cash
- Ghana cedis (GHS) transactions
- Local bank card payments across West Africa

**How it works:**
1. The donor selects GHS currency and Mobile Money payment method
2. The server routes the checkout request to Paystack's API
3. The donor receives a USSD prompt or in-app confirmation to authorize the payment
4. Paystack confirms the transaction and the website shows a success state

**Requires from the Foundation:**
- A Paystack account at [paystack.com](https://paystack.com)
- Paystack Public Key and Secret Key to be configured in the deployment environment

---

## 10. Technology Stack

The website is built on an enterprise-grade, production-proven technology stack used by leading organizations worldwide.

### 10.1 Frontend Framework — Next.js 16 (App Router)

Next.js is the world's most widely adopted React framework. The website uses the App Router architecture providing:

- **Server-Side Rendering (SSR)** — Pages rendered on the server as complete HTML, ensuring optimal SEO indexing
- **Server Components** — Database queries run server-side; sensitive API keys never reach the browser
- **Incremental Static Regeneration** — Pages cached and regenerated on demand when content changes in the Admin Panel
- **Built-in Image Optimization** — Automatic WebP/AVIF serving, correct sizes per device, lazy loading

### 10.2 Language — TypeScript

The entire codebase is written in TypeScript — a statically typed superset of JavaScript — ensuring type safety, self-documenting code, and maintainability by any future developer.

### 10.3 Styling — TailwindCSS 4

A utility-first CSS framework generating a minimal CSS bundle containing only styles actually used on the site. The custom design system (colors, fonts, gradients, animations) is declared as a theme configuration ensuring visual consistency.

### 10.4 Database & Backend — Supabase (PostgreSQL)

Supabase provides the complete backend infrastructure:

| Component | Purpose |
|---|---|
| **Database** | PostgreSQL tables for hero slides, impact stats, gallery images, blog posts, team members |
| **Storage** | Cloud file system for all uploaded images (served via global CDN) |
| **Authentication** | Session management for the visitor layer |

When content is deleted from the Admin Panel, the corresponding file is automatically deleted from storage.

### 10.5 Animation Libraries

| Library | Usage |
|---|---|
| **Framer Motion** | Scroll-reveal animations, page transitions, counter effects, accordion behaviors |
| **GSAP** | Complex timeline sequences |
| **Swiper.js** | Hero carousel, gallery preview, mobile blog slider |

### 10.6 Payment Infrastructure

| Service | Usage |
|---|---|
| **Stripe** | International credit/debit card payments (USD) |
| **Paystack** | West Africa Mobile Money and local card payments (GHS) |

### 10.7 Supporting Libraries

| Library | Purpose |
|---|---|
| **React 19** | Latest stable UI library runtime |
| **Lucide React** | Clean, consistent icon library |
| **React CountUp** | Animated number counters for statistics |
| **React Intersection Observer** | Scroll-based section reveal triggers |
| **jose** | JWT signing and verification for admin authentication |
| **clsx** | Conditional class utility for dynamic styling |

---

## 11. Codebase Transfer & Deployment

Upon project completion and full acceptance by the Foundation, the complete codebase will be transferred as follows.

### 11.1 Source Code Handover

The full source code will be delivered via a **private GitHub repository** under an organization or personal account of the Foundation's choosing. The repository will include:

- All application source files (`/app`, `/components`, `/lib`, `/utils`, `/public`)
- All configuration files (`next.config.ts`, `tsconfig.json`, `package.json`, etc.)
- A comprehensive `README.md` documenting project structure, environment variable requirements, local development setup, and deployment instructions
- Supabase SQL migration scripts for recreating the database schema on any new project

The Foundation will have **full, unrestricted ownership** of the repository and all code. There are no licensing restrictions.

### 11.2 Environment Variables

The following environment variables will be configured on the hosting platform and fully documented for the Foundation:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project API URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public access key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase admin key (server-side only) |
| `ADMIN_SESSION_SECRET` | JWT signing secret for admin login |
| `STRIPE_SECRET_KEY` | Stripe server-side API key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe client-side key |
| `PAYSTACK_SECRET_KEY` | Paystack server-side API key |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Paystack client-side key |
| `CONTACT_EMAIL_DESTINATION` | Email address for contact form submissions |
| `SMTP_HOST` / `SMTP_PORT` / credentials | Email delivery configuration |

These are stored securely as environment variables on the hosting platform — **never** exposed in the codebase.

---

## 12. Database & Hosting Migration

### 12.1 Database Migration

The database is hosted on **Supabase**, a fully managed cloud PostgreSQL platform providing:

- Automatic daily backups
- Point-in-time recovery
- 99.9% uptime SLA
- Global CDN for image assets
- Row Level Security (RLS) policies protecting data access

**Migration process — step by step:**

1. The Foundation creates a Supabase account at [supabase.com](https://supabase.com)
2. Creates a new project in their preferred region (recommended: `eu-west-1` for Europe, `us-east-1` for North America, `ap-south-1` for Africa)
3. Runs the provided SQL migration scripts to recreate the exact database schema and seed data
4. Updates the environment variables on the hosting platform to point to the new project

The Foundation retains **full ownership** of their Supabase project, data, and storage.

### 12.2 Hosting Platform

The website is optimized for deployment on **Vercel** — the cloud infrastructure company that builds and maintains Next.js — providing:

- Zero-configuration deployment directly from the GitHub repository
- Global edge network (CDN) for sub-second page loads worldwide
- Automatic SSL/HTTPS certificates at no extra cost
- Preview deployments for every code change before merging to production
- Built-in serverless function support for API routes (donation checkout, contact form, admin actions)

**Alternative compatible hosting platforms:**

- **Netlify** — Similar edge deployment platform
- **Railway** — Container-based Node.js hosting
- **AWS Amplify** — Amazon Web Services deployment
- **DigitalOcean App Platform** — Simple container hosting
- Any VPS running Node.js

The Foundation's preferred domain (e.g., `perbicubsfoundation.org`) will be configured to point to the hosting platform. Full DNS configuration guidance will be provided.

---

## 13. Six-Month Free Maintenance Plan

The Foundation will receive **six (6) calendar months** of complimentary post-launch maintenance beginning from the date the website goes live.

### 13.1 What Is Covered

**Bug fixes and technical issue resolution**
Any technical issue affecting the functioning of the website will be diagnosed and resolved within 48 business hours of being reported. This includes: broken pages, form submission failures, payment gateway errors, display issues across browsers or devices, image loading failures, and admin panel malfunctions.

**Security patches and dependency updates**
Critical security updates will be applied and tested during the maintenance period to ensure the website remains protected.

**Hosting and database monitoring**
Periodic monitoring of the hosting environment and database for performance degradation, unusual traffic patterns, or configuration issues.

**Minor content adjustments**
Up to **two (2) minor content or styling adjustments per month** — such as updating text on a specific page, adjusting a color, or modifying the layout of an existing section.

**Third-party service support**
Guidance and assistance if Stripe, Paystack, Supabase, or the hosting provider changes their API or pricing terms in ways that affect the website.

### 13.2 What Is Not Covered

- Development of new pages or entirely new sections
- Integration of new third-party services not in the original scope
- Design overhauls or rebranding
- Content entry on behalf of the Foundation (the Admin Panel is provided for this purpose)

### 13.3 Response Times

All maintenance requests during the six-month window should be submitted via a dedicated communication channel (email or WhatsApp, to be agreed at handover):

| Priority | Criteria | Response Time |
|---|---|---|
| **Critical** | Site down, payments broken | Within 4 business hours |
| **High** | Significant feature broken | Within 24 business hours |
| **Medium** | Minor display issue | Within 48 business hours |

---

## 14. Deliverables Summary

The following is the complete list of deliverables included in this engagement:

| # | Deliverable | Detail |
|---|---|---|
| 1 | Complete website source code | 9 public pages + Admin Portal |
| 2 | Private GitHub repository | Full ownership transferred to the Foundation |
| 3 | Supabase database setup | Schema, RLS policies, storage bucket, migration scripts |
| 4 | Admin Panel | 5 management modules + secured login system |
| 5 | Stripe integration | USD donations via credit/debit card and digital wallets |
| 6 | Paystack integration | GHS donations via Mobile Money and local cards |
| 7 | Contact form email | Connected to Foundation's specified email address |
| 8 | Newsletter subscription | Subscriber collection via footer form |
| 9 | Domain & hosting setup | Deployment to preferred platform + DNS configuration guidance |
| 10 | Environment variable documentation | All keys, secrets, and configuration fully documented |
| 11 | Admin Panel training | Walkthrough session for Foundation team members |
| 12 | README and technical documentation | Full developer handover document |
| 13 | 6-month free maintenance | Bug fixes, security updates, and minor adjustments |
| 14 | SEO configuration | Title tags, meta descriptions, Open Graph metadata for all pages |

---

*This proposal is the intellectual property of the developer and is submitted exclusively to PerbiCubs Foundation for review. All website content, copy, imagery, and design described herein has been developed specifically for and in service of the PerbiCubs Foundation's mission to end learning poverty in Sub-Saharan Africa.*
