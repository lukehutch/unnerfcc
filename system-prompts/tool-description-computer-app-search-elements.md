<!--
name: 'Tool Description: Computer app_search_elements'
description: Describes searching accessibility elements in a window's last screenshot.
ccVersion: 2.1.310
variables:
  - SEARCH_GUIDANCE
-->
Search the accessibility elements captured by the last app_screenshot of one window. Filter by role (e.g. "AXTextArea", "AXButton") and/or title substring. Returns matching elements with their [N] index — pass that as element_index to app_click/app_type. Use this when the inline summary in app_screenshot doesn't show the element you need (it only lists the first few actionable ones).${SEARCH_GUIDANCE}
