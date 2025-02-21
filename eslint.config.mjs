// @ts-check
import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import eslintConfigPrettier from "eslint-config-prettier"
import unicorn from "eslint-plugin-unicorn"

export default tseslint.config({
    languageOptions: {
        parserOptions: {
            project: true,
            tsconfigRootDir: import.meta.dirname
        }
    },
    files: ["**/*.ts"],
    extends: [
        eslint.configs.recommended,
        ...tseslint.configs.recommendedTypeChecked,
        eslintConfigPrettier,
        unicorn.configs.recommended // ✅ Already includes the plugin, no need to redefine it
    ],
    rules: {
        "no-console": "error",
        quotes: ["error", "double", { allowTemplateLiterals: true }],
        "unicorn/filename-case": ["error", { case: "camelCase" }],
        "unicorn/no-process-exit": "off",
        "unicorn/prefer-module": "off"
    },
    settings: {
        "import/resolver": {
            typescript: {
                project: "./tsconfig.json"
            }
        }
    }
})

