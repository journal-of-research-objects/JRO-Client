interface Credentials {
    backendURL: string;
    orcidURL: string;
    clientId: string;
    ghClientId: string;
}

export const CREDENTIALS: Credentials = {
    backendURL: 'http://localhost:8008',
    orcidURL: 'https://orcid.org/oauth/authorize',
    // backendURL: 'http://50.11,6.16.56:8008',
    clientId: 'APP-K70GZLOWTPC33OAB',
    ghClientId: '6398f62bbae4c0aedd39'
    // ghClientId: 'f138a92ba20b764638d6'
};
