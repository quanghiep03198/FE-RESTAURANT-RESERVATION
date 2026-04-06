export enum TableStatus {
	AVAILABLE = 'AVAILABLE',
	OCCUPIED = 'OCCUPIED',
	RESERVED = 'RESERVED',
	// CLEANING = 'CLEANING',
	DISABLED = 'DISABLED' // ? This status can be used when the table is temporarily unavailable for use, such as during maintenance or repair.
}
