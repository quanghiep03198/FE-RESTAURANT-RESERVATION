import formatIntlNumber from '@/common/utils/format-intl-number'

import { isNil } from 'lodash-es'
import type { IconProps } from '../ui/icon'

/**
 * Gets detailed change description with quantity for i18n
 * @param percent - The percentage change
 * @param difference - The absolute difference in units
 * @returns i18n key and params for detailed change description
 */
export function getDetailedChangeDescription(percent: number | null, difference: number | null, unit): string {
	if (!difference || difference === 0) {
		return 'Duy trì hiệu suất ổn định'
	}

	const absPercent = Math.abs(percent || 0)
	const absDifference = formatIntlNumber(Math.abs(difference))
	const isIncrease = (percent || 0) > 0

	if (absPercent >= 20)
		return isIncrease
			? `Tăng mạnh (${absDifference} ${unit}) so với kỳ trước`
			: `Giảm mạnh (${absDifference} ${unit}) so với kỳ trước`

	return isIncrease
		? `Tăng nhẹ (${absDifference} ${unit}) so với kỳ trước`
		: `Giảm nhẹ (${absDifference} ${unit}) so với kỳ trước`
}

export function getTrendingPercentageChange(percent): string {
	if (!percent || percent === 0) {
		return 'Xu hướng ổn định'
	}
	const absPercent = Math.abs(percent || 0)

	const isIncrease = percent > 0

	if (absPercent >= 20) {
		return isIncrease
			? `Xu hướng tăng mạnh (+${absPercent}%) tháng này`
			: `Xu hướng giảm mạnh (-${percent}%) tháng này`
	}

	return isIncrease ? `Xu hướng tăng nhẹ (+${percent}%) tháng này` : `Xu hướng giảm nhẹ (-${absPercent}%) tháng này`
	// { percent: absPercent }
}

/**
 * Gets the appropriate trend description based on percentage change
 * @param percent - The percentage change
 * @returns i18n key for trend description
 */
export function getTrendDescription(percent: number | null): string {
	if (percent === null || percent === undefined || Math.abs(percent) < 1) {
		return 'Ổn định so với tháng trước'
	}
	return percent > 0 ? 'Cao hơn tháng trước' : 'Thấp hơn tháng trước'
}

/**
 * Gets the appropriate trending icon based on percentage change
 * @param percentageChange - The percentage change value
 * @returns Icon name for trending direction
 */
export function getTrendingIcon(percentageChange: number | null): IconProps['name'] {
	return isNil(percentageChange) || percentageChange < 0 ? 'TrendingDown' : 'TrendingUp'
}

/**
 * Formats percentage change with proper sign and decimal places
 * @param percentage - The percentage value to format
 * @returns Formatted percentage string with + or - sign
 */
export function formatPercentageChange(percentage: number | null): string {
	if (isNil(percentage) || percentage === 0) return '0%'

	const formattedPercent = Math.abs(percentage).toFixed(1)
	return percentage > 0 ? `+${formattedPercent}%` : `-${formattedPercent}%`
}

/**
 * Gets the appropriate icon color based on percentage change
 * @param percentage - The percentage change value
 * @returns CSS color value using design system variables
 */
export function getIconColor(percentage: number | null): string {
	if (isNil(percentage) || percentage === 0) return 'var(--muted-foreground)'
	return percentage > 0 ? 'var(--success)' : 'var(--destructive)'
}

/**
 * Gets analysis sentence i18n key
 * @param percentageChange - The percentage change value
 * @returns i18n key for analysis sentence
 */
export function getAnalysisSentence(percentageChange: number | null): string {
	return getTrendDescription(percentageChange)
}

/**
 * Gets detailed description i18n data
 * @param percent - The percentage change value
 * @param difference - The absolute difference in units
 * @returns Object with i18n key and params
 */
export function getDetailDescription(percent: number | null, difference: number | null, unit: string): string {
	return getDetailedChangeDescription(percent, difference, unit)
}

export function getServiceTimeQuality(minutes: number): { badge: string; headline: string; description: string } {
	if (minutes < 20)
		return {
			badge: 'Tối ưu',
			headline: 'Tốc độ phục vụ tối ưu',
			description: 'Tốc độ phục vụ nhanh, có thể duy trì để tối ưu trải nghiệm khách hàng'
		}
	if (minutes <= 40)
		return {
			badge: 'Tốt',
			headline: 'Tốc độ phục vụ tốt',
			description: 'Tốc độ phục vụ tốt, duy trì để đảm bảo trải nghiệm khách hàng'
		}
	return {
		badge: 'Cần cải thiện',
		headline: 'Cần cải thiện tốc độ phục vụ',
		description: 'Nếu quán đang đông mà khách vẫn ngồi lâu, cần xem xét các biện pháp điều tiết.'
	}
}

export function getServiceTimeComparisonText(curr: number, prev: number): string {
	const diff = Math.abs(curr - prev)
	if (diff === 0) return 'Ổn định so với tháng trước'
	return curr < prev ? `Cải thiện so với tháng trước (giảm ${diff} phút)` : `Chậm hơn tháng trước (tăng ${diff} phút)`
}
