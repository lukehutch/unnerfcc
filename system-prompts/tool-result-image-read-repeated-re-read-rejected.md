<!--
name: 'Tool Result: Image read repeated re-read rejected'
description: >-
  Refuses to re-read an unchanged image that has already been returned multiple
  times to conserve context space.
ccVersion: 2.1.321
variables:
  - READ_COUNT
-->
Image not read again: Read has already returned this unchanged image at least ${READ_COUNT} times, most of your recent image reads were of images you had already read, and this conversation holds more images and documents than one request can carry, so each re-read pushes out others and re-sends the conversation. Work from what you have already seen, and keep fewer images in play at once. If you cannot go on without this image, say so in your reply.
