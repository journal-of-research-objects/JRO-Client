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
        asset.id = rawData.hasOwnProperty('id') ? rawData.id : '';
        asset.name = rawData.hasOwnProperty('name') ? rawData.name : '';
        asset.description = rawData.hasOwnProperty('description') ? rawData.description : '';
        asset.url = rawData.hasOwnProperty('html_url') ? rawData.html_url : '';
        asset.language = rawData.hasOwnProperty('language') ? rawData.language : '';
        asset.status = rawData.hasOwnProperty('status') ? rawData.status : '';
        asset.properties = rawData;
        asset.lastUpdate = rawData.hasOwnProperty('updated_at') ? new Date(rawData.updated_at) : null;
        return asset;
    }

}
