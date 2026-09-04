# PerbiCubs Foundation Ghana LBG · Website Corrections

## Website Corrections — Required Before Resubmission

**Task list for the web team**

- **Site:** perbicubsfoundation.org
- **Trigger:** Google for Nonprofits declined activation: “the connection between PerbiCubs Foundation Ghana LBG and perbicubsfoundation.org couldn’t be verified”
- **Prepared:** 19 August 2026
- **Owner:** Naa Anyele Perbi
- **Priority:** Urgent — blocks Workspace and Ad Grants activation
- **Status:** Open

## Why this is urgent

Google’s reviewer cannot confirm the website belongs to our registered charity because the site never states the full legal name or either registration number. This is very likely the entire cause of the rejection.

Once fixed, we reply to Google’s email rather than reapplying from scratch.

# 1. Required — fixes the rejection

These two changes are the priority. Everything else in this document is secondary.

## 1.1 Add the legal name and registration numbers to the footer

The footer renders on every page, which is what a crawler checks. Add this as a new line in the footer, near the existing contact details:

> PerbiCubs Foundation Ghana LBG is a private company limited by guarantee registered in Ghana (Reg. No. CG078901125) and licensed as a National Non-Profit Organisation (Licence No. NPOS/GR01/LN03568/26).

## 1.2 Add the same line to the About page

A human reviewer looks at About first. Add the same sentence near the top of `/about`, before or alongside the existing mission copy.

Neither of these needs new design work — plain text is enough. The goal is that **“PerbiCubs Foundation Ghana LBG,” “CG078901125,” and “NPOS/GR01/LN03568/26”** all appear as real, visible text on the site.

# 2. While you’re in there — unrelated but worth fixing

## 2.1 Broken donation link

The **“Donate via Chango”** button on the homepage currently points to a placeholder:

```text
Donate via Chango href="#CHANGO_LINK_HERE"
```

Needs the live Chango link before any donor clicks it.

## 2.2 Two figures on the homepage are out of date

### Impact section — “1,000,000+ books read”

The number is correct. The label is not — change **“books read”** to **“quizzes passed.”** This wording is settled and applies everywhere on the site, not just this line.

### Blog blurb — “a single $35 donation”

Superseded. Current confirmed asks are **USD $53/child in Ghana** and **USD $56/child (Canada & US, grossed up for the Myriad 5% fee).**

Update or remove this figure from the blurb.

## 2.3 Meta description says “education NGO”

The page’s meta description currently reads:

> “PerbiCubs Foundation is an education NGO in Sub-Saharan Africa...”

This is the same phrasing Google’s nonprofit exclusion targets (schools, academic institutions). It didn’t cause this specific rejection, but it sits closer to that line than it needs to.

**Suggested replacement:**

> “PerbiCubs Foundation is a grant-making charity in Sub-Saharan Africa providing digital reading access and scholarships for children.”

# 3. Task checklist

| # | Task | Owner | Status |
|---|---|---|---|
| 1 | Add legal name + registration numbers to footer | — | Open |
| 2 | Add legal name + registration numbers to About page | — | Open |
| 3 | Fix Chango donation link | — | Open |
| 4 | Change “books read” → “quizzes passed” in impact section | — | Open |
| 5 | Update or remove “$35 donation” in blog blurb | — | Open |
| 6 | Update meta description away from “education NGO” | — | Open |
| 7 | Confirm all changes are live on perbicubsfoundation.org | — | Open |
| 8 | Reply to Google’s email linking to the updated About page | Anyele | Open |

## Done when

**“PerbiCubs Foundation Ghana LBG,” “CG078901125” and “NPOS/GR01/LN03568/26”** are all visible, real text on both the footer and `/about` — not images, not JavaScript-only content.

Reply to Google only after confirming this on the live site, not a preview or staging build.

---

*Prepared 19 August 2026 for PerbiCubs Foundation Ghana LBG, following Google for Nonprofits’ activation rejection. Circulate to the web team and mark tasks complete as each goes live.*
