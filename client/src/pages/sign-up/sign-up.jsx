import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/auth-action";
import MyButton from '../../components/utils/button/button';
import FormField from '../../components/utils/form-field/form-field';
import {update,generateData,isFormValid} from '../../components/utils/form-action/form-action';
import './sign-up.scss';


  const SignUp = ({history}) => {
    const dispatch = useDispatch()
    const [formField, setFormField] = useState({
        formError: false,
        formSuccess:'',
        formData:{
            name:{
                element:'input',
                label:'Full name',
                value:'',
                config:{
                    name:'name_input',
                    type:'text',
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            email:{
                element:'input',
                label:'Email',
                value:'',
                config:{
                    name:'email_input',
                    type:'email',
                },
                validation:{
                    required:true,
                    email:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            password:{
                element:'input',
                label:'Password',
                value:'',
                config:{
                    name:'password_input',
                    type:'password',
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            confirmPassword:{
                element:'input',
                label:'Confirm password',
                value:'',
                config:{
                    name:'confirm_password_input',
                    type:'password',
                },
                validation:{
                    required:true,
                    confirm: 'password'
                },
                valid:false,
                touched:false,
                validationMessage:''
            }
        }
    })

    const updateForm = (element) => {
        const newFormData = update(element,formField.formData,'register');
        setFormField({
            formError:false,
            formData: newFormData,
        })
    }

    const submitForm = async e => {
        e.preventDefault();
        let dataToSubmit = generateData(formField.formData,'register');
        let formIsValid = isFormValid(formField.formData,'register');

        if(formIsValid){
            dispatch(register(dataToSubmit))
                .then(res => {
                if(res.payload.success){
                    if(res.payload.isAdmin){
                        history.push('/admin')
                    }else{
                        history.push('/cart')
                    }
                }else{
                    setFormField({...formField,formError:true})
                }
                })
                .catch(err => {
                    console.log(err.res.data.error)
                    setFormField({...formField,formError:true})
                })
        }else{
            setFormField({...formField,formError:true})
        }
    }


  return (
    <Fragment>
      <div className='sign-up card'>
        <h2 className='title'>I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={e => submitForm(e)}>
            <FormField
                id={'name'}
                formData={formField.formData.name}
                change={(element) => updateForm(element)}
            />
            <FormField
                id={'email'}
                formData={formField.formData.email}
                change={(element) => updateForm(element)}
            />
            <FormField
                id={'password'}
                formData={formField.formData.password}
                change={(element) => updateForm(element)}
            />
            <FormField
                id={'confirmPassword'}
                formData={formField.formData.confirmPassword}
                change={(element) => updateForm(element)}
            />

            <MyButton onClick={submitForm} type="primary" title="Sign In" value="Submit" />
        </form>

        {formField.formError ?
          <div className="error_label">
              Please check your data
          </div> : null
        }



        <span className="signIn">Already have an account sign in <Link style={{textDecoration:'underline'}} to='/signin'>here</Link></span>
      </div>
    </Fragment>
  )
}

export default SignUp;