export interface RequestState<T, K = any> {
  meta: K
  isDefault: boolean
  isFailure: boolean
  isLoading: boolean
  isSuccess: boolean
  data?: T
  error?: Error
  fetchedAt: number
}

export const reqStateDefault = <T, K = any>(meta?: K): RequestState<T> => {
  return {
    meta,
    isLoading: false,
    isSuccess: false,
    isDefault: true,
    isFailure: false,
    fetchedAt: new Date().getTime()
  } as RequestState<T>
}

export const reqStateLoading = <T, K = any>(meta?: K): RequestState<T> => {
  return {
    meta,
    isLoading: true,
    isSuccess: false,
    isDefault: false,
    isFailure: false,
    fetchedAt: new Date().getTime()
  } as RequestState<T>
}

export const reqStateSuccess = <T, K = any>(data?: T, meta?: K): RequestState<T> => {
  return {
    meta,
    isLoading: false,
    isSuccess: true,
    isDefault: false,
    isFailure: false,
    fetchedAt: new Date().getTime(),
    data
  } as RequestState<T>
}

export const reqStateFailure = <T, K = any>(reason: Error, meta?: K): RequestState<T> => {
  return {
    meta,
    isLoading: false,
    isSuccess: false,
    isDefault: false,
    isFailure: true,
    reason: serializeError(reason),
    fetchedAt: new Date().getTime()
  } as RequestState<T>
}

export const reqStateChanged = <T>(state: RequestState<T>, newState: RequestState<T>) => {
  return {
    data: newState.data ? newState.data : state.data,
    meta: newState.meta,
    error: newState.error,
    fetchedAt: newState.fetchedAt,
    isDefault: newState.isDefault,
    isFailure: newState.isFailure,
    isLoading: newState.isLoading,
    isSuccess: newState.isSuccess
  }
}

export const serializeError = (error: Error): object => {
  const plainObject = {} as any

  Object.getOwnPropertyNames(error).forEach((key: string) => {
    plainObject[key] = error[key as keyof Error]
  })

  return plainObject
}
