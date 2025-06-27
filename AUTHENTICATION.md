# Authentication Guide

The Corti TypeScript SDK supports multiple authentication methods to accommodate different use cases and integration patterns.

## Table of Contents

- [Client Credentials Flow](#client-credentials-flow)
- [Bearer Token Flow](#bearer-token-flow)
- [Token Refresh](#token-refresh)
- [Environment Configuration](#environment-configuration)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)

## Client Credentials Flow

The client credentials flow is the simplest authentication method, suitable for server-to-server applications where you have client credentials.

### Basic Usage

```typescript
import { CortiEnvironment, CortiClient } from "@corti/core";

const client = new CortiClient({
    environment: CortiEnvironment.BetaEu,
    tenantName: "YOUR_TENANT_NAME",
    auth: {
        clientId: "YOUR_CLIENT_ID",
        clientSecret: "YOUR_CLIENT_SECRET",
    },
});
```

### With Dynamic Credentials

You can also provide credentials as functions for dynamic credential management:

```typescript
import { CortiEnvironment, CortiClient } from "@corti/core";

const client = new CortiClient({
    environment: CortiEnvironment.BetaEu,
    tenantName: "YOUR_TENANT_NAME",
    auth: {
        clientId: () => process.env.CORTI_CLIENT_ID!,
        clientSecret: () => process.env.CORTI_CLIENT_SECRET!,
    },
});
```

### Available Environments

- `CortiEnvironment.BetaEu` - Beta environment (Europe)
- `CortiEnvironment.Us` - Production environment (United States)
- `CortiEnvironment.Eu` - Production environment (Europe)

## Bearer Token Flow

The bearer token flow is useful when you already have an access token from an external authentication system or when you need to manage tokens manually.

### Basic Bearer Token

```typescript
import { CortiEnvironment, CortiClient } from "@corti/core";

const client = new CortiClient({
    environment: CortiEnvironment.BetaEu,
    tenantName: "YOUR_TENANT_NAME",
    auth: {
        accessToken: "YOUR_ACCESS_TOKEN",
    },
});
```

### With Token Expiration

If your token has an expiration time, you can provide it to help the SDK manage token lifecycle:

```typescript
import { CortiEnvironment, CortiClient } from "@corti/core";

const client = new CortiClient({
    environment: CortiEnvironment.BetaEu,
    tenantName: "YOUR_TENANT_NAME",
    auth: {
        accessToken: "YOUR_ACCESS_TOKEN",
        expiresIn: 3600, // Token expires in 1 hour
    },
});
```

### Dynamic Token Supply

You can provide tokens as functions for dynamic token management:

```typescript
import { CortiEnvironment, CortiClient } from "@corti/core";

const client = new CortiClient({
    environment: CortiEnvironment.BetaEu,
    tenantName: "YOUR_TENANT_NAME",
    auth: {
        accessToken: () => getCurrentToken(), // Your token retrieval function
        expiresIn: 3600,
    },
});
```

## Token Refresh

For bearer token authentication, you can implement automatic token refresh by providing refresh tokens and a refresh function.

### Complete Refresh Setup

```typescript
import { CortiEnvironment, CortiClient } from "@corti/core";

const client = new CortiClient({
    environment: CortiEnvironment.BetaEu,
    tenantName: "YOUR_TENANT_NAME",
    auth: {
        accessToken: "YOUR_ACCESS_TOKEN",
        refreshToken: "YOUR_REFRESH_TOKEN",
        expiresIn: 3600, // Access token expires in 1 hour
        refreshExpiresIn: 86400, // Refresh token expires in 24 hours
        
        // Custom refresh function
        refreshAccessToken: async (refreshToken: string) => {
            // Call your token refresh endpoint
            const response = await fetch('https://your-auth-server.com/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh_token: refreshToken }),
            });
            
            const data = await response.json();
            
            return {
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
                expiresIn: data.expires_in,
                refreshExpiresIn: data.refresh_expires_in,
            };
        },
    },
});
```

### Using Corti's Auth Endpoint

If you're using Corti's authentication system, you can use the built-in auth client:

```typescript
import { CortiEnvironment, CortiClient, CortiAuth } from "@corti/core";

// Create an auth client for token refresh
const authClient = new CortiAuth({
    environment: CortiEnvironment.BetaEu,
    tenantName: "YOUR_TENANT_NAME",
    clientId: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
});

const client = new CortiClient({
    environment: CortiEnvironment.BetaEu,
    tenantName: "YOUR_TENANT_NAME",
    auth: {
        accessToken: "YOUR_ACCESS_TOKEN",
        refreshToken: "YOUR_REFRESH_TOKEN",
        expiresIn: 3600,
        refreshExpiresIn: 86400,
        
        // Use Corti's auth client for refresh
        refreshAccessToken: async (refreshToken: string) => {
            const response = await authClient.getToken({
                clientId: "YOUR_CLIENT_ID",
                clientSecret: "YOUR_CLIENT_SECRET",
            });
            
            return {
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
                expiresIn: response.expiresIn,
                refreshExpiresIn: response.refreshExpiresIn,
            };
        },
    },
});
```

## Environment Configuration

### Environment Variables

For production applications, it's recommended to use environment variables:

```typescript
import { CortiEnvironment, CortiClient } from "@corti/core";

const client = new CortiClient({
    environment: (process.env.CORTI_ENVIRONMENT as CortiEnvironment) || CortiEnvironment.BetaEu,
    tenantName: process.env.CORTI_TENANT_NAME!,
    auth: {
        clientId: () => process.env.CORTI_CLIENT_ID!,
        clientSecret: () => process.env.CORTI_CLIENT_SECRET!,
    },
});
```

### Custom Base URL

If you need to use a custom API endpoint, you can override the base URL:

```typescript
import { CortiClient } from "@corti/core";

const client = new CortiClient({
    environment: "custom-environment",
    tenantName: "YOUR_TENANT_NAME",
    auth: {
        clientId: "YOUR_CLIENT_ID",
        clientSecret: "YOUR_CLIENT_SECRET",
    },
    // The SDK will use this custom base URL instead of the default one
    baseUrl: "https://api.custom-domain.com/v2",
});
```

## Error Handling

### Authentication Errors

The SDK will throw appropriate errors for authentication failures:

```typescript
import { CortiError } from "@corti/core";

try {
    const client = new CortiClient({
        environment: CortiEnvironment.BetaEu,
        tenantName: "YOUR_TENANT_NAME",
        auth: {
            clientId: "INVALID_CLIENT_ID",
            clientSecret: "INVALID_CLIENT_SECRET",
        },
    });
    
    await client.interactions.list();
} catch (error) {
    if (error instanceof CortiError) {
        console.error('Authentication failed:', error.message);
        console.error('Status code:', error.statusCode);
        console.error('Response body:', error.body);
    }
}
```

### Token Refresh Errors

When token refresh fails, the SDK will fall back to using the current access token:

```typescript
const client = new CortiClient({
    environment: CortiEnvironment.BetaEu,
    tenantName: "YOUR_TENANT_NAME",
    auth: {
        accessToken: "YOUR_ACCESS_TOKEN",
        refreshToken: "YOUR_REFRESH_TOKEN",
        expiresIn: 3600,
        refreshExpiresIn: 86400,
        refreshAccessToken: async (refreshToken: string) => {
            try {
                // Your refresh logic
                return { accessToken: "NEW_TOKEN", expiresIn: 3600 };
            } catch (error) {
                // If refresh fails, the SDK will continue using the current token
                console.error('Token refresh failed:', error);
                throw error;
            }
        },
    },
});
```

## Best Practices

### 1. Secure Credential Storage

Never hardcode credentials in your source code. Use environment variables or secure credential management systems:

```typescript
// ❌ Bad
const client = new CortiClient({
    auth: {
        clientId: "hardcoded-client-id",
        clientSecret: "hardcoded-secret",
    },
});

// ✅ Good
const client = new CortiClient({
    auth: {
        clientId: () => process.env.CORTI_CLIENT_ID!,
        clientSecret: () => process.env.CORTI_CLIENT_SECRET!,
    },
});
```

### 2. Token Management

For bearer token authentication, implement proper token storage and refresh logic:

```typescript
class TokenManager {
    private accessToken: string;
    private refreshToken: string;
    private expiresAt: Date;

    async getValidToken(): Promise<string> {
        if (this.isTokenExpired()) {
            await this.refreshToken();
        }
        return this.accessToken;
    }

    private isTokenExpired(): boolean {
        return new Date() >= this.expiresAt;
    }

    private async refreshToken(): Promise<void> {
        // Your token refresh logic
    }
}

const tokenManager = new TokenManager();

const client = new CortiClient({
    environment: CortiEnvironment.BetaEu,
    tenantName: "YOUR_TENANT_NAME",
    auth: {
        accessToken: () => tokenManager.getValidToken(),
    },
});
```

### 3. Error Handling

Implement comprehensive error handling for authentication scenarios:

```typescript
async function createCortiClient() {
    try {
        return new CortiClient({
            environment: CortiEnvironment.BetaEu,
            tenantName: process.env.CORTI_TENANT_NAME!,
            auth: {
                clientId: () => process.env.CORTI_CLIENT_ID!,
                clientSecret: () => process.env.CORTI_CLIENT_SECRET!,
            },
        });
    } catch (error) {
        console.error('Failed to create Corti client:', error);
        throw new Error('Authentication configuration is invalid');
    }
}
```

### 4. Environment Selection

Choose the appropriate environment based on your use case:

- **Development/Testing**: Use `CortiEnvironment.BetaEu`
- **Production (US)**: Use `CortiEnvironment.Us`
- **Production (Europe)**: Use `CortiEnvironment.Eu`

### 5. Tenant Configuration

Ensure your tenant name is correctly configured:

```typescript
// Validate tenant name
if (!process.env.CORTI_TENANT_NAME) {
    throw new Error('CORTI_TENANT_NAME environment variable is required');
}

const client = new CortiClient({
    environment: CortiEnvironment.BetaEu,
    tenantName: process.env.CORTI_TENANT_NAME,
    auth: {
        clientId: () => process.env.CORTI_CLIENT_ID!,
        clientSecret: () => process.env.CORTI_CLIENT_SECRET!,
    },
});
```

## Migration from Previous Versions

If you're upgrading from a previous version of the SDK, you may need to update your authentication configuration:

### Old Format (Deprecated)
```typescript
// ❌ Old format - no longer supported
const client = new CortiClient({
    environment: CortiEnvironment.BetaEu,
    clientId: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
    tenantName: "YOUR_TENANT_NAME",
});
```

### New Format
```typescript
// ✅ New format
const client = new CortiClient({
    environment: CortiEnvironment.BetaEu,
    tenantName: "YOUR_TENANT_NAME",
    auth: {
        clientId: "YOUR_CLIENT_ID",
        clientSecret: "YOUR_CLIENT_SECRET",
    },
});
```

## Troubleshooting

### Common Issues

1. **"Invalid client credentials"**: Check that your `clientId` and `clientSecret` are correct
2. **"Invalid tenant"**: Verify your `tenantName` is correct
3. **"Token expired"**: Implement token refresh or use client credentials flow
4. **"Environment not found"**: Use one of the predefined `CortiEnvironment` values

### Debug Mode

Enable debug logging to troubleshoot authentication issues:

```typescript
const client = new CortiClient({
    environment: CortiEnvironment.BetaEu,
    tenantName: "YOUR_TENANT_NAME",
    auth: {
        clientId: "YOUR_CLIENT_ID",
        clientSecret: "YOUR_CLIENT_SECRET",
    },
    headers: {
        'X-Debug': 'true', // Add debug header if supported
    },
});
```

For additional support, please refer to the [main documentation](./README.md) or contact Corti support. 