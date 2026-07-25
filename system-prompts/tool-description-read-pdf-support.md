<!--
name: 'Tool Description: Read (PDF support)'
description: >-
  Read tool note on PDF files — large PDFs require the pages parameter and a
  maximum of 20 pages per request.
ccVersion: 2.1.219
-->

- This tool can read PDF files (.pdf). For large PDFs (more than 10 pages), you MUST provide the pages parameter to read specific page ranges (e.g., pages: "1-5"). Reading a large PDF without the pages parameter will fail. Maximum 20 pages per request.
