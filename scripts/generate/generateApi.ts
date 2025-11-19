import * as path from 'node:path'
import { generateApi } from 'swagger-typescript-api'

await generateApi({
  input: path.resolve('scripts/generate/swagger.json'),
  output: path.resolve('src/mumble/api/generated'),
  fileName: 'Api.ts',
})
