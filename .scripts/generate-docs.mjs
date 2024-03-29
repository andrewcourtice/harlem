import * as TypeDoc from 'typedoc';

async function main() {
    const app = new TypeDoc.Application();

    app.options.addReader(new TypeDoc.TSConfigReader());
    app.options.addReader(new TypeDoc.TypeDocReader());

    app.bootstrap({
        entryPoints: [
            'core',
            'packages/*',
            'extensions/*',
            'plugins/*'        
        ],
        
        name: 'Harlem',
        readme: 'none',
        entryPointStrategy: 'packages',
        cleanOutputDir: true,
        hideGenerator: true,
        excludeExternals: true,
        excludePrivate: true,
        excludeInternal: true,
        excludeProtected: true,
        includeVersion: false,
        githubPages: false,
        entryDocument: 'index.md',
        plugin: [
            'typedoc-plugin-markdown'
        ]
    });

    const project = app.converter.convert(app.getEntryPoints() ?? []);

    if (project) {
        await app.generateDocs(project, 'docs/src/api');
    }
}

main().catch(console.error);