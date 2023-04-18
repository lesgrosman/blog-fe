import { AxiosError } from 'axios'

export type AxiosMutationError = AxiosError<Record<string, string>>
