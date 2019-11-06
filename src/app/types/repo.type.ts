import { RepoSubmitAuthor } from './repo-submit';

export class RepoDescriptor {
    public id: string = null;
    public name: string = null;
    public description: string = null;
    public url: string = null;
    public language: string = null;
    public status: string = null;
    public properties: any = {};
    public lastUpdate: Date;
    public authors: RepoSubmitAuthor[];
    public keywords: string[];

    constructor() { }

    public static import(rawData: any): RepoDescriptor {
        const asset = new RepoDescriptor();
        asset.id = rawData.hasOwnProperty('properties') ? rawData.properties.id : '';
        asset.name = rawData.hasOwnProperty('name') ? rawData.name : '';
        asset.description = rawData.hasOwnProperty('properties') ? rawData.properties.description : '';
        asset.url = rawData.hasOwnProperty('fork_url') ? rawData.fork_url : '';
        asset.language = rawData.hasOwnProperty('properties') ? rawData.properties.language : '';
        asset.status = rawData.hasOwnProperty('status') ? rawData.status : '';
        asset.properties = rawData.hasOwnProperty('properties') ? rawData.properties : '';
        asset.lastUpdate = rawData.hasOwnProperty('properties') ? new Date(rawData.properties.updated_at) : null;
        if (rawData.hasOwnProperty('metadata')) {
            asset.authors = rawData.metadata.authors;
            asset.keywords = rawData.metadata.keywords ? rawData.metadata.keywords.split(',') : null;
        }
        return asset;
    }

}
