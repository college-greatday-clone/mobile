// React
import { memo, useCallback, useEffect, useState } from 'react'

// Safe Area Context
import { SafeAreaView } from 'react-native-safe-area-context'

// React Native
import { ScrollView } from 'react-native'

// Glue Stack
import { View, HStack, VStack, Text, Box } from '@gluestack-ui/themed'

// Components
import {
	BaseGreatDayBanner,
	BaseBox,
	BaseButton
} from '@/modules/app/components'

// Toast
import { popupConfirm } from '@/plugins/toast'

// Redux
import {
	useLazyCompany_approvalListQuery,
	useCompany_approveMutation,
	useCompany_declineMutation
} from '@/modules/company/redux'

// React Native Responsive Screen
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const CompanyRegistrationScreen = memo(() => {
	const [fetchCompanyList, { data: companyApprovalList }] =
		useLazyCompany_approvalListQuery()
	const [approve] = useCompany_approveMutation()
	const [decline] = useCompany_declineMutation()
	const [loading, setLoading] = useState({
		isApproval: false,
		isList: false
	})

	/**
	 * @description Handle loading
	 *
	 * @param {string} type
	 * @param {boolean} value
	 *
	 * @return {void} void
	 */
	const handleLoading = useCallback(
		(type: keyof typeof loading, value: boolean): void => {
			setLoading(prev => ({ ...prev, [type]: value }))
		},
		[]
	)

	/**
	 * @description Get company approval list
	 *
	 * @return {Promise<void>} Promise<void>
	 */
	const getCompanyApprovalList = useCallback(async (): Promise<void> => {
		handleLoading('isList', true)

		try {
			await fetchCompanyList().unwrap()
		} catch (err) {
			console.error('err', err)
		} finally {
			handleLoading('isList', false)
		}
	}, [handleLoading, fetchCompanyList])

	/**
	 * @description Fetch company list
	 *
	 * @return {void} void
	 */
	useEffect(() => {
		getCompanyApprovalList()
	}, [])

	/**
	 * @description Decline or Approve handler
	 *
	 * @param {string} type
	 * @param {string} id
	 *
	 * @return {Promise<void>} Promise<void>
	 */
	const onActionPress = useCallback(
		async (type: 'approve' | 'decline', id: string): Promise<void> => {
			try {
				const popupResponse = await popupConfirm()

				if (popupResponse) {
					handleLoading('isApproval', true)

					if (type === 'approve') await approve({ params: { id } }).unwrap()
					if (type === 'decline') await decline({ params: { id } }).unwrap()

					await getCompanyApprovalList()
				}
			} catch (err) {
				console.error('err', err)
			} finally {
				handleLoading('isApproval', false)
			}
		},
		[handleLoading, approve, decline, getCompanyApprovalList]
	)

	return (
		<SafeAreaView className='flex-1 bg-white'>
			<BaseGreatDayBanner />

			<View h={hp(75)}>
				<ScrollView contentContainerStyle={{ paddingBottom: 15 }}>
					<View paddingHorizontal={20}>
						<Text fontSize={16} fontWeight={'$bold'} marginBottom={10}>
							Companies
						</Text>
						{companyApprovalList &&
							companyApprovalList.result.map(company => (
								<View marginBottom={10} key={company.id}>
									<BaseBox>
										<VStack marginBottom={10}>
											<Text fontSize={14} color='#000' fontWeight={'$bold'}>
												{company.name}
											</Text>
											<Text fontSize={12}>
												{company.city} · {company.capacity} employee
											</Text>
											<Text fontSize={12}>
												{company.email} · {company.phoneNumber}
											</Text>
										</VStack>
										<HStack
											w='$full'
											alignItems='center'
											justifyContent='space-between'
											space='sm'
										>
											<Box w='$1/2'>
												<BaseButton
													button={{
														height: 30,
														variant: 'outline',
														borderColor: '$primary400',
														onPress: () => {
															onActionPress('approve', company.id)
														}
													}}
													buttonText={{
														color: '$primary400',
														fontSize: 12
													}}
													isLoading={loading.isApproval}
												>
													Decline
												</BaseButton>
											</Box>
											<Box w='$1/2'>
												<BaseButton
													button={{
														height: 30,
														backgroundColor: '$primary400',
														onPress: () => {
															onActionPress('decline', company.id)
														}
													}}
													buttonText={{
														color: '#fff',
														fontSize: 12
													}}
													isLoading={loading.isApproval}
												>
													Approve
												</BaseButton>
											</Box>
										</HStack>
									</BaseBox>
								</View>
							))}
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	)
})

CompanyRegistrationScreen.displayName = 'CompanyRegistrationScreen'

export { CompanyRegistrationScreen }
