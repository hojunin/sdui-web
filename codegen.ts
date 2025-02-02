import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3001/graphql",
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "src/lib/graphql/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: true,
      },
    },
  },
};

export default config;
