export enum RequestHeaders {
	AUTHORIZATION = 'Authorization',
	API_VERSION = 'X-Api-Version',
	CONTENT_TYPE = 'Content-Type'
}

export enum RecordStatus {
	ACTIVE = 'Y',
	INACTIVE = 'N'
}

export enum CommonActions {
	CREATE = 'CREATE',
	READ = 'READ',
	DELETE_MANY = 'DELETE_MANY',
	UPDATE_MANY = 'UPDATE_MANY',
	UPDATE = 'UPDATE',
	CANCEL = 'CANCEL',
	SAVE = 'SAVE',
	DELETE = 'DELETE',
	SET_STATUS = 'SET_STATUS',
	IMPORT = 'IMPORT',
	EXPORT = 'EXPORT'
}

export enum DayInWeek {
	SUNDAY = 'CN',
	MONDAY = 'T2',
	TUESDAY = 'T3',
	WEDNESDAY = 'T4',
	THURSDAY = 'T5',
	FRIDAY = 'T6',
	SATURDAY = 'T7'
}
