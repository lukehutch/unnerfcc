<!--
name: 'Tool Parameter: Artifact database query options'
description: >-
  options field of the artifact database read — limit and cursor for paging a
  collection, and the where and order_by clauses that filter and order a query.
ccVersion: 2.1.231
-->
Options for db_op 'list' and 'query': `limit` and `cursor` (from a prior result's `next_cursor`) page through a collection; `where` clauses ([field, operator, value] triples) and `order_by` filter and order a 'query' only.
