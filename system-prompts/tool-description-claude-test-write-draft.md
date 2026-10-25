<!--
name: 'Tool Description: Claude Test write draft spec'
description: Describes writing a draft spec into proposed/ in the run folder for approval.
ccVersion: 2.1.310
-->
Writes one Claude Test draft spec into proposed/ in the run folder named by run, with text as the whole file. For the person's conversation and Claude Test's background spec author. To change a draft, call again with the whole corrected text. It takes no path: it finds the project from run, and writes only into a run folder that Claude Test made on this machine and whose drafts are not saved yet. Never use it for any other file.
