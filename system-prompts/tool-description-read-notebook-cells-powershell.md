<!--
name: 'Tool Description: Read notebook cells with PowerShell'
description: >-
  Shows the model PowerShell commands for reading selected cells of a large
  notebook instead of the whole file.
ccVersion: 2.1.231
variables:
  - SHELL_TOOL_NAME
-->
Use ${SHELL_TOOL_NAME} to read specific portions:
  Get-Content <notebook_path> | ConvertFrom-Json | Select-Object -ExpandProperty cells | Select-Object -First 20
  Get-Content <notebook_path> | ConvertFrom-Json | Select-Object -ExpandProperty cells | Select-Object -Skip 100 -First 20 # Cells 100-120
  (Get-Content <notebook_path> | ConvertFrom-Json).cells.Count # Count total cells
  Get-Content <notebook_path> | ConvertFrom-Json | Select-Object -ExpandProperty cells | Where-Object cell_type -eq code | Select-Object -ExpandProperty source
