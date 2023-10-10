import { lemmyVotesParam } from '$lib/models';
import { browser } from '$app/environment';

let lvp = {};
lemmyVotesParam.subscribe((val) => lvp = val);

export async function load({ fetch }) {
    const prepareQuery = new URLSearchParams(lvp);
    if (prepareQuery.get('username') === 'undefined') {
        prepareQuery.delete('username');
    }

    let prepared_url;
    if (lvp.url.includes("/post/")) {
        prepared_url = `https://lemmyvotes.info/votes/post?${prepareQuery.toString()}`;
    } else {
        prepared_url = `https://lemmyvotes.info/votes/comment?${prepareQuery.toString()}`;
    }
    let votesResponse: VotesResponse;
    if (browser) {
        votesResponse = await fetchVotes(prepared_url, fetch);
    } else {
        votesResponse = { votes: [], total_count: 0, next_offset: null, total_score: 0, upvotes: 0, downvotes: 0 }
    }
    return { votesResponse };
}

async function fetchVotes(url: string, fetch) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { Accept: 'application/json' }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

interface LemmyVote {
    name: string;
    score: number;
    actor_id: string;
    created_utc: number;
}

interface VotesResponse {
    votes: LemmyVote[];
    total_count: number;
    next_offset?: number | null;
    total_score: number;
    upvotes: number;
    downvotes: number;
}
