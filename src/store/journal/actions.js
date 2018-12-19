import { createActions } from 'redux-actions';

import { defaultAsyncActions } from 'utils/actions';

export const {
  getJournalList,
  addJournal,
  updateJournal,
  deleteJournal,
  uploadStatement,
} = createActions({
  GET_JOURNAL_LIST: defaultAsyncActions(),
  ADD_JOURNAL: defaultAsyncActions(),
  UPDATE_JOURNAL: defaultAsyncActions(),
  DELETE_JOURNAL: defaultAsyncActions(),
  UPLOAD_STATEMENT: defaultAsyncActions(),
});
