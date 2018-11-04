import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import { SPComponentLoader } from '@microsoft/sp-loader';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName 
} from '@microsoft/sp-application-base';
import './Breadcrumb.css';

import * as strings from 'TeamsbreadcrumbApplicationCustomizerStrings';

const LOG_SOURCE: string = 'TeamsbreadcrumbApplicationCustomizer';
var isInitialLoad:boolean = false;



/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ITeamsbreadcrumbApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class TeamsbreadcrumbApplicationCustomizer
  extends BaseApplicationCustomizer<ITeamsbreadcrumbApplicationCustomizerProperties> {

  private _topPlaceholder: PlaceholderContent | undefined;


  @override
  public onInit(): Promise<void> {

    if(navigator.userAgent.indexOf('Teams')==-1){
      return;
    }

    
    return SPComponentLoader.loadScript('/_layouts/15/init.js', { globalExportsName: '$_global_init' })
      .then((): Promise<{}> => { return SPComponentLoader.loadScript('/_layouts/15/MicrosoftAjax.js', { globalExportsName: 'Sys' }); })
      .then((): Promise<{}> => { return SPComponentLoader.loadScript('/_layouts/15/SP.Runtime.js', { globalExportsName: 'SP' }); })
      .then((): Promise<{}> => { return SPComponentLoader.loadScript('/_layouts/15/SP.js', { globalExportsName: 'SP' }); })
      .then((): Promise<void> => {
      
      // this.context.application.navigatedEvent.add(this, () => {
        if(isInitialLoad==false){
          isInitialLoad=true;  
            this._renderPlaceHolders();         
         }
      // });        
      return Promise.resolve();
    });

  }

  private _renderPlaceHolders() : void{

    if(document.getElementById('breadcrumbWrapper') !== null){
      return;
    }
    
    // Handling the top placeholder
    if (!this._topPlaceholder) {
      this._topPlaceholder =
      this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose });
    
      // The extension should not assume that the expected placeholder is available.
      if (!this._topPlaceholder) {
      console.error('The expected placeholder (Top) was not found.');
      return;
      }
    
      
      
      if (this._topPlaceholder.domElement) {
        this._topPlaceholder.domElement.innerHTML=``;
        this._topPlaceholder.domElement.innerHTML = `
        <div id="breadcrumbWrapper" class="ms-FocusZone">
          <ul id="breadcrumbSite" class="ms-Breadcrumb-list"></ul>
        </div>
        `;
        
        this.LoadSiteBreadcrumb(this);
        
      }
      
    }
  }

  private LoadSiteBreadcrumb(context): void {
    var breadCrumbNode;
    var clientcontext = new SP.ClientContext(this.context.pageContext.web.serverRelativeUrl);
    var site = clientcontext.get_site();
    var currentWeb = clientcontext.get_web();
    clientcontext.load(currentWeb, 'ServerRelativeUrl', 'Title', 'ParentWeb', 'Url');
    clientcontext.load(site, 'ServerRelativeUrl');
    clientcontext.executeQueryAsync(
    function () {
        var breadcrumbWrapper = document.createElement('div');
        breadcrumbWrapper.className = "ms-Breadcrumb";
        breadcrumbWrapper.innerHTML = '<div class="ms-FocusZone"><ul id="breadcrumbSite" class="ms-Breadcrumb-list"></ul></div>';
 
        var breadCrumbNode = document.getElementById('breadcrumbSite');
        var Custombreadcrumb = document.getElementById('DeltaPlaceHolderMain');
        var breadCrumbNode = document.getElementById('breadcrumbSite');
        if (document.location.pathname.indexOf('SitePages') != -1 || document.location.pathname.indexOf('Pages') != -1) {
            var li = document.createElement('li');
            li.className = "ms-Breadcrumb-listItem";
            if (document.title.split('-').length > 1) {
                li.innerHTML = '<span class="ms-Breadcrumb-itemLink">' + document.title.split('-')[1].trim() + '</span><i class="ms-Breadcrumb-chevron ms-Icon ms-Icon--ChevronRight"></i>'
            } else {
                li.innerHTML = '<span class="ms-Breadcrumb-itemLink">' + document.title.trim() + '</span><i class="ms-Breadcrumb-chevron ms-Icon ms-Icon--ChevronRight"></i>'
            }
            breadCrumbNode.insertBefore(li, breadCrumbNode.childNodes[0]);
        }
        else if (document.location.pathname.indexOf('_layouts/15/') != -1) {
            var li = document.createElement('li');
            li.className = "ms-Breadcrumb-listItem";
            li.innerHTML = '<span class="ms-Breadcrumb-itemLink">' + document.title + '</span><i class="ms-Breadcrumb-chevron ms-Icon ms-Icon--ChevronRight"></i>'
            breadCrumbNode.insertBefore(li, breadCrumbNode.childNodes[0]);
        }
 
        var li = document.createElement('li');
        li.className = "ms-Breadcrumb-listItem";
        li.innerHTML = '<a class="ms-Breadcrumb-itemLink" href="' + currentWeb.get_url() + '">' + currentWeb.get_title() + '</a><i class="ms-Breadcrumb-chevron ms-Icon ms-Icon--ChevronRight"></i>'
        if (Custombreadcrumb != null) {
            breadCrumbNode.insertBefore(li, breadCrumbNode.childNodes[0]);
            
        }
        if (site.get_serverRelativeUrl() !== currentWeb.get_serverRelativeUrl()) {
            context.RecursiveWebBreadcrumb(context, currentWeb.get_serverRelativeUrl());
            
        }
        else{
          context.RecursiveWebBreadcrumb(context, currentWeb.get_serverRelativeUrl());
          isInitialLoad = false;   
        }
    }, this.fail);
}
        
public RecursiveWebBreadcrumb(context, siteUrl): void {
    var Custombreadcrumb = document.getElementById('contentBox');
    var breadCrumbNode = document.getElementById('breadcrumbSite');
    var clientcontext = new SP.ClientContext(siteUrl);
    var site = clientcontext.get_site();
    var currentWeb = clientcontext.get_web();
    clientcontext.load(currentWeb, 'ServerRelativeUrl', 'Title', 'ParentWeb', 'Url');
    clientcontext.load(site, 'ServerRelativeUrl');
    clientcontext.executeQueryAsync(function () {
      if (site.get_serverRelativeUrl() !== currentWeb.get_serverRelativeUrl()) {
        var li = document.createElement('li');
        li.className = "ms-Breadcrumb-listItem";
        li.innerHTML = '<a class="ms-Breadcrumb-itemLink" href="' + currentWeb.get_url() + '">' + currentWeb.get_title() + '</a><i class="ms-Breadcrumb-chevron ms-Icon ms-Icon--ChevronRight"></i>'
        var Custombreadcrumb = document.getElementById('contentBox');
        breadCrumbNode.insertBefore(li, breadCrumbNode.childNodes[0]);             
        context.RecursiveWebBreadcrumb(context, currentWeb.get_parentWeb().get_serverRelativeUrl());
      } else {
        var li = document.createElement('li');
        li.className = "ms-Breadcrumb-listItem";
        li.innerHTML = '<a class="ms-Breadcrumb-itemLink" href="' + currentWeb.get_url() + '">' + currentWeb.get_title() + '</a><i class="ms-Breadcrumb-chevron ms-Icon ms-Icon--ChevronRight"></i>'
        breadCrumbNode.insertBefore(li, breadCrumbNode.childNodes[0]);
      }
    }, this.fail);
  }
      
  private fail(): void {
    console.log('Unable to load SharePoint BreadCrumb');
  }

  private _onDispose(): void {  
     
    console.log('Disposed');
  }
}
