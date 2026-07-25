<!--
name: 'Tool Parameter: Artifact list scope'
description: >-
  scope parameter of the artifact list operation — mine, shared, or all, and
  which rows the update flow can target.
ccVersion: 2.1.219
-->
list only: 'mine' (default) lists artifacts the user owns — the only ones the update flow can target; 'shared' lists artifacts other people shared with the user (read-only); 'all' lists both. Rows are labeled (mine)/(shared) whenever scope is not 'mine'.
