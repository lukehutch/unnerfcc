<!--
name: 'Tool Parameter: Easel chart y axis columns specification'
description: 'Specifies value columns, plot sharing rules, and maximum plot limits.'
ccVersion: 2.1.310
variables:
  - MAX_RATIO
  - MAX_PLOTS
-->
the value columns. Lines share a plot where they have one unit and their largest values are within ${MAX_RATIO} times of each other, columns only where they stack. ${MAX_PLOTS} plots at most, and the rest are named
