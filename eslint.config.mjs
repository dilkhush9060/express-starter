// @ts-check
import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import eslintConfigPrettier from "eslint-config-prettier"

export default tseslint.config({
    languageOptions: {
        parserOptions: {
            project: true,
            tsconfigRootDir: import.meta.dirname
        }
    },
    files: ["**/*.ts"],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommendedTypeChecked, eslintConfigPrettier],
    rules: {
        "no-console": "error",
        quotes: ["error", "double", { allowTemplateLiterals: true }],
        "unicorn/filename-case": ["error", { case: ["camelCase", "pascalCase"] }]
    },
    plugins: {
        "@typescript-eslint": tseslint.plugin,
        "@typescript-parser": tseslint.parser
    },
    settings: {
        "import/resolver": {
            typescript: {
                project: "./tsconfig.json"
            }
        }
    }
})

