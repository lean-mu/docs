import type {NavbarConfig} from '@vuepress/theme-default'

export const navbar:NavbarConfig = [
    {
        text: 'Get Started',
        children: [
            {
                text: 'Get Started',
                children: [
                    '/getstarted/README.md',
                    '/getstarted/cli.md',
                    '/getstarted/helm.md',
                    '/getstarted/uninstall.md',
                ],

            },
            {
                text: 'Your First Function',
                children: [
                    '/getstarted/deploy.md',
                ],
            }
        ],
    },
    {
        text: 'Explore',
        children: [
            {
                text: 'Explore',
                children: [
                    '/explore/README.md',
                    '/explore/mu.md',
                ],
            },
            {
                text: 'Learning Mu',
                children: [
                    '/explore/concepts.md',
                    '/explore/context.md',
                    '/explore/createApp.md',
                    '/explore/createFn.md',
                    '/explore/view.md',
                    '/explore/invoke.md',
                    '/explore/runtimeContext.md',
                    '/explore/updateFn.md',
                    '/explore/deleteFn.md',
                ],
            },
        ],
    },
    {
        text: 'Deep Dive',
        children: [
            {
                text: 'DeepDive',
                children: [
                    '/deepdive/README.md',
                    '/deepdive/resource_limits.md',
                    '/deepdive/accessFS.md',
                    '/deepdive/create-template-image.md',
                    '/deepdive/customDocker.md',
                    '/deepdive/private_registry.md',
                    '/deepdive/logging.md',
                    '/deepdive/dtracing.md',
                    '/deepdive/extensions.md',
                    '/deepdive/annotations.md',
                    '/deepdive/debugging.md',
                ],
            },
            {
                text: 'References',
                children: [
                    '/deepdive/references/',
                    '/deepdive/references/funcfile.md',
                    '/deepdive/references/fdks/',
                ],
            },
        ],
    },
    {
        text: 'Mu Home',
        link: 'https://www.snapcore.com/mu',
    },
]
