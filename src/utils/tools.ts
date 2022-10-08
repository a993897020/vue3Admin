/*
 * @Author: 关振俊
 * @Date: 2022-07-15 09:38:04
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-10-08 18:06:47
 * @Description: 
 */
/**
 * 
 * @param time 毫秒时间
 * @returns 
 */
export const onPending = (time: number): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), time);
	});
};
/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export const formatTime = (time: number, option?: string): string => {
	if (('' + time).length === 10) {
		time = parseInt(time) * 1000;
	} else {
		time = +time;
	}
	const d = new Date(time);
	const now = Date.now();

	const diff = (now - d) / 1000;

	if (diff < 30) {
		return '刚刚';
	} else if (diff < 3600) {
		// less 1 hour
		return Math.ceil(diff / 60) + '分钟前';
	} else if (diff < 3600 * 24) {
		return Math.ceil(diff / 3600) + '小时前';
	} else if (diff < 3600 * 24 * 2) {
		return '1天前';
	}
	if (option) {
		return parseTime(time, option);
	} else {
		return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分';
	}
};
