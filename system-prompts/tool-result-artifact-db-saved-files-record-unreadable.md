<!--
name: 'Tool Result: Artifact DB Saved Files Record Unreadable'
description: >-
  Reports that saved database document records are unreadable and suggests
  listing out_dir.
ccVersion: 2.1.270
variables:
  - COLLECTION_NAME
  - OUT_DIR_HINT
  - EXTRA_NOTE
-->
Documents from collection ${COLLECTION_NAME} were saved to local files, but the save record is unreadable — list the out_dir to see them.${OUT_DIR_HINT}${EXTRA_NOTE}
