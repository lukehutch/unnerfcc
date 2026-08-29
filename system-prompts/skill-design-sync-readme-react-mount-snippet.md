<!--
name: 'Skill: Design sync README React mount snippet'
description: >-
  JSX snippet demonstrating how to destructure components from the window
  namespace and render them.
ccVersion: 2.1.251
variables:
  - GLOBAL_NAMESPACE
-->
 } = window.${GLOBAL_NAMESPACE};
ReactDOM.createRoot(document.getElementById('ds-root')).render(<
