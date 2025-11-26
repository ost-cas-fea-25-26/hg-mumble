import type { operations } from './Api'

type OperationMap = {
  Post: operations['PostsController_single']['responses']['200']['content']['application/json']
  Posts: operations['PostsController_list']['responses']['200']['content']['application/json']
} & {
  [K in keyof operations]: operations[K]['responses']
}
export type Schema<T extends keyof OperationMap> = OperationMap[T]
