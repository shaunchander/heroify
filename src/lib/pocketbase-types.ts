/**
 * This file was @generated using pocketbase-typegen
 */

export enum Collections {
	Licenses = 'licenses',
	Prompts = 'prompts'
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

// System fields1
export type BaseSystemFields<T = never> = {
	id: RecordIdString;
	created: IsoDateString;
	updated: IsoDateString;
	collectionId: string;
	collectionName: Collections;
	expand?: T;
};

export type AuthSystemFields<T = never> = {
	email: string;
	emailVisibility: boolean;
	username: string;
	verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type LicensesRecord = {
	license: string;
	credits?: number;
};

export type PromptsRecord<Timages = unknown> = {
	prompt: string;
	images?: null | Timages;
	license?: string;
	status?: boolean;
	inferenceId?: string;
	numImages?: number;
	isFailed?: boolean;
	removeBg?: boolean;
	removeBgStatus?: boolean;
};

// Response types include system fields and match responses from the PocketBase API
export type LicensesResponse = Required<LicensesRecord> & BaseSystemFields;
export type PromptsResponse<Timages = unknown> = Required<PromptsRecord<Timages>> &
	BaseSystemFields;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	licenses: LicensesRecord;
	prompts: PromptsRecord;
};

export type CollectionResponses = {
	licenses: LicensesResponse;
	prompts: PromptsResponse;
};
