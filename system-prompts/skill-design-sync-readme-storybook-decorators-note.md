<!--
name: 'Skill: Design sync README Storybook decorators note'
description: >-
  Documentation note explaining that components may need Storybook preview
  decorator context.
ccVersion: 2.1.251
-->

This DS's storybook wraps every story in decorators from `.storybook/preview`
(bundled for the preview cards as `_vendor/preview-decorators.js`). Components
likely need equivalent context — theme/i18n providers — in your tree too. The
exact chain hasn't been distilled into config, so check the DS's documented
provider setup before composing.
