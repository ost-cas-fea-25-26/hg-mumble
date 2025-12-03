import * as path from 'node:path'
import { generateApi } from 'swagger-typescript-api'

await generateApi({
  input: path.resolve('scripts/generate/swagger_mumble_api.json'),
  output: path.resolve('src/mumble/api/generated'),
  fileName: 'MumbleApi.ts',
})
