import axios, { AxiosRequestConfig, CancelToken, CancelTokenSource } from 'axios';
import AxiosConfig from './APIConfig';
import { IAward, IGenre, IOtherName, IParticipant, IStoryLine, ITitle, ITitleParticipant } from './MovieInterfaces';

const axiosInstance = AxiosConfig.instance();

/*----------------------------------Cancel Tokens----------------------------------------*/

export const cancelPromises = (source: CancelTokenSource) => {
	source.cancel();
};

export const getSource = (): CancelTokenSource => {
	return axios.CancelToken.source();
};

/*----------------------------------Route and Type Coercion----------------------------------------*/

// map all the api routes to allow for sharing generic controller actions
// /%% will be replaced with an Id if provided, else left open
// specific controller actions will be provided as their own functions
export type APITypes = 'Title' | 'Award' | 'OtherName' | 'StoryLine' | 'Genre' | 'TitleParticipant' | 'Participant';
export type APIType<T> = T extends 'Title'
	? ITitle
	: T extends 'Award'
	? IAward
	: T extends 'OtherName'
	? IOtherName
	: T extends 'StoryLine'
	? IStoryLine
	: T extends 'Genre'
	? IGenre
	: T extends 'TitleParticipant'
	? ITitleParticipant
	: T extends 'Participant'
	? IParticipant
	: never;

const apiMap = {
	Title: 'titles/%%',
	Award: 'titles/%%/awards',
	OtherName: 'titles/%%/othernames',
	StoryLine: 'titles/%%/storylines',
	Genre: 'titles/%%/genres',
	TitleParticipant: 'titles/%%/titleparticipants',
	Participant: 'titles/%%/titleparticipants/%%/participants',
};

/*---------------------------------Base Call Interfaces-------------------------------*/

export interface IAPICall<T extends APITypes> {
	type: T;
	id?: number[];
}

export interface IAPIGet<T extends APITypes> extends IAPICall<T> {
	token?: CancelToken;
	params?: any; //need to figure out how to get this here later dynamically
}

export interface IAPIPostPut<T extends APITypes> extends IAPICall<T> {
	payload?: APIType<T>;
}

/*---------------------------------Calls-------------------------------*/

/* 
 replace /%% with `/{id}` for each id, if available
 else remove them
 examples: 
    titles/%%/rewards and [1] -> titles/1/rewards (get rewards for title 1)
    titles/%%/rewards and [] or undefined -> titles/rewards (get all rewards)
    titles/%%/titleparticipants/%%/participants and [1] -> titles/1/titleparticipants/participants (probably a bad call)
 assumptions:
    will likely get a 404 not found back for bad combinations of routes like for the 3rd one above
*/
function getUrlFromMap<T extends APITypes>(call: IAPICall<T>): string {
	const templateUrl = apiMap[call.type];
	if (!templateUrl) throw 'Unimplemented type!';
	//for each id in the call, replace id's in order, else fallback to original string
	let updatedUrl = call.id?.reduce((agg, id) => (agg = agg.replace('/%%', `/${id}`)), templateUrl) ?? templateUrl;
	//remove any un-updated segments
	return updatedUrl.replaceAll('/%%', '');
}

// Gets an api call for route, supports get all and get specifics, with provided id's
// TODO: need to figure out how to differentiate APIType<T> and APIType<T>[] from inputs
export function getAPI<T extends APITypes>(props: IAPIGet<T>): Promise<APIType<T>[]> {
	const url = getUrlFromMap(props);
	var config: AxiosRequestConfig = {};
	if (props.token !== undefined) config.cancelToken = props.token;
	//data sent is uri encoded by default for axios
	if (props.params !== undefined) config.params = props.params;

	return axiosInstance.get(url, config).then((response) => {
		if (Array.isArray(response.data)) return response.data;
		else return [response.data];
	});
}
