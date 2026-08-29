#!/bin/bash
SCRATCH="/private/tmp/claude-501/-Users-andreadugarte-Library-Application-Support-Claude-local-agent-mode-sessions-049a0d31-db3d-46c5-8a47-e632c0f53d92-9226fe70-69e7-4ab1-b111-7853294eb325-local-82452f55-056a-4986-a545-a377df88f9ea-o-m4pzo7/3db16959-1f8f-4b68-8c62-19063506457d/scratchpad"
export PATH="$SCRATCH/node/node-v22.12.0-darwin-arm64/bin:$PATH"
cd "$(dirname "$0")/.."
exec node_modules/.bin/next dev -p 3000
