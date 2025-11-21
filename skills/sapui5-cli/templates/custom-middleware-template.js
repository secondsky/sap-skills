/**
 * Custom UI5 Server Middleware Template
 *
 * Purpose: [Describe what this middleware does]
 * Use Case: [Describe when to use this middleware]
 *
 * Configuration in ui5.yaml:
 * ---
 * specVersion: "4.0"
 * kind: extension
 * type: server-middleware
 * metadata:
 *   name: my-custom-middleware
 * middleware:
 *   path: lib/middleware/myCustomMiddleware.js
 * ---
 *
 * Usage in project ui5.yaml:
 * server:
 *   customMiddleware:
 *     - name: my-custom-middleware
 *       mountPath: /api                        # Optional: only handle /api/* requests
 *       afterMiddleware: compression           # or beforeMiddleware
 *       configuration:
 *         # Your custom configuration
 *         enabled: true
 *         target: https://api.example.com
 *
 * Specification Version: 4.0+
 * Required Dependencies: [list npm packages]
 */

/**
 * Main middleware factory function
 *
 * @param {object} params
 * @param {module:@ui5/logger.Logger} params.log - Logger instance (Spec v3.0+)
 * @param {module:@ui5/server.middleware.MiddlewareUtil} params.middlewareUtil - Utility functions (Spec v2.0+)
 * @param {object} params.options - Middleware options
 * @param {object} params.options.configuration - Custom configuration from ui5.yaml
 * @param {string} params.options.middlewareName - Middleware name (Spec v3.0+)
 * @param {object} params.resources - Resource access
 * @param {module:@ui5/fs.ReaderCollection} params.resources.all - Root project + dependencies
 * @param {module:@ui5/fs.ReaderCollection} params.resources.rootProject - Root project only
 * @param {module:@ui5/fs.ReaderCollection} params.resources.dependencies - Dependencies only
 * @returns {Function} Express middleware function
 */
export default function({log, middlewareUtil, options, resources}) {
    const {configuration = {}} = options;

    // Validate configuration
    if (!configuration.enabled) {
        log.info("Middleware disabled by configuration");
        return (req, res, next) => next();
    }

    log.info("Initializing custom middleware...");

    /**
     * Express middleware function
     *
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     * @param {Function} next - Next middleware function
     * @returns {Promise<void>}
     */
    return async function(req, res, next) {
        try {
            // Example 1: Simple request/response modification
            if (req.path === "/custom-endpoint") {
                res.json({
                    message: "Custom endpoint response",
                    timestamp: new Date().toISOString(),
                    configuration: configuration
                });
                return;
            }

            // Example 2: Add custom headers
            if (configuration.addHeaders) {
                res.setHeader("X-Custom-Header", "Custom Value");
            }

            // Example 3: Serve dynamic content from project resources
            if (req.path?.endsWith(".custom")) {
                const resourcePath = req.path.replace(".custom", ".json");
                const resource = await resources.rootProject.byPath(resourcePath);

                if (resource) {
                    const content = await resource.getString();
                    log.info(`Serving custom resource: ${resourcePath}`);

                    res.type("application/json");
                    res.end(content);
                    return;
                }
            }

            // Example 4: Request logging
            if (configuration.logRequests) {
                log.info(`${req.method} ${req.path}`);
            }

            // Always call next() if not sending response
            next();

        } catch (error) {
            log.error(`Middleware error: ${error.message}`);
            next(error);
        }
    };
}

/**
 * Common patterns and examples:
 */

// Pattern 1: API Proxy
import {createProxyMiddleware} from "http-proxy-middleware";

export function createProxyExample({log, options}) {
    const {configuration} = options;

    if (!configuration.target) {
        throw new Error("Configuration 'target' is required for proxy");
    }

    return createProxyMiddleware({
        target: configuration.target,
        changeOrigin: true,
        pathRewrite: configuration.pathRewrite || {},
        onProxyReq: (proxyReq, req) => {
            log.info(`Proxying ${req.path} to ${configuration.target}`);
        },
        onError: (err, req, res) => {
            log.error(`Proxy error: ${err.message}`);
            res.status(500).json({error: "Proxy error"});
        }
    });
}

// Pattern 2: Authentication/Authorization
export function createAuthExample({log, options}) {
    const {configuration} = options;

    return async function(req, res, next) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({error: "Unauthorized"});
            return;
        }

        try {
            // Validate token/credentials
            const isValid = await validateCredentials(authHeader, configuration);

            if (!isValid) {
                res.status(403).json({error: "Forbidden"});
                return;
            }

            next();
        } catch (error) {
            log.error(`Auth error: ${error.message}`);
            res.status(500).json({error: "Authentication failed"});
        }
    };
}

// Pattern 3: Mock Data Server
export function createMockExample({log, resources}) {
    return async function(req, res, next) {
        // Only handle /mock/* requests
        if (!req.path?.startsWith("/mock/")) {
            next();
            return;
        }

        try {
            // Load mock data from project
            const mockPath = `/resources/localService/mockdata${req.path.replace("/mock", "")}.json`;
            const resource = await resources.rootProject.byPath(mockPath);

            if (resource) {
                const mockData = await resource.getString();
                res.type("application/json");
                res.end(mockData);
                log.info(`Served mock data: ${mockPath}`);
                return;
            }

            res.status(404).json({error: "Mock data not found"});
        } catch (error) {
            log.error(`Mock data error: ${error.message}`);
            next(error);
        }
    };
}

// Pattern 4: File Upload Handler
import multer from "multer";

export function createUploadExample({log, options}) {
    const upload = multer({dest: "uploads/"});

    return upload.single("file"), async function(req, res, next) {
        if (!req.file) {
            next();
            return;
        }

        log.info(`File uploaded: ${req.file.originalname}`);

        // Process uploaded file
        res.json({
            message: "File uploaded successfully",
            filename: req.file.originalname,
            size: req.file.size
        });
    };
}

// Pattern 5: Content Transformation (Markdown to HTML)
import MarkdownIt from "markdown-it";

export function createMarkdownExample({log, resources}) {
    const md = new MarkdownIt();

    return async function(req, res, next) {
        if (!req.path?.endsWith(".html")) {
            next();
            return;
        }

        try {
            const mdPath = req.path.replace(".html", ".md");
            const resource = await resources.rootProject.byPath(mdPath);

            if (!resource) {
                next();
                return;
            }

            const markdown = await resource.getString();
            const html = md.render(markdown);

            log.info(`Rendering markdown: ${mdPath}`);

            res.type("text/html");
            res.end(html);
        } catch (error) {
            log.error(`Markdown error: ${error.message}`);
            next(error);
        }
    };
}

// Pattern 6: Request Validation
export function createValidationExample({log, options}) {
    const {configuration} = options;

    return function(req, res, next) {
        // Validate request parameters
        if (req.method === "POST" && !req.body) {
            res.status(400).json({error: "Request body required"});
            return;
        }

        // Validate content type
        if (configuration.requireContentType) {
            const contentType = req.headers["content-type"];
            if (!contentType?.includes("application/json")) {
                res.status(415).json({error: "Content-Type must be application/json"});
                return;
            }
        }

        next();
    };
}

// Pattern 7: Response Caching
const cache = new Map();

export function createCacheExample({log}) {
    return async function(req, res, next) {
        if (req.method !== "GET") {
            next();
            return;
        }

        const cacheKey = req.path;
        if (cache.has(cacheKey)) {
            log.info(`Cache hit: ${cacheKey}`);
            res.end(cache.get(cacheKey));
            return;
        }

        // Intercept response
        const originalEnd = res.end;
        res.end = function(data, ...args) {
            cache.set(cacheKey, data);
            log.info(`Cache miss: ${cacheKey}`);
            originalEnd.call(this, data, ...args);
        };

        next();
    };
}

/**
 * Helper functions:
 */

async function validateCredentials(authHeader, configuration) {
    // Example: Bearer token validation
    const token = authHeader.replace("Bearer ", "");
    return token === configuration.validToken;
}

/**
 * Testing the middleware:
 *
 * 1. Create ui5.yaml extension (see configuration above)
 * 2. Configure in server.customMiddleware
 * 3. Run: ui5 serve --verbose
 * 4. Test endpoints with curl or browser
 *
 * Examples:
 * curl http://localhost:8080/custom-endpoint
 * curl http://localhost:8080/api/data
 * curl -H "Authorization: Bearer token" http://localhost:8080/protected
 *
 * Debugging:
 * - Use --verbose flag for detailed logging
 * - Use log.info(), log.warn(), log.error() for messages
 * - Check middleware execution order
 * - Test with different HTTP methods
 * - Verify mountPath works correctly
 */

/**
 * Common issues:
 *
 * 1. Middleware not executing:
 *    - Verify extension is defined
 *    - Check beforeMiddleware/afterMiddleware reference
 *    - Verify mountPath (if specified)
 *    - Use --verbose to see middleware loading
 *
 * 2. Resources not found:
 *    - Check resource path starts with /
 *    - Verify resource exists in project
 *    - Try resources.all instead of resources.rootProject
 *
 * 3. Hanging requests:
 *    - Always call next() if not sending response
 *    - Check for missing return statements
 *    - Verify async/await usage
 *
 * 4. karma-ui5 compatibility:
 *    - Use Connect API only (not Express-specific features)
 *    - Avoid req.baseUrl, req.hostname, req.ip
 *    - Test with both ui5 serve and karma
 */

/**
 * Security best practices:
 *
 * 1. Validate all user input
 * 2. Use HTTPS for proxy targets
 * 3. Don't log sensitive data
 * 4. Implement rate limiting for APIs
 * 5. Use environment variables for secrets (not configuration)
 * 6. Sanitize file paths
 * 7. Implement proper error handling
 * 8. Set appropriate CORS headers
 */
