import React from 'react';
import { Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import  Select from 'react-select';
import 'react-select/dist/react-select.css';

class PartnerForm extends React.Component{

    render() {
        const { contact, onChange, saveRecord, resetForm, errorMessage, teamArray, companyArray, languageArray, categoryArray,
                addressArray, contactFetch } = this.props;
        // console.log('contactFetch', contactFetch);
        // const { fetch } = contactFetch;
        // fetch(contact, {
        //   partnerAddressList: ['address']
        // })
        // .then((res) => {
        //   console.log('resFetch', res);
        // })

        return(
            <div style={{padding:"50px"}}>
                    <Form onSubmit={(e)=>saveRecord(e)}>

                      <FormGroup>
                          <ControlLabel> Name: </ControlLabel>
                          <div className={errorMessage.name && errorMessage.name.length > 0 ? 'error' : ''}>
                              <FormControl type="text" onChange={(e)=>onChange('name', e.target.value)} value={contact.name} autoFocus />
                          </div>
                          {errorMessage.name && errorMessage.name.length > 0 ? <span style={{color: 'red'}}>{errorMessage.name}</span> : "" }
                      </FormGroup>

                      <FormGroup>
                          <ControlLabel> Fullname: </ControlLabel>
                          <div className={errorMessage.full_name && errorMessage.full_name.length > 0 ? 'error' : ''}>
                              <FormControl type="text" onChange={(e)=>onChange('full_name', e.target.value)} value={contact.full_name}/>
                          </div>
                          {errorMessage.full_name && errorMessage.full_name.length > 0 ? <span style={{color: 'red'}}>{errorMessage.full_name}</span> : ""}
                      </FormGroup>

                        <FormGroup>
                          <ControlLabel> Phone Number: </ControlLabel>
                          <div className={errorMessage.fixedPhone && errorMessage.fixedPhone.length > 0 ? 'error' : ''}>
                              <FormControl type="text" onChange={(e)=>onChange('fixedPhone', e.target.value)} value={contact.fixedPhone}/>
                          </div>
                          {errorMessage.fixedPhone && errorMessage.fixedPhone.length > 0 ? <span style={{color: 'red'}}>{errorMessage.fixedPhone}</span> : "" }
                      </FormGroup>

                      <FormGroup>
                          <ControlLabel> Email Address: </ControlLabel>
                          <div className={errorMessage.emailAddress && errorMessage.emailAddress.length > 0 ? 'error' : ''}>
                              <FormControl type="text" onChange={(e)=>onChange('emailAddress', e.target.value)} value={contact.emailAddress.name} />
                          </div>
                          {errorMessage.emailAddress && errorMessage.emailAddress.length > 0 ? <span style={{color: 'red'}}>{errorMessage.emailAddress}</span> : ""}
                      </FormGroup>

                      <FormGroup>
                          <ControlLabel> Team: </ControlLabel>
                      <Select
                          valueKey='id'
                          labelKey='name'
                          options={teamArray}
                          onChange={(e)=>onChange('team', e)}
                          value={contact.team}
                      />
                      </FormGroup>

                      <FormGroup>
                          <ControlLabel> Companies associated to: </ControlLabel>
                      <Select
                          valueKey='id'
                          labelKey='name'
                          options={companyArray}
                          onChange={(e)=>onChange('companySet', e)}
                          value={contact.companySet}
                          multi={true}
                          removeSelected={false}
                      />
                      </FormGroup>

                      <FormGroup>
                        <ControlLabel> Language: </ControlLabel>
                        <Select
                            valueKey='id'
                            labelKey='name'
                            options={languageArray}
                            onChange={(e)=>onChange('language', e)}
                            value={contact.language}
                        />
                      </FormGroup>

                      <FormGroup>
                          <ControlLabel> Category: </ControlLabel>
                      <Select
                          valueKey='id'
                          labelKey='name'
                          options={categoryArray}
                          onChange={(e)=>onChange('partnerCategory', e)}
                          value={contact.partnerCategory}
                      />
                      </FormGroup>

                      {/* <FormGroup>
                          <ControlLabel> Address: </ControlLabel>
                      <Select
                          valueKey='id'
                          labelKey='name'
                          options={addressArray}
                          onChange={(e)=>onChange('partnerAddressList', e)}
                          value={contact.partnerAddressList.address.fullName}
                      />
                      </FormGroup> */}

                      <Button
                          bsStyle="success"
                          type="submit"
                      > Submit
                      </Button>
                      <Button style={{marginLeft:"10px"}} onClick={resetForm}>Reset</Button>
                    </Form>
            </div>
        )
    }
}

export default PartnerForm;
