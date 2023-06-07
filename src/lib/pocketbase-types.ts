/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Licenses = "licenses",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type LicensesRecord = {
	license: string
	credits: number
}

// Response types include system fields and match responses from the PocketBase API
export type LicensesResponse = Required<LicensesRecord> & BaseSystemFields

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	licenses: LicensesRecord
}

export type CollectionResponses = {
	licenses: LicensesResponse
}