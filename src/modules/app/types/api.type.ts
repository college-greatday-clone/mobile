// Interfaces
import { IAppCommonPagination } from '@/modules/app/types/common.type'

export interface IAppResponse<T = unknown> {
	message: string
	status: number
	result: T
}

export interface IAppResponsePagination<T extends unknown[]> {
	message: string
	status: number
	result: IAppCommonPagination<T>
}

export interface IAppResponseError {
	errors: {
		message: string
		field?: string
	}[]
}
