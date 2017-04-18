import { createSelector } from 'reselect';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import * as fromRouter from '@ngrx/router-store';
import { localStorageSync } from 'ngrx-store-localstorage';
let uuid = require('uuid');
import 'rxjs/add/operator/filter';

import { Book } from './book/book.model';
import { Note } from './note/note.model';
import { environment } from '../../../environments/environment.prod';
import { Claim } from './claim/claim.model';
import { Rebuttal, initialRebuttal } from './rebuttal/rebuttal.model';
import { ClaimRebuttal } from './claim-rebuttal/claim-rebuttal.model';
import { Layout } from './layout/layout.model';
import { Counter } from './counter/counter.model';
import { Session } from './session/session.model';
import { User } from './session/session.model';
import { Crisis } from './crisis/crisis.model';
import { Contact } from './contact/contact.model';
import { Hero } from './hero/hero.model';

/**
 * The createSelector function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';


/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromBooks from './book/book.reducer';
import * as fromClaims from './claim/claim.reducer';
import * as fromCollection from './collection/collection.reducer';
import * as fromCounter from './counter/counter.reducer';
import * as fromLayout from './layout/layout.reducer';
import * as fromNotes from './note/note.reducer';
import * as fromRebuttals from './rebuttal/rebuttal.reducer';
import * as fromClaimRebuttals from './claim-rebuttal/claim-rebuttal.reducer';
import * as fromSearch from './search/search.reducer';
import * as fromSession from './session/session.reducer';
import * as fromCrises from './crisis/crisis.reducer';
import * as fromContacts from './contact/contact.reducer';
import * as fromHeroes from './hero/hero.reducer';
import { Entities, IDs } from './entity/entity.model';
import {moduleReducers,RootState} from '../../../modules/config';
/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface RootState {
  book: Entities<Book>;
  claimRebuttal: Entities<ClaimRebuttal>;
  claim: Entities<Claim>;
  collection: IDs;
  contact: Entities<Contact>;
  counter: Counter;
  crisis: Entities<Crisis>;
  hero: Entities<Hero>
  layout: Layout;
  note: Entities<Note>;
  rebuttal: Entities<Rebuttal>;
  router: fromRouter.RouterState;
  search: IDs;
  session: Session;
}


/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our createSelector helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that createSelector applies
 * the result from right to left.
 */

const reducers = moduleReducers;

const developmentReducer = compose(
  storeFreeze,
  localStorageSync(['session'], true),
  combineReducers)(reducers);
const productionReducer = compose(
  localStorageSync(['session'], true),
  combineReducers)(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}
