import * as React from 'react';
import styles from './HelloWorld2.module.scss';
import { IHelloWorld2Props } from './IHelloWorld2Props';
import { escape } from '@microsoft/sp-lodash-subset';

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import MyFormComponent from './form/MyFormComponent';
import { formProperties } from '@uifabric/utilities';
import { FormModel } from './form/FormModel';

export interface IHelloWordStates {
  items: any[],
  nome: string,
  idade: string,
}

export default class HelloWorld2 extends React.Component<IHelloWorld2Props, IHelloWordStates, {}> {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      nome: "Yasmin",
      idade: ""
    }
  }

  async componentDidMount() {

    const resultItems = await this.ReloadList();
    console.log(resultItems);

  }

  private async  ReloadList() : Promise<any[]>
  {
    //const newItems: any[] = await sp.web.lists.getById(this.props.lists).items.filter(`Title eq '${this.props.Title}'`).get();
    const newItems: any[] = await sp.web.lists.getById(this.props.lists).items.getAll(); //.filter(`Title eq '${this.props.Title}'`).get();
    this.setState({ items: newItems });
    return newItems;
  }

  public async saveItem(formdata: FormModel){
  
    //Add Item to List
    await sp.web.lists.getById(this.props.lists).items.add({
     'Title' : formdata.FirstName,
     'LastName': formdata.LastName}
    );
    //Refresh ListItems
    const resultItems = await this.ReloadList();
    console.log(resultItems);
 
  }

  public render(): React.ReactElement<IHelloWorld2Props> {



    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Created</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.items.map((item) => {
                return (
                  <tr>
                    <th scope="row">{item.ID}</th>
                    <td>{item.Title}</td>
                    <td>{item.Created}</td>
                    <td>
                      <button className="btn btn-warning btn-sm">Editar</button>
                      <button className="btn btn-danger btn-sm">Delete</button>
                    </td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
        <MyFormComponent saveHandler={this.saveItem.bind(this)}   />
      </div>
    )
  }
}