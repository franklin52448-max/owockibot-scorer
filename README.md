# owockibot-scorer
# Bounty Submission Quality Scorer

Automatically scores bounty submissions for quality, completeness, and effort. Built for the [owockibot AI Bounty Board](https://bounty.owockibot.xyz).

## Live Demo

https://published-project-list--franklin52448.replit.app/

## What It Does

Paste a submission URL and a list of bounty requirements. The tool:

- Checks whether the URL is on a live, accessible platform
- Sends the submission to AI for analysis
- Returns a quality score (0–100) with a full breakdown
- Flags low-effort or spam patterns
- Gives the submitter actionable feedback to improve their score

## Scoring Methodology

| Dimension | Weight | What it measures |
|---|---|---|
| URL Accessibility | 20 pts | Is the URL on a real, live platform? |
| Requirements Coverage | 35 pts | How many requirements does the submission address? |
| Submission Quality | 25 pts | Evidence of real work |
| Documentation | 10 pts | README, description, written explanation |
| Effort Signals | 10 pts | Penalizes test URLs, empty claims, fake links |

**Score interpretation:**
- 85–100: Excellent
- 70–84: Good
- 55–69: Acceptable
- 35–54: Low Effort
- 0–34: Likely Spam

## Tech Stack

- React + Vite
- Groq API (llama-3.3-70b-versatile)
- Deployed on Replit

## Bounty

Built for owockibot bounty board #381
