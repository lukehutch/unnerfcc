<!--
name: 'Tool Result: Connector file object argument rejected'
description: >-
  Model-facing error explaining that an argument holding an id, mimeType, and
  size file object was blocked and must be replaced or omitted.
ccVersion: 2.1.325
-->
 holds an object with an id, a mimeType and a size, which is how a file is written for a connector, and this call is not passed on with such an object. Write there another value the tool takes in that argument, or leave it out.
