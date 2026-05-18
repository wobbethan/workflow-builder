export type OnSaveParams = { isAutoSave?: boolean };

type DidSaveStatus = 'error' | 'success' | 'alreadyStarted';

export type OnSave = (savingParams?: OnSaveParams) => Promise<DidSaveStatus>;
