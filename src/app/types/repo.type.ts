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
    public issueMsg: string = null;
    public keywords: string[];
    public paperType: string;
    public createdAt: Date;
    public modifiedAt: Date;
    public submittedAt: Date;
    public publishedAt: Date;
    public oriUrl: string;
    public ownerOrcid: string;

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
        asset.issueMsg = rawData.hasOwnProperty('issueMsg') ? rawData.issueMsg : '';
        asset.paperType = rawData.hasOwnProperty('paper_type') ? rawData.paper_type : null;
        asset.createdAt = rawData.hasOwnProperty('date_created') ? new Date(rawData.date_created) : null;
        asset.modifiedAt = rawData.hasOwnProperty('date_modified') ? new Date(rawData.date_modified) : null;
        asset.submittedAt = rawData.hasOwnProperty('date_submitted') ? new Date(rawData.date_submitted) : null;
        asset.publishedAt = rawData.hasOwnProperty('date_published') ? new Date(rawData.date_published) : null;
        asset.oriUrl = rawData.hasOwnProperty('ori_url') ? rawData.ori_url : null;
        asset.ownerOrcid = rawData.hasOwnProperty('owner') ? rawData.owner : null;

        if (rawData.hasOwnProperty('metadata')) {
            asset.authors = rawData.metadata.authors;
            asset.keywords = rawData.metadata.keywords ? rawData.metadata.keywords.split(',') : null;
        }
        return asset;
    }

}
