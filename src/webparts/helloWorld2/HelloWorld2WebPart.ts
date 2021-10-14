import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'HelloWorld2WebPartStrings';
import HelloWorld2 from './components/HelloWorld2';
import { IHelloWorld2Props } from './components/IHelloWorld2Props';
import { PropertyFieldNumber } from '@pnp/spfx-property-controls/lib/PropertyFieldNumber';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';

import "bootstrap/dist/css/bootstrap.min.css";

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";

export interface IHelloWorld2WebPartProps {
  description: string;
  Title: string;
  phone: number;
  numberValue: number;
  lists: string;
}

export default class HelloWorld2WebPart extends BaseClientSideWebPart<IHelloWorld2WebPartProps> {

  public onInit(): Promise<void> {

    return super.onInit().then(_ => {

      sp.setup({
        spfxContext: this.context
      });
    });
  }


  public render(): void {
    const element: React.ReactElement<IHelloWorld2Props> = React.createElement(
      HelloWorld2,
      {
        description: this.properties.description,
        Title: this.properties.Title,
        phone: this.properties.phone,
        numberValue: this.properties.numberValue,
        lists: this.properties.lists
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Aula 1"
          },
          groups: [
            {
              groupName: "Informações",
              groupFields: [
                PropertyPaneTextField('Title', {
                  label: "Título"
                }),
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('phone', {
                  label: "Telefone"
                }),
                PropertyFieldNumber("numberValue", {
                  key: "numberValue",
                  label: "Number value only",
                  description: "Number field description",
                  value: this.properties.numberValue,
                  maxValue: 10,
                  minValue: 1,
                  disabled: false
                }),
                PropertyFieldListPicker('lists', {
                  label: 'Select a list',
                  selectedList: this.properties.lists,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
