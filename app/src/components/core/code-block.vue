<template>
    <div class="code-block">
        <pre v-if="source"><code v-html="source.value"></code></pre>
    </div>
</template>

<script lang="ts">
import highlightjs from 'highlight.js';
import bashLang from 'highlight.js/lib/languages/bash.js';
import typescriptLang from 'highlight.js/lib/languages/typescript.js';
import jsonLang from 'highlight.js/lib/languages/json.js';

import {
    defineComponent,
    computed,
    onMounted,
    ref,
    PropType
} from 'vue';

type CodeBlockLanguage = 'bash' | 'typescript' | 'json';

highlightjs.registerLanguage('bash', bashLang);
highlightjs.registerLanguage('typescript', typescriptLang);

export default defineComponent({

    props: {

        value: {
            type: [String, Object],
            default: ''
        },

        language: {
            type: String as PropType<CodeBlockLanguage>,
            default: 'typescript'
        }

    },

    setup(props) {
        const source = computed(() => {
            let code = props.value;

            if (typeof code !== 'string') {
                code = JSON.stringify(code, null, 4);
            }

            return highlightjs.highlight(props.language, code as string);
        });

        return {
            source
        };
    }

});
</script>

<style lang="scss">

    .code-block {
        display: block;
        overflow-x: auto;
        padding: var(--spacing__medium);
        color: #abb2bf;
        background: #282c34;
        border-radius: var(--border__radius);
    }

    .hljs-comment,
    .hljs-quote {
        color: #5c6370;
        font-style: italic;
    }

    .hljs-doctag,
    .hljs-keyword,
    .hljs-formula {
        color: #c678dd;
    }

    .hljs-section,
    .hljs-name,
    .hljs-selector-tag,
    .hljs-deletion,
    .hljs-subst {
        color: #e06c75;
    }

    .hljs-literal {
        color: #56b6c2;
    }

    .hljs-string,
    .hljs-regexp,
    .hljs-addition,
    .hljs-attribute,
    .hljs-meta-string {
        color: var(--colour__primary);
    }

    .hljs-built_in,
    .hljs-class .hljs-title {
        color: #e6c07b;
    }

    .hljs-attr,
    .hljs-variable,
    .hljs-template-variable,
    .hljs-type,
    .hljs-selector-class,
    .hljs-selector-attr,
    .hljs-selector-pseudo,
    .hljs-number {
        color: #d19a66;
    }

    .hljs-symbol,
    .hljs-bullet,
    .hljs-link,
    .hljs-meta,
    .hljs-selector-id,
    .hljs-title {
        color: #61aeee;
    }

    .hljs-emphasis {
        font-style: italic;
    }

    .hljs-strong {
        font-weight: bold;
    }

    .hljs-link {
        text-decoration: underline;
    }

</style>