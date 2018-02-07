import { Feed } from '../models/feed';
import { Article } from '../models/article';

const initialState = [];

export const ADD_FEED = 'ADD_FEED';
export const UPDATE_FEED = 'UPDATE_FEED';
export const REMOVE_FEED = 'REMOVE_FEED';
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE';

export function feedsReducer(state: Array<Feed> = initialState, action: any) {
  let newState: Array<Feed>;
  switch (action.type) {
    case ADD_FEED:
      newState = state.slice();
      // action.payload.feed.articles.forEach(article => article.visited = false);
      newState.push(action.payload.feed);
      return newState;

    case UPDATE_FEED:
      newState = state.slice();
      let feedToUpdate = newState.find(feed => feed.info.id === action.payload.feed.info.id);

      action.payload.feed.articles.forEach(updatedArticle => {
        let existingArticle = feedToUpdate.articles.find(article => article.guid === updatedArticle.guid);
        if (!existingArticle) {
          // updatedArticle.visited = false;
          feedToUpdate.articles.push(updatedArticle);
        }
      });
      return newState;

    case REMOVE_FEED:
      newState = state.slice();
      newState.splice(newState.indexOf(action.payload.feed), 1);
      return newState;

    case UPDATE_ARTICLE:
      newState = state.slice();
      newState.forEach(feed => {
        let existingArticle = feed.articles.find(article => article.guid === action.payload.article.guid);
        if (existingArticle) {
          feed.articles.splice(feed.articles.indexOf(existingArticle), 1, action.payload.article);
        }
      });
      return newState;

    default:
      return state;
  }
}

export function fetchFeed(feed: Feed) {
  return { type: ADD_FEED, payload: { feed } }
}

export function updateFeed(feed: Feed) {
  return { type: UPDATE_FEED, payload: { feed } }
}

export function removeFeed(feed: Feed) {
  return { type: REMOVE_FEED, payload: { feed } }
}

export function updateArticle(article: Article) {
  return { type: UPDATE_ARTICLE, payload: { article } }
}
