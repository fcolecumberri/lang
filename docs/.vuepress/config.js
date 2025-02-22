const fs = require('fs');
const path = require('path');

module.exports = {
    lang: 'en-US',
    title: 'Laravel Lang',
    description: 'List of 78 languages for Laravel Framework 4-9, Jetstream, Fortify, Breeze, Cashier, Nova, Spark and UI.',

    head: [
        ['link', { rel: 'icon', href: '/images/logo.svg' }],
        ['meta', { name: 'twitter:image', content: 'https://laravel-lang.com/images/social-logo.png' }]
    ],

    theme: '@vuepress/theme-default',
    themeConfig: {
        base: '/',

        logo: '/images/logo.svg',

        repo: 'https://github.com/Laravel-Lang/lang',
        repoLabel: 'GitHub',
        docsRepo: 'https://github.com/Laravel-Lang/lang',
        docsBranch: 'master',
        docsDir: 'docs',

        editLink: true,

        navbar: [
            { text: 'Translations Status', link: '/status.md' },
            { text: '10.x', link: '/changelog/10.x.md' }
        ],

        sidebarDepth: 1,

        sidebar: [
            {
                text: 'Getting Started',
                collapsible: true,
                children: [
                    {
                        text: 'Introduction',
                        link: '/'
                    },

                    {
                        text: 'Installation',
                        link: '/installation/',
                        collapsible: true,
                        children: [
                            '/installation/compatibility.md',
                            '/installation/managers.md',
                            '/installation/github.md'
                        ]
                    },

                    { text: 'Basic Usage', link: '/usage.md' },

                    {
                        text: 'Translations Status',
                        link: '/status.md',
                        collapsible: true,
                        children: getChildren('statuses')
                    },

                    {
                        text: 'Changelog',
                        link: '/changelog/index.md',
                        collapsible: true,
                        children: getChildren('changelog', 'desc')
                    }
                ]
            }, {
                text: 'References',
                collapsible: true,
                children: [
                    { text: 'Referents', link: '/referents.md' },
                    { text: 'Code of Conduct', link: '/code-of-conduct.md' },
                    { text: 'Contributing', link: '/contributing.md' }
                ]
            }
        ]
    },

    plugins: [
        [
            'seo',
            {
                description: $page => $page.frontmatter.description,
                type: _ => 'website',
                image: (_, $site) => $site.domain + '/images/social-logo.png'
            }
        ]
    ]
};

function getChildren(folder, sort = 'asc') {
    const extension = ['.md'];
    const names = ['index.md', 'readme.md'];

    const dir = `${ __dirname }/../${ folder }`;

    return fs
        .readdirSync(path.join(dir))
        .filter(item =>
            fs.statSync(path.join(dir, item)).isFile() &&
            ! names.includes(item.toLowerCase()) &&
            extension.includes(path.extname(item))
        )
        .sort((a, b) => {
            a = resolveNumeric(a);
            b = resolveNumeric(b);

            if (a < b) return sort === 'asc' ? -1 : 1;
            if (a > b) return sort === 'asc' ? 1 : -1;

            return 0;
        }).map(item => `/${ folder }/${ item }`);
}

function resolveNumeric(value) {
    const sub = value.substr(0, value.indexOf('.'));

    const num = Number(sub);

    return isNaN(num) ? value : num;
}

