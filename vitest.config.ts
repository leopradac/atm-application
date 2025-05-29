import * as path from 'path';

import { defineVitestConfig } from '@nuxt/test-utils/config'
const r = (p: string) => path.resolve(__dirname, p);

export default defineVitestConfig({
    test: {
        globals: true,
        environment: 'happy-dom',
    },
    resolve: {
        alias: {
            '~': r('.'),
            '#imports': r('.nuxt/imports.d.ts'),
        },
    },
})
