<!--
name: 'Tool Result: Claude Test run value not typed'
description: >-
  Reports that the run's unique value was not typed into an application page
  field.
ccVersion: 2.1.310
variables:
  - RUN_VALUE
  - DETAILS
-->
this run's value, ${RUN_VALUE}, has not been typed into the page${DETAILS} (only browser_type and browser_fill_form count as typing, into a field of the page and never in a call that also types a secret KEY; a browser dialog's text does not count)
