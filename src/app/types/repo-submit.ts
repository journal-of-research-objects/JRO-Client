/**
 * contiene la informacion de el submit de un repositorio a la
 * plataforma
 */
export interface RepoSubmit {
    name: string,
    gitUser: string,
    orcid: string,
    authors?: RepoSubmitAuthor[],
    keywords?: string[];
}

/**
 * contiene informacion de un author de un repositorio a subir?
 */
export interface RepoSubmitAuthor {
    name: string,
    aff: string,
    orcid?: string
};