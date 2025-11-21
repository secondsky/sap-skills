/**
 * Custom UI5 Build Task Template
 *
 * Purpose: [Describe what this task does]
 * Use Case: [Describe when to use this task]
 *
 * Configuration in ui5.yaml:
 * ---
 * specVersion: "4.0"
 * kind: extension
 * type: task
 * metadata:
 *   name: my-custom-task
 * task:
 *   path: lib/tasks/myCustomTask.js
 * ---
 *
 * Usage in project ui5.yaml:
 * builder:
 *   customTasks:
 *     - name: my-custom-task
 *       beforeTask: generateComponentPreload  # or afterTask
 *       configuration:
 *         # Your custom configuration
 *         enabled: true
 *         quality: 80
 *
 * Specification Version: 4.0+
 * Required Dependencies: [list npm packages]
 */

/**
 * Optional: Declare required dependencies (Spec v3.0+)
 * Only needed if task accesses dependency resources
 *
 * @param {object} params
 * @param {Set<string>} params.availableDependencies - Set of available dependency names
 * @param {Function} params.getDependencies - Get all project dependencies
 * @param {Function} params.getProject - Get project by name
 * @param {object} params.options - Task options
 * @returns {Promise<Set<string>>} Set of required dependency names
 */
export async function determineRequiredDependencies({
    availableDependencies,
    getDependencies,
    getProject,
    options
}) {
    const dependencies = new Set();

    // Example: Check if specific dependency exists and is needed
    if (availableDependencies.has("my.required.library")) {
        dependencies.add("my.required.library");
    }

    // Example: Include dependencies by pattern
    const allDeps = await getDependencies();
    for (const project of allDeps) {
        if (project.getName().startsWith("my.company.")) {
            dependencies.add(project.getName());
        }
    }

    return dependencies;
}

/**
 * Main task function
 *
 * @param {object} params
 * @param {module:@ui5/fs.DuplexCollection} params.workspace - Reader/Writer for project resources
 * @param {module:@ui5/fs.ReaderCollection} params.dependencies - Reader for dependency resources (if declared)
 * @param {module:@ui5/logger.Logger} params.log - Logger instance (Spec v3.0+)
 * @param {object} params.options - Task options
 * @param {object} params.options.configuration - Custom configuration from ui5.yaml
 * @param {string} params.options.projectName - Project name
 * @param {string} params.options.projectNamespace - Project namespace
 * @param {string} params.options.taskName - Task name
 * @param {module:@ui5/builder.tasks.TaskUtil} params.taskUtil - Task utilities (Spec v2.2+)
 * @returns {Promise<undefined>}
 */
export default async function({workspace, dependencies, log, options, taskUtil}) {
    const {configuration = {}} = options;

    log.info("Starting custom task...");

    // Validate configuration
    if (configuration.enabled === false) {
        log.info("Task disabled by configuration");
        return;
    }

    try {
        // Example 1: Read and process project resources
        const resources = await workspace.byGlob("**/*.js");

        log.info(`Processing ${resources.length} JavaScript files`);

        for (const resource of resources) {
            const content = await resource.getString();

            // Process content (example: add header comment)
            const processedContent = `/* Processed by custom task */\n${content}`;

            // Write back to workspace
            resource.setString(processedContent);
            await workspace.write(resource);
        }

        // Example 2: Create new resource using taskUtil (Spec v2.2+)
        if (taskUtil) {
            const {resourceFactory} = taskUtil;

            const newResource = resourceFactory.createResource({
                path: "/resources/generated/metadata.json",
                string: JSON.stringify({
                    timestamp: new Date().toISOString(),
                    version: configuration.version || "1.0.0",
                    taskName: options.taskName
                }, null, 2)
            });

            await workspace.write(newResource);
            log.info("Created metadata.json");
        }

        // Example 3: Access dependency resources (if declared)
        if (dependencies) {
            const depResources = await dependencies.byGlob("**/library.js");
            log.info(`Found ${depResources.length} library.js files in dependencies`);

            for (const resource of depResources) {
                const content = await resource.getString();
                // Process dependency resource
            }
        }

        // Example 4: Use project information (taskUtil, Spec v2.2+)
        if (taskUtil) {
            const project = await taskUtil.getProject(options.projectName);
            log.info(`Project type: ${project.getType()}`);
            log.info(`Project namespace: ${project.getNamespace()}`);
        }

        log.info("Custom task completed successfully");

    } catch (error) {
        log.error(`Task failed: ${error.message}`);
        throw error;
    }
}

/**
 * Common patterns and utilities:
 */

// Pattern 1: Filter resources by pattern
async function processSpecificFiles(workspace, pattern, processFunc) {
    const resources = await workspace.byGlob(pattern);
    return Promise.all(resources.map(processFunc));
}

// Pattern 2: Read, transform, write
async function transformResource(resource, transformer) {
    const content = await resource.getString();
    const transformed = transformer(content);
    resource.setString(transformed);
    return resource;
}

// Pattern 3: Create resource from scratch
function createResource(taskUtil, path, content) {
    return taskUtil.resourceFactory.createResource({
        path,
        string: typeof content === 'string' ? content : JSON.stringify(content, null, 2)
    });
}

// Pattern 4: Graceful error handling
async function safeProcess(log, operation, fallback) {
    try {
        return await operation();
    } catch (error) {
        log.warn(`Operation failed: ${error.message}`);
        return fallback;
    }
}

/**
 * Testing the task:
 *
 * 1. Create ui5.yaml extension (see configuration above)
 * 2. Configure in builder.customTasks
 * 3. Run: ui5 build --verbose
 * 4. Check output in dist/ directory
 *
 * Debugging:
 * - Use --verbose flag for detailed logging
 * - Use log.info(), log.warn(), log.error() for messages
 * - Check task execution order with --verbose
 * - Verify resources with workspace.byPath() during development
 */

/**
 * Common issues:
 *
 * 1. Task not executing:
 *    - Verify extension is defined
 *    - Check beforeTask/afterTask reference valid task
 *    - Use --verbose to see task execution
 *
 * 2. Resources not found:
 *    - Check glob pattern syntax
 *    - Verify resource paths start with /
 *    - Use workspace.byPath() to debug specific paths
 *
 * 3. Dependencies not available:
 *    - Implement determineRequiredDependencies
 *    - Check dependency names match exactly
 *    - Verify dependencies in project tree (ui5 tree)
 *
 * 4. Performance issues:
 *    - Use graceful-fs for file operations
 *    - Process resources in parallel when possible
 *    - Only declare truly needed dependencies
 */
