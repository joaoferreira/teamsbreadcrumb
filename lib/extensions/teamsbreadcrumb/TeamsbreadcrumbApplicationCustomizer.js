var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { override } from '@microsoft/decorators';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { BaseApplicationCustomizer, PlaceholderName } from '@microsoft/sp-application-base';
import './Breadcrumb.css';
var LOG_SOURCE = 'TeamsbreadcrumbApplicationCustomizer';
var isInitialLoad = false;
/** A Custom Action which can be run during execution of a Client Side Application */
var TeamsbreadcrumbApplicationCustomizer = (function (_super) {
    __extends(TeamsbreadcrumbApplicationCustomizer, _super);
    function TeamsbreadcrumbApplicationCustomizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TeamsbreadcrumbApplicationCustomizer.prototype.onInit = function () {
        var _this = this;
        if (navigator.userAgent.indexOf('Teams') == -1) {
            return;
        }
        return SPComponentLoader.loadScript('/_layouts/15/init.js', { globalExportsName: '$_global_init' })
            .then(function () { return SPComponentLoader.loadScript('/_layouts/15/MicrosoftAjax.js', { globalExportsName: 'Sys' }); })
            .then(function () { return SPComponentLoader.loadScript('/_layouts/15/SP.Runtime.js', { globalExportsName: 'SP' }); })
            .then(function () { return SPComponentLoader.loadScript('/_layouts/15/SP.js', { globalExportsName: 'SP' }); })
            .then(function () {
            // this.context.application.navigatedEvent.add(this, () => {
            if (isInitialLoad == false) {
                isInitialLoad = true;
                _this._renderPlaceHolders();
            }
            // });        
            return Promise.resolve();
        });
    };
    TeamsbreadcrumbApplicationCustomizer.prototype._renderPlaceHolders = function () {
        if (document.getElementById('breadcrumbWrapper') !== null) {
            return;
        }
        // Handling the top placeholder
        if (!this._topPlaceholder) {
            this._topPlaceholder =
                this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, { onDispose: this._onDispose });
            // The extension should not assume that the expected placeholder is available.
            if (!this._topPlaceholder) {
                console.error('The expected placeholder (Top) was not found.');
                return;
            }
            if (this._topPlaceholder.domElement) {
                this._topPlaceholder.domElement.innerHTML = "";
                this._topPlaceholder.domElement.innerHTML = "\n        <div id=\"breadcrumbWrapper\" class=\"ms-FocusZone\">\n          <ul id=\"breadcrumbSite\" class=\"ms-Breadcrumb-list\"></ul>\n        </div>\n        ";
                this.LoadSiteBreadcrumb(this);
            }
        }
    };
    TeamsbreadcrumbApplicationCustomizer.prototype.LoadSiteBreadcrumb = function (context) {
        var breadCrumbNode;
        var clientcontext = new SP.ClientContext(this.context.pageContext.web.serverRelativeUrl);
        var site = clientcontext.get_site();
        var currentWeb = clientcontext.get_web();
        clientcontext.load(currentWeb, 'ServerRelativeUrl', 'Title', 'ParentWeb', 'Url');
        clientcontext.load(site, 'ServerRelativeUrl');
        clientcontext.executeQueryAsync(function () {
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
                    li.innerHTML = '<span class="ms-Breadcrumb-itemLink">' + document.title.split('-')[1].trim() + '</span><i class="ms-Breadcrumb-chevron ms-Icon ms-Icon--ChevronRight"></i>';
                }
                else {
                    li.innerHTML = '<span class="ms-Breadcrumb-itemLink">' + document.title.trim() + '</span><i class="ms-Breadcrumb-chevron ms-Icon ms-Icon--ChevronRight"></i>';
                }
                breadCrumbNode.insertBefore(li, breadCrumbNode.childNodes[0]);
            }
            else if (document.location.pathname.indexOf('_layouts/15/') != -1) {
                var li = document.createElement('li');
                li.className = "ms-Breadcrumb-listItem";
                li.innerHTML = '<span class="ms-Breadcrumb-itemLink">' + document.title + '</span><i class="ms-Breadcrumb-chevron ms-Icon ms-Icon--ChevronRight"></i>';
                breadCrumbNode.insertBefore(li, breadCrumbNode.childNodes[0]);
            }
            var li = document.createElement('li');
            li.className = "ms-Breadcrumb-listItem";
            li.innerHTML = '<a class="ms-Breadcrumb-itemLink" href="' + currentWeb.get_url() + '">' + currentWeb.get_title() + '</a><i class="ms-Breadcrumb-chevron ms-Icon ms-Icon--ChevronRight"></i>';
            if (Custombreadcrumb != null) {
                breadCrumbNode.insertBefore(li, breadCrumbNode.childNodes[0]);
            }
            if (site.get_serverRelativeUrl() !== currentWeb.get_serverRelativeUrl()) {
                context.RecursiveWebBreadcrumb(context, currentWeb.get_serverRelativeUrl());
            }
            else {
                context.RecursiveWebBreadcrumb(context, currentWeb.get_serverRelativeUrl());
                isInitialLoad = false;
            }
        }, this.fail);
    };
    TeamsbreadcrumbApplicationCustomizer.prototype.RecursiveWebBreadcrumb = function (context, siteUrl) {
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
                li.innerHTML = '<a class="ms-Breadcrumb-itemLink" href="' + currentWeb.get_url() + '">' + currentWeb.get_title() + '</a><i class="ms-Breadcrumb-chevron ms-Icon ms-Icon--ChevronRight"></i>';
                var Custombreadcrumb = document.getElementById('contentBox');
                breadCrumbNode.insertBefore(li, breadCrumbNode.childNodes[0]);
                context.RecursiveWebBreadcrumb(context, currentWeb.get_parentWeb().get_serverRelativeUrl());
            }
            else {
                var li = document.createElement('li');
                li.className = "ms-Breadcrumb-listItem";
                li.innerHTML = '<a class="ms-Breadcrumb-itemLink" href="' + currentWeb.get_url() + '">' + currentWeb.get_title() + '</a><i class="ms-Breadcrumb-chevron ms-Icon ms-Icon--ChevronRight"></i>';
                breadCrumbNode.insertBefore(li, breadCrumbNode.childNodes[0]);
            }
        }, this.fail);
    };
    TeamsbreadcrumbApplicationCustomizer.prototype.fail = function () {
        console.log('Unable to load SharePoint BreadCrumb');
    };
    TeamsbreadcrumbApplicationCustomizer.prototype._onDispose = function () {
        console.log('Disposed');
    };
    __decorate([
        override
    ], TeamsbreadcrumbApplicationCustomizer.prototype, "onInit", null);
    return TeamsbreadcrumbApplicationCustomizer;
}(BaseApplicationCustomizer));
export default TeamsbreadcrumbApplicationCustomizer;
//# sourceMappingURL=TeamsbreadcrumbApplicationCustomizer.js.map