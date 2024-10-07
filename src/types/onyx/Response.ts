import type {OnyxUpdate} from 'react-native-onyx';

/** Model of commands data */
type Data = {
    /** Name of the API call */
    phpCommandName: string;

    /** Collection of auth write requests */
    authWriteCommands: string[];
};

/** Model of server response */
type Response = {
    /** ID of the next update that needs to be fetched from the server */
    previousUpdateID?: number | string;

    /** ID of the last update that needs to be fetched from the server */
    lastUpdateID?: number | string;

    /** HTTP response status code */
    jsonCode?: number | string;

    /** Collection of onyx updates (SET/MERGE/...) */
    onyxData?: OnyxUpdate[];

    /** ID of the request that triggered this response */
    requestID?: string;

    /** Report ID of the updated report */
    reportID?: string;

    /**
     * Whether the sequential queue should not send any requests to the server.
     * Used when there's a gap between client and server updates.
     */
    shouldPauseQueue?: boolean;

    /** User session auth token */
    authToken?: string;

    /** Used to load resources like attachment videos and images */
    encryptedAuthToken?: string;

    /** User session auth token when connecting as a delegate */
    restrictedToken?: string;

    /** Used to pass error messages for error handling purposes */
    message?: string;

    /** Used to pass error title for error handling purposes */
    title?: string;

    /** Commands data */
    data?: Data;

    /** Used to pass error type for error handling purposes */
    type?: string;

    /** Short lived auth token generated by API */
    shortLivedAuthToken?: string;

    /** Short lived token generated by spotnana for authenticating travelDot */
    spotnanaToken?: string;

    /** User authorization token to authorize Pusher connections */
    auth?: string;

    /** Base64 key to decrypt messages from Pusher encrypted channels */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    shared_secret?: string;

    /** The accountID of the user */
    accountID?: number;

    /** The email of the user */
    email?: string;
};

export default Response;
