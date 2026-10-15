@wiki/index.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Gitcoin Passport is a monorepo using npm workspaces. It provides identity verification through verifiable credentials.

### Key Packages:
- **app** - Next.js frontend application (React/TypeScript, Tailwind CSS, Chakra UI)
- **iam** - Express backend for credential issuance/verification
- **embed** - Service for embedding passport functionality
- **database-client** - Database connection layer (Ceramic Network support)
- **identity** - Helper package for DIDKit and identity functions
- **platforms** - Shared platform providers and verification logic
- **types** - Shared TypeScript definitions
- **embed-popup** - Vite-based UI for embedded experiences

## Prerequisites

- Node.js v20 LTS
- npm (included with Node)

## Global Commands

From the root directory:

```bash
# Install dependencies for all packages
npm install

# Build all packages
npm run build

# Start development servers (app + iam concurrently)
npm run dev

# Run all tests
npm test

# Lint all packages
npm run lint

# Format code
npm run prettier

# Clean all packages
npm run clean

# Build specific package
npm run build -w @gitcoin/passport-app
npm run build -w @gitcoin/passport-iam
npm run build -w @gitcoin/passport-embed
```

## Package-Specific Commands

### App (Frontend)
```bash
cd app/

# Development
npm run dev         # Start dev server on port 3000
npm run build       # Production build
npm run prod-start  # Run production build

# Testing (Vitest)
npm test               # Run all tests
npm run test:watch         # Watch mode

# Run specific test file
npm test components/Header.test.tsx
npm test --run components/Header.test.tsx  # Single run

# Linting
npm run lint
npm run prettier
```

### IAM Service
```bash
cd iam/

# Development
npm run debug     # Start on port 65535 with nodemon and inspect
npm start         # Production start

# Testing (Jest)
npm test                          # All tests

# Build
npm run build
npm run clean
```

### Embed Service
```bash
cd embed/

# Development
npm run debug     # Start with nodemon
npm start         # Production start

# Testing (Jest)
npm test                     # All tests

# Build
npm run build
```

## Running Individual Tests

### Vitest (App package)
```bash
# Run tests matching pattern
npm test Button
npm test components/Header

# Run tests in specific directory
npm test components/

# Debug mode
npm test --reporter=verbose
```

### Jest (IAM, Embed, Platforms, etc.)
```bash
# Run single test file
npm test path/to/test.ts

# Run tests matching pattern
npm test --testNamePattern="should verify credential"

# Update snapshots
npm test -u
```

## Common Development Workflows

### Working on a feature across packages:
```bash
# 1. Make changes in platforms/
cd platforms/
npm run build

# 2. Test changes in app/
cd ../app/
npm run dev

# 3. Run affected tests
npm test components/PlatformCard
```

### Pre-commit testing:
```bash
# From root - test all
npm test

# Or test specific packages
npm run test -w @gitcoin/passport-app
npm run test -w @gitcoin/passport-iam
```

### Debugging services:
```bash
# Run IAM with debugging
cd iam/
npm run debug

# Check service logs
npm run debug 2>&1 | tee debug.log
```

## Environment Setup

Each service needs its own `.env` file based on `.env-example.env`. Critical variables:
- `NEXT_PUBLIC_PASSPORT_IAM_URL` - IAM service URL
- `NEXT_PUBLIC_SCORER_ENDPOINT` - Scorer API URL
- OAuth credentials for providers (Google, GitHub, Discord, etc.)
- RPC URLs for blockchain networks
- Feature flags for stamp providers

## Architecture Notes

- **Build Order**: platforms → identity → database-client → iam → embed → app
- **Testing**: Jest for backend services, Vitest for frontend
- **State Management**: React Context API with custom hooks
- **Styling**: Tailwind CSS with Chakra UI components
- **API Communication**: REST APIs with typed interfaces
- **Verification**: DIDKit for credential issuance, EAS for on-chain attestations

## Styling Guidelines

### Color System
Always use the theme-defined color tokens instead of hardcoded colors. The app uses a palette system with CSS custom properties accessible through Tailwind classes.

**Color Palette Reference (LUNARPUNK_DARK_MODE theme):**
- `background` → #F5F5F5 (light gray)
- `background-2` → #08205F (dark purple)
- `background-3` → #4A47D3 (iris)
- `background-4` → #122B33 (night blue)
- `background-5` → #FF8846 (orange)
- `foreground` → #FFFFFF (white)
- `foreground-2` → #C1F6FF (ice blue)
- `foreground-3` → #4B5F65 (iron gray)
- `foreground-4` → #6CB6AD (sea foam)
- `foreground-5` → #22645C (green)
- `foreground-6` → #074853 (turquoise)
- `foreground-7` → #D2DC95 (pale yellow)

**Text Colors:**
- `color-1` → #FFFFFF (white)
- `color-2` → #6CB6AD (sea foam)
- `color-3` → #D2D2D2 (light grey)
- `color-4` → #000000 (black)
- `color-5` → #4ABEFF (bright blue)
- `color-6` → #F5F5F5 (background/light)
- `color-7` → #FF8846 (orange)
- `color-8` → #A0FE7F (yellow green)
- `color-9` → #737373 (gray)
- `color-10` → #FEA57F (orange red)

**Other Theme Colors:**
- `focus` → #FF8846 (red/orange)

**Usage Examples:**
```tsx
// Correct - using theme colors with Tailwind classes
<div className="text-color-1 bg-background border-foreground-5">
  <p className="text-color-2">Secondary text in sea foam</p>
  <button className="bg-foreground-2 hover:bg-foreground-3">Ice blue button</button>
</div>

// Also correct when Tailwind doesn't support it
<div style={{ backgroundColor: "rgb(var(--color-background-2))" }}>

// Incorrect - hardcoded colors
<div className="text-gray-800 bg-white border-gray-200">
```

**Note:** All colors can be used with any Tailwind prefix (text-, bg-, border-, etc.). The theme system converts hex values to RGB format for CSS custom properties.

Always check existing components for color usage patterns before implementing new features.

### Stamp/Provider Architecture

The codebase uses a clean separation between platforms (frontend) and providers (backend):

#### Frontend (App)
- **Platform Classes**: Located in `platforms/src/{PlatformName}/App-Bindings.tsx`
  - Extend the base `Platform` class
  - Implement `getProviderPayload()` for authentication flows
  - Handle OAuth redirects, wallet connections, or custom flows
  - Can include banners for user instructions
- **GenericPlatform Component**: Universal UI for all stamps (`app/components/GenericPlatform.tsx`)
  - Handles standard OAuth popup flows
  - Manages stamp selection and verification
  - Sends verification requests to IAM service

#### Backend (IAM + Platforms)
- **Provider Classes**: Located in `platforms/src/{PlatformName}/Providers/{providerName}.ts`
  - Implement the `Provider` interface with `verify()` method
  - Take `RequestPayload` and return `VerifiedPayload`
  - Handle OAuth token exchange, API calls, or on-chain verification
- **Verification Flow**: IAM service coordinates verification
  - Receives signed challenge from frontend
  - Groups providers by platform
  - Calls each provider's `verify()` method
  - Issues Verifiable Credentials for successful verifications

#### Common Patterns
1. **OAuth Providers** (Discord, Google, LinkedIn):
   - Frontend: Generate OAuth URL, handle popup redirect
   - Backend: Exchange code for token, verify with provider API
2. **On-Chain Providers** (Civic, ETH, NFT):
   - Frontend: Use wallet connection, no OAuth
   - Backend: Query blockchain data directly
3. **Procedure-Based** (Twitter, BrightID):
   - Use `procedure-router` for complex server-side flows
   - Custom multi-step authentication

#### Key Files for Stamp Development
- `/platforms/src/platforms.ts` - Register new platforms
- `/app/config/platformMap.ts` - Frontend platform configuration
- `/platforms/src/{Platform}/Providers-config.ts` - UI metadata and grouping
- `/types/src/index.d.ts` - Type definitions for provider IDs

## Infrastructure Architecture

The monorepo uses a dual ALB architecture with external and internal services:

### External vs Internal ALB Pattern

#### External ALB (Public Services)
- **Purpose**: User-facing services accessible from the internet
- **Routing**: Host-based routing using subdomains
- **Examples**: 
  - `iam.passport.xyz` → IAM Service
  - `embed.passport.xyz` → Embed Service
- **Configuration**: Defined in `infra/aws/iam.ts`, `infra/aws/embed.ts`
- **Security**: HTTPS termination, public DNS records

#### Internal ALB (Service-to-Service)  
- **Purpose**: Internal services for service-to-service communication
- **Routing**: Path-based routing on internal endpoints
- **Examples**:
  - `internal-alb.gitcoin.co/data-science` → Data Science API
  - `internal-alb.gitcoin.co/hn-signer` → HN Signer Service
- **Configuration**: Uses `internalAlbBaseUrl` from separate stack references
- **Security**: Internal VPC only, no external access

### Adding New Services

#### External Service Pattern
```typescript
// Host-based routing with public DNS
const albListenerRule = new aws.lb.ListenerRule("service-https", {
  listenerArn: albHttpsListenerArn,
  priority: 150, // Unique priority
  actions: [{ type: "forward", targetGroupArn: targetGroup.arn }],
  conditions: [{ hostHeader: { values: ["service.domain"] }}],
});
```

#### Internal Service Pattern  
```typescript
// Path-based routing for internal ALB
// Service configured to use internal ALB target group
// No external DNS records created
// Security group restricts access to internal VPC only
```

### Secret Management Patterns

#### Shared Secrets (High Security)
- **Location**: `PASSPORT_VC_SECRETS_ARN` (shared across services)
- **Examples**: Cryptographic keys, JWT signing keys
- **Pattern**:
  ```typescript
  {
    name: "HUMAN_NETWORK_CLIENT_PRIVATE_KEY",
    valueFrom: `${PASSPORT_VC_SECRETS_ARN}:HUMAN_NETWORK_CLIENT_PRIVATE_KEY::`,
  }
  ```
- **Usage**: IAM, embed, and hn-signer services

#### Service-Specific Secrets
- **Location**: Per-service secret objects via 1Password sync
- **Examples**: API keys, database URLs
- **Pattern**: `secretsManager.syncSecretsAndGetRefs()`

#### IAM Permissions
Services need explicit IAM permissions for both:
1. Service-specific secret access (automatically configured)
2. Shared secret access (manual configuration required)

### Internal Service Communication

#### Environment Variables for Internal Services
```typescript
// Set internal service URLs as environment variables
environment: [
  {
    name: "DATA_SCIENCE_API_URL", 
    value: passportDataScienceEndpoint // From internal ALB
  },
  {
    name: "HN_SIGNER_URL",
    value: "http://internal-alb.gitcoin.co/hn-signer"
  }
]
```

#### Usage Pattern
```typescript
// Services call internal endpoints via HTTP (not HTTPS)
const dataScienceEndpoint = process.env.DATA_SCIENCE_API_URL;
const url = `http://${dataScienceEndpoint}/${url_subpath}`;
```

### HN Signer Service Example

The HN Signer demonstrates the internal service pattern:
- **Infrastructure**: `infra/aws/hn_signer.ts`
- **Access**: Internal ALB only, path-based routing
- **Secrets**: Uses shared `HUMAN_NETWORK_CLIENT_PRIVATE_KEY`
- **Communication**: IAM/embed services call via internal URL
- **Security**: VPC-internal security group, no external access

### Stack References and Dependencies

#### Core Infrastructure Stack
- **Purpose**: Provides shared ALB, VPC, Redis, DNS
- **Exports**: `coreAlbArn`, `albHttpsListenerArn`, `vpcId`, `vpcPrivateSubnets`

#### Data Science Stack  
- **Purpose**: Provides internal ALB base URL
- **Export**: `internalAlbBaseUrl`
- **Usage**: Referenced as `passportDataScienceEndpoint`

#### Service Communication Flow
1. External traffic → External ALB → Public services (IAM/embed)
2. Internal traffic → Internal ALB → Internal services (data science, HN signer)
3. Service-to-service → Internal ALB endpoints via HTTP

## Troubleshooting

- **Module not found**: Run `npm install` from root
- **Type errors**: Rebuild packages with `npm run build`
- **Test failures**: Check if services are running (Redis, APIs)
- **Port conflicts**: Default ports are 3000 (app), 65535 (IAM), 80 (embed)

## Commit and Branch Conventions

- **Commit Messages**: Follow conventional commits spec loosely
  - Format: `feat/chore/etc(subpackage): message...`
- **Branch Names**: Start with issue number from passportxyz/passport
  - Example: `3526-bla-bla`
- **Pull Requests**:
  - Reference issue like "fixes #3526"
  - PR title should match the primary commit message
