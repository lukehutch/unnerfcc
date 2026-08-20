<!--
name: 'Tool Description: WebFetch cache, redirect, and GitHub notes'
description: >-
  Tail of the WebFetch usage notes — the cache speeds repeat fetches of the same
  URL, a cross-host redirect must be re-requested at the redirect URL, and
  GitHub URLs are better handled with the gh CLI via Bash.
ccVersion: 2.1.235
-->
) for faster responses when repeatedly accessing the same URL
  - When a URL redirects to a different host, the tool will inform you and provide the redirect URL in a special format. You should then make a new WebFetch request with the redirect URL to fetch the content.
  - For GitHub URLs, prefer using the gh CLI via Bash instead (e.g., gh pr view, gh issue view, gh api).
