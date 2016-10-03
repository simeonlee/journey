import * as types from '../constants/ActionTypes'

export const setCurrentDate = date => ({ type: types.SET_CURRENT_DATE, date })
export const setCurrentWeek = week => ({ type: types.SET_CURRENT_WEEK, week })
export const setJournalEntries = journalEntries => ({ type: types.SET_JOURNAL_ENTRIES, journalEntries })