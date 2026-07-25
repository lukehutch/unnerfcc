<!--
name: 'Tool Description: Read notebook and error behavior'
description: >-
  Read tool notes that .ipynb files come back as cells with outputs and that a
  directory, missing, or empty file returns an error or system reminder instead
  of content.
ccVersion: 2.1.219
variables:
  - ADDITIONAL_READ_NOTES
-->
 Reads Jupyter notebooks (.ipynb) as cells with outputs.
- Reading a directory, a missing file, or an empty file returns an error or system reminder rather than content.${ADDITIONAL_READ_NOTES}
