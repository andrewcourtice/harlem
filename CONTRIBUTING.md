# Contributing to Harlem

Thanks for taking the time to contribute to Harlem! :tada:

## Project Specifications
The table below has basic information about the project to get you aquainted quickly without having to wade through paragraphs of documentation.

| Description | Value |
| ----------- | ----- |
| Project Structure | Monorepo |
| Preferred IDE | VSCode |
| Node Version | 14+ |
| Package Manager | Yarn 1.22+ |
| Primary Language | TypeScript |
| Build Agent | Vite |
| Test Runner | Vitest |
| Documentation Framework | Vuepress |
| Linter | ESLint |
| Commit Convention | Angular (Standard) |

## Setting Up
1. Ensure your node version and package manager match the ones listed in the [project specifications](#project-specifications)
2. Ensure your IDE has the recommended extensions installed (ESLint, Jest etc.)
3. Clone the repo locally
4. Run `yarn install` to install the project dependencies
5. Run `yarn build` or `yarn test` from the root directory to build or test the entire project

## Project Structure
Harlem uses a monorepo structure to house the various different packages that are published and makes use of Lerna to handle root-level tasks such as builds and releases.

The key workspace folders are as follows:

- **core** - The core Harlem package `@harlem/core`
- **extensions** - The extension packages `@harlem/extension-*`. Each extension has it's own folder.
- **plugins** - The plugin packages `@harlem/plugin-*`. Each plugin has it's own folder.
- **packages** - Various other public and private packages such as `@harlem/utilities` and `@harlem/task`.

## Contribution Workflow
1. Create a branch for your contribution in the following format: `feat/my-awesome-feature` or `fix/some-critical-bug`.
2. Add your contributing code. Please respect the code conventions laid out in the ESLint config. Suggested changes to the project structure and conventions are welcome.
3. Write any accompanying tests and run a build to ensure everything is in working order.
4. Create a pull request.
5. Once the pull request is reviewed and approved it will be merged to the default branch.
