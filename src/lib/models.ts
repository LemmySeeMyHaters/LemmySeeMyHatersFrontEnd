import { browser } from '$app/environment';
import { writable, type Writable } from "svelte/store";

export interface LemmyVotesParam {
    url: string;
    offset: string;
    limit: string;
    votes_filter: string;
    sort_by: string;
    username?: string;
}

let initial_params = {
    url: "",
    offset: '0',
    limit: '20',
    votes_filter: 'All',
    sort_by: 'datetime_desc',
    username: undefined
}

if (browser && typeof localStorage !== 'undefined') {
    let localStorageParams = localStorage?.getItem("lemmyVotesParam");
    if (localStorageParams !== null) {
        initial_params = JSON.parse(localStorageParams);
    }
}

export let lemmyVotesParam: Writable<LemmyVotesParam> = writable(browser && initial_params);
lemmyVotesParam.subscribe((val) => browser && localStorage.setItem("lemmyVotesParam", JSON.stringify(val)));