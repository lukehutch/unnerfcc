<!--
name: 'Tool Result: Managed agents secure disallowed prefix ID'
description: 'Refuses ant commands targeting staging, vertex, or bedrock managed agent IDs.'
ccVersion: 2.1.310
-->
Claude Code did not run this command: it holds an ID starting agent_, env_ or vlt_ then staging_, vrtx_ or bdrk_, which `ant` commands may not use. Do not run the command another way: tell the developer which ID was refused and ask where it came from. If this is part of /claude-api managed-agents-secure, mark each report row that needs it CAN'T TELL.
