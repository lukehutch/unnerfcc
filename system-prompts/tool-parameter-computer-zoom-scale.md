<!--
name: 'Tool Parameter: Computer zoom scale factor'
description: >-
  Specifies the scale factor range for the zoom tool and reinforces unscaled
  full-resolution coordinates.
ccVersion: 2.1.310
variables:
  - MIN_SCALE
  - MAX_SCALE
-->
Scale factor in [${MIN_SCALE}, ${MAX_SCALE}] for the returned zoom image; smaller images use fewer tokens. Region and click coordinates always stay in the full-resolution coordinate frame; never rescale coordinates yourself.
