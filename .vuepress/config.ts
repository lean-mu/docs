import {defineUserConfig} from '@vuepress/cli'
import type {DefaultThemeOptions} from '@vuepress/theme-default'
import {path} from '@vuepress/utils'
import {navbar, sidebar} from './configs'

const isProd = process.env.NODE_ENV === 'production'

export default defineUserConfig<DefaultThemeOptions>({
    base: '/mu/documentation/',
    port: 8080,
    host: "127.0.0.1",
    head: [["link", {rel: "icon", href: "/favicon.ico"}]],
    bundler: '@vuepress/webpack',
    locales: {
        '/': {
            lang: 'en-US',
            title: 'Mu Documentation',
            description: 'Serverless functions in a box',
        },
    },
    markdown: {
        importCode: {
            handleImportPath: (str) =>
                str.replace(
                    /^@vuepress/,
                    path.resolve(__dirname, '../../packages/@vuepress')
                ),
        },
    },
    plugins: [
        ['fulltext-search'],
        ['@vuepress/back-to-top'],
        ['@vuepress/medium-zoom'],
        ['@vuepress/plugin-google-analytics', {id: "UA-124241826-1",}],
        ['@vuepress/plugin-pwa'],
        ['@vuepress/plugin-register-components',
            {
                componentsDir: path.resolve(__dirname, './components'),
            }],
        // only enable shiki plugin in production mode
        [
            '@vuepress/plugin-shiki',
            {
                theme: 'dark-plus',
            }
        ],
    ],

    themeConfig: {
        // extends: '@vuepress/theme-default',
        // layouts: path.resolve(__dirname, 'theme/layouts'),
        // fulltext-search plugin
        searchMaxSuggestions: 10,
        logo: "/images/logo.svg",
        repo: 'lean-mu/mu-helm',
        docsDir: "docs",

        // theme-level locales config
        locales: {
            /**
             * English locale config
             *
             * As the default locale of @vuepress/theme-default is English,
             * we don't need to set all of the locale fields
             */
            '/': {
                // navbar
                navbar: navbar,

                // sidebar
                sidebar: sidebar,

                // page meta
                editLinkText: 'Edit this page on GitHub',
            },
        }
    }
})
