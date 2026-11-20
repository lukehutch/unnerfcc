<!--
name: 'Tool Description: Projects duplicate upload id note'
description: >-
  Explains that bracketed ids in project file names disambiguate uploads for
  tool calls but are hidden from the user in claude.ai.
ccVersion: 2.1.329
-->
A file name with an id in brackets, as in `photo (3f8c2a41).jpeg`, is as a rule an upload whose name a newer upload or a doc also has. The Projects tool adds the id for its own calls: a read of the name without the id opens the doc or the newest upload. The user's view of the project in claude.ai shows no id, so an id cannot help the user find a file. To the user these are files of one name, which can differ in what they hold and in when they were uploaded. The Projects tool gives the time of each upload; how claude.ai orders or labels the files is not known here. The Projects tool cannot remove an upload. A person with edit access can, in the project on claude.ai. These names can change when files are added or removed.
