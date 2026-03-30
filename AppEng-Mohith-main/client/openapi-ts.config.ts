import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'https://ecom-api-956506160468.us-central1.run.app/openapi.json',
  output: 'src/api-sdk',
});
