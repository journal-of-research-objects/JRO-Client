interface Credentials {
    backendURL: string;
    jupyterURL: string;
    orcidURL: string;
    clientId: string;
    ghClientId: string;
    ghOrganizationName: string;
    myBinderURL: string;
}

export const CREDENTIALS: Credentials = {
//    backendURL: 'http://localhost:8008',
    jupyterURL: 'http://50.116.16.56:8000',
    orcidURL: 'https://orcid.org/oauth/authorize',
    backendURL: 'http://jro.genenetwork.org/api',
    clientId: 'APP-K70GZLOWTPC33OAB',
//    ghClientId: '6398f62bbae4c0aedd39',
    ghClientId: '43ac9b21e70143c2bd89',
    ghOrganizationName: 'journal-of-research-objects-pubs',
    myBinderURL: 'https://mybinder.org/v2/gh'
};
