export interface ITitle {
	titleId: number;
	titleName: string;
	titleNameSortable: string;
	titleTypeId?: number;
	releaseYear: number;
	processedDateTimeUtc: Date;

	awards?: IAward[];
	otherNames?: IOtherName[];
	storyLines?: IStoryLine[];
	genres?: IGenre[];
	titleParticipants: ITitleParticipant[];
}

export interface IAward {
	id: number;
	titleId: number;
	awardWon?: boolean;
	awardYear?: number;
	award1: string;
	awardCompany: string;

	title?: ITitle;
}

export interface IOtherName {
	id: number;
	titleId?: number;
	titleNameLanguage: string;
	titleNameType: string;
	titleNameSortable: string;
	titleName: string;

	title?: ITitle;
}

export interface IStoryLine {
	id: number;
	titleId: number;
	type: string;
	language: string;
	description: string;

	title?: ITitle;
}

export interface IGenre {
	id: number;
	name: string;
}

export interface ITitleParticipant {
	id: number;
	titleId: number;
	participantId: number;
	isKey: boolean;
	roleType: string;
	isOnScreen: boolean;

	participant?: IParticipant;
	title?: ITitle;
}

export interface IParticipant {
	id: number;
	name: string;
	participantType: string;

	titleParticipant?: ITitleParticipant;
}
