<!--
name: 'Tool Result: Project write version conflict'
description: >-
  Refuses document write due to version mismatch and provides retry instructions
  via project_read.
ccVersion: 2.1.310
-->
Write refused; nothing in the project was changed. The doc at this path is no longer the version in if_version: someone else, another session, or an earlier save of yours has changed it. Call project_read on this path, make your change in the text that it returns, and write again with the version that it returns as if_version, up to two retries in total. If it is still refused, tell the user that the new content was not saved, and offer it to them another way. Do not drop if_version to force the write, and do not delete the doc.
