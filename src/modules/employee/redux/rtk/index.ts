// Types
import {
	TEmployeeListResponse,
	TEmployeePicListResponse,
	TEmployeeStoreAttrs,
	TEmployeeAssignPicAttrs,
	TEmployeePositionListResponse
} from '@/modules/employee/types/employee.type'

// Redux
import { emptySplitApi } from '@/modules/app/redux'

export const employeeApi = emptySplitApi.injectEndpoints({
	endpoints: builder => ({
		employee_list: builder.query<TEmployeeListResponse, void>({
			query: () => ({
				url: '/v1/employees'
			})
		}),
		employee_store: builder.mutation<void, TEmployeeStoreAttrs>({
			query: ({ body }) => ({
				url: '/v1/employees',
				method: 'POST',
				body
			})
		}),
		employee_assignPic: builder.mutation<void, TEmployeeAssignPicAttrs>({
			query: ({ params, body }) => ({
				url: `/v1/employees/company-user/company-user/${params.id}`,
				method: 'POST',
				body
			})
		}),
		employee_picList: builder.query<TEmployeePicListResponse, void>({
			query: () => ({
				url: `/v1/employees/company-user/pic`
			})
		}),
		employee_positionList: builder.query<TEmployeePositionListResponse, void>({
			query: () => ({
				url: `/v1/positions`
			})
		})
	}),
	overrideExisting: false
})

export const {
	useLazyEmployee_listQuery,
	useLazyEmployee_picListQuery,
	useLazyEmployee_positionListQuery,
	useEmployee_storeMutation,
	useEmployee_assignPicMutation
} = employeeApi
