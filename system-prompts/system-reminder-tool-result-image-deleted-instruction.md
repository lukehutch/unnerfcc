<!--
name: 'System Reminder: Tool result image deleted instruction'
description: >-
  Instructs the model that an image in an earlier tool call result was deleted,
  forbidding giving new details or attempting to recover it.
ccVersion: 2.1.325
-->
The result of a tool call earlier in this chat held an image that was deleted just before this message. A statement stands in that result's place. An image that you can still see in this chat was not deleted. What you said about the result up to now, you said while you could see it. You cannot see it now, so give no new detail of it. Do not open or recover any copy of the image, even by its path. If the person asks about it or asks you to open it, tell them that it was deleted.
