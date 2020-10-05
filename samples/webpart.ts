import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HyperSdkWebPart.module.scss';
import * as strings from 'HyperSdkWebPartStrings';

export interface IHyperSdkWebPartProps {
  sdk_url: string;
  library_url: string;
  authmode: string;
  login: string;
  password: string;
}

export default class HyperSdkWebPart extends BaseClientSideWebPart<IHyperSdkWebPartProps> {

  public render(): void {

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = this.properties.sdk_url;
    document.body.appendChild(script);

    var script_start = document.createElement('script');
    script.onload = () => {
      script_start.innerText = `
    mstrHyper.start({
        server: "${this.properties.library_url}",
        authMode: ${this.properties.authmode},
    });`;
      if (this.properties.authmode === "16" || this.properties.authmode === "1") {
        script_start.innerText += `
      mstrHyper.login({
        authMode: ${this.properties.authmode},
        credential: {
          username: "${this.properties.login}",
          password: "${this.properties.password}"
        }
    });`;
      } else {
        script_start.innerText += `
      mstrHyper.login({
        authMode: ${this.properties.authmode},
      });
      `;
      }

      document.body.appendChild(script_start);
    };

  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('sdk_url', {
                  label: strings.HyperSDKURL,
                  value: "https://tutorial.microstrategy.com/hypersdk/js/mstr_hyper.bundle.js"
                }),
                PropertyPaneTextField('library_url', {
                  label: strings.LibraryURL,
                  value: "https://demo.microstrategy.com/MicroStrategyLibrary"
                }),
                PropertyPaneTextField('authmode', {
                  label: strings.AuthMode,
                  value: "8"
                }),
                PropertyPaneTextField('login', {
                  label: strings.Login,
                  value: ""
                }),
                PropertyPaneTextField('password', {
                  label: strings.Password,
                  value: ""
                })
              ]
            }
          ]
        }
      ]
    };
  }
}