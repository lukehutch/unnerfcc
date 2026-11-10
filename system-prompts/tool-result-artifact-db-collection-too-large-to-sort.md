<!--
name: 'Tool Result: Artifact DB collection too large to sort'
description: >-
  Informs that a collection has too much data to sort on server, advising
  dropping order_by and sorting client-side.
ccVersion: 2.1.321
-->
this collection holds too much data to sort, whatever `query.where` or `query.limit` you pass — drop `query.order_by`, page with `query.cursor` and sort the results yourself; an ordered query will keep failing until the collection holds fewer or smaller documents
