// Types
import {
	TCompanyApprovalListResponse,
	TCompanyApprovalResponse,
	TCompanyApprovalAttrs
} from '@/modules/company/types/company.type'

// Redux
import { emptySplitApi } from '@/modules/app/redux'

export const companyApi = emptySplitApi.injectEndpoints({
	endpoints: builder => ({
		company_approvalList: builder.query<TCompanyApprovalListResponse, void>({
			query: () => ({
				url: '/v1/company-register',
				method: 'GET'
			})
		}),
		company_approve: builder.mutation<
			TCompanyApprovalResponse,
			TCompanyApprovalAttrs
		>({
			query: ({ params }) => ({
				url: `/v1/company-register/approve/${params.id}`,
				method: 'PATCH'
			})
		}),
		company_decline: builder.mutation<
			TCompanyApprovalResponse,
			TCompanyApprovalAttrs
		>({
			query: ({ params }) => ({
				url: `/v1/company-register/decline/${params.id}`,
				method: 'PATCH'
			})
		})
	}),
	overrideExisting: false
})

export const {
	useLazyCompany_approvalListQuery,
	useCompany_approveMutation,
	useCompany_declineMutation
} = companyApi
