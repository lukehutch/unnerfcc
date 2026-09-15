<!--
name: 'Tool Result: Artifact publish capabilities override fallback'
description: >-
  Advises publishing intended capabilities with contract latest to bypass a
  failing grant read.
ccVersion: 2.1.272
-->
 If the read keeps failing, publish the page declaring the capabilities you intend (capabilities: {} clears the stored declaration) together with contract: 'latest', which needs no read.
