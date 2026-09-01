<!--
name: 'Tool Parameter: Artifact action — list_types and describe_type'
description: >-
  Describes the artifact action list_types and describe_type parameters for
  discovering and inspecting artifact types.
ccVersion: 2.1.257
-->
 'list_types' lists the published Artifact types this account can start a new Artifact from — titles, descriptions and links (only `type_query` may accompany it); 'describe_type' shows one type's details — its files, whether it ships instructions, the capabilities it uses (pass the type's link as `type_url`, nothing else); 'list' also takes an Artifact type — its name as `type`, or its link as `type_url` — and then lists instead the Artifacts made from that type that this user can open — their own and their organization's (where the organization curates that type, only the ones it lists for new artifacts), its default first when there is one (`scope` and `limit` may accompany it).
