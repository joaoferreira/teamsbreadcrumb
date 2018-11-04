import { BaseApplicationCustomizer } from '@microsoft/sp-application-base';
import './Breadcrumb.css';
/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ITeamsbreadcrumbApplicationCustomizerProperties {
    testMessage: string;
}
/** A Custom Action which can be run during execution of a Client Side Application */
export default class TeamsbreadcrumbApplicationCustomizer extends BaseApplicationCustomizer<ITeamsbreadcrumbApplicationCustomizerProperties> {
    private _topPlaceholder;
    onInit(): Promise<void>;
    private _renderPlaceHolders();
    private LoadSiteBreadcrumb(context);
    RecursiveWebBreadcrumb(context: any, siteUrl: any): void;
    private fail();
    private _onDispose();
}
