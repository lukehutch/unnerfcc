<!--
name: 'Tool Result: allowed_domains rejected by strict network policy'
description: >-
  Explains that allowed_domains cannot expand access under strict or managed
  domain policies.
ccVersion: 2.1.270
-->
allowed_domains cannot widen network access in this session: the configured sandbox allowlist is the whole allowlist here (a managed-domains-only or strictAllowlist policy, or a confined evaluation run). Remove allowed_domains and use a host the configured allowlist already covers.
