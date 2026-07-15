---
name: bw-query-spec-review
description: Review a proposed SAP BW query specification for gaps, ambiguity, performance risks, and testable acceptance criteria
allowed-tools:
  - Read
  - Grep
  - Glob
argument-hint: "[specification-file-or-text]"
arguments:
  - name: specification
    description: Password-free BW query specification file or supplied business requirements
    required: true
---

# BW Query Specification Review

Reject and do not repeat credentials. Existing queries are read-only.

Map the request to QuerySpec v1. Return resolved facts, blocking gaps, non-blocking gaps, semantics-preserving optimizations, semantics-changing proposals requiring approval, acceptance evidence, and the draft-readiness decision. Do not create or save a draft during review.

## Output Contract

Return:

- Resolved provider/query facts and stated assumptions.
- Blocking and non-blocking specification gaps.
- Optimizations separated by semantic impact.
- Acceptance criteria and evidence still required.
- A clear ready-for-local-draft or blocked decision.
