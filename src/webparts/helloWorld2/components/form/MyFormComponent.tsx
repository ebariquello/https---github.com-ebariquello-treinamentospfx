import { Label } from '@microsoft/office-ui-fabric-react-bundle';
import * as React from 'react';
//import { SubmitHandler, useForm } from "react-hook-form";
import { IMyFormProps } from './MyFormProps';
import { IMyFormState } from './MyFormState';

// type Inputs = {
//     Title: string,
//     Description: string,
// };

export default class MyFormComponent extends React.Component<IMyFormProps, IMyFormState> {

    constructor(props:IMyFormProps) {
        super(props);
        console.log(this.props);
        this.state = {
          formData: {
            FirstName:'',
            LastName: '',
            FormValidationError: false
          },
       
        };
      }

    public async onSubmit () {
        const currentFormData =this.state.formData;
        if(this.state.formData.LastName===""){
            this.setState({formData:{
                FirstName : currentFormData.FirstName,
                LastName : currentFormData.FirstName,
                FormValidationError:true
            }});
            return; 
        }
        await this.props.saveHandler(this.state.formData);
    } 

    public async BindFormData(control:any){
        let formData = this.state.formData;
        if (control.target.id == "firstName"){
            //this.state.formData.FirstName = control.value;
            formData.FirstName = control.target.value;
        }
        else{
            //this.state.formData.LastName = control.value;
            formData.LastName = control.target.value;
        }
        if(formData.LastName===""){
            formData.FormValidationError = true;
        }
        this.setState({formData: formData})
    
           
    }


    public render(): React.ReactElement<IMyFormProps> {

        return (
        <div>
            <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First name</label>
                <input name="First name" type="name" className="form-control" id="firstName" onBlur={this.BindFormData.bind(this)}></input>
            </div>
            <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last name</label>
                <input  name="Last name" type="name" className="form-control" id="lastName" onBlur={this.BindFormData.bind(this)}></input>
                {this.state.formData.FormValidationError && this.state.formData.LastName===""?<label>
                Campo requerido
                </label>
                :
                // <label></label>
                null
                }
            </div>
            <button type="button" className="btn btn-primary" onClick={this.onSubmit.bind(this)}>Submit</button>
        </div>
    )
        }
}