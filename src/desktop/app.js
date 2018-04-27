import React, { Component } from 'react';
import { connect, getSettings } from '@axelor/web-client';
import PartnerForm from './PartnerForm';
import PartnerTable from './PartnerTable';
import debounce from 'lodash.debounce';

const defaultEmail = {
  name: ''
}
const defaultAddress = {
  address: {
    fullName: ''
  }
}
const defaultData = {
  id: 0,
  name: '',
  full_name: '',
  fixedPhone: '',
  emailAddress: {...defaultEmail},
  team: null,
  companySet: null,
  language: null,
  partnerCategory: null,
  partnerAddressList: {...defaultAddress},
  isCustomer: true,
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contactList: [],
      contact: { ...defaultData },
      searchValue: '',
      teamArray: [],
      companyArray: [],
      languageArray: [],
      categoryArray: [],
      addressArray: [],
      limit: 10,
      offset: 0,
      total: 0,
      message: '',
      sortBy: '',
      sortDir: '',
      inProgress: false,
      errorMessage: {
        name:'',
        full_name:'',
        fixedPhone:'',
        emailAddress:''
      },
    }
    this.settings = getSettings()();
    this.delayGetAllData = debounce(this.getAllData, 500);
  }

  getAllData() {
    const { searchAll } = this.props.contact;
    const {offset, searchValue, limit, sortBy} = this.state;
    let options = {
      limit,
      offset,
    };
    if (searchValue) {
      options.data = {
        criteria: [
          { fieldName:"name", operator: 'like', value: searchValue },
          { fieldName:"fullName", operator: 'like', value: searchValue },
          { fieldName:"fixedPhone", operator: 'like', value: searchValue },
          { fieldName:"emailAddress", operator: 'like', value: searchValue },
          { fieldName:"team", operator: 'like', value: searchValue },
          { fieldName:"companySet", operator: 'like', value: searchValue },
          { fieldName:"language", operator: 'like', value: searchValue },
          { fieldName:"partnerCategory", operator: 'like', value: searchValue },
          // { fieldName:"partnerAddressList", operator: 'like', value: searchValue },
        ],
        operator: 'or',
      };
    }
    if(sortBy){
      options.sortBy = [
          sortBy
      ]
    }
    this.setState({inProgress: true});
    searchAll({...options})
    .then((result) =>{
        console.log('resultgetData', result.data);
        this.setState({ contactList: result.data, total: result.total, inProgress: false })
    });
  }

  getTeamData() {
    const { searchAll } = this.props.contact.refs.team;
    const { teamArray } = this.state;
    searchAll(teamArray)
    .then((result)=> {
      this.setState((prevState) => {
        return {teamArray: result.data}
      });
    })
  }

  getCompanyData() {
    const { searchAll } = this.props.contact.refs.company;
    const { companyArray} = this.state;
    searchAll(companyArray)
    .then((result)=> {
      this.setState((prevState) => {
        return {companyArray: result.data}
      });
    });
  }

  getLanguage() {
    const { searchAll } = this.props.contact.refs.language;
    const { languageArray} = this.state;
    searchAll(languageArray)
    .then((result)=> {
      this.setState((prevState) => {
        return {languageArray: result.data}
      });
    })
  }

  getCategory() {
    const { searchAll } = this.props.contact.refs.category;
    const { categoryArray } = this.state;
    searchAll(categoryArray)
    .then((result)=> {
      this.setState((prevState) => {
        return {categoryArray: result.data}
      });
    })
  }

  getAddress() {
    const { searchAll } = this.props.contact.refs.partneraddress;
    const { addressArray} = this.state;
    searchAll(addressArray)
    .then((result)=> {
      console.log('resultaddress', result.data);
      this.setState((prevState) => {
        return {addressArray: result.data}
      });
    })
  }

  componentDidMount() {
    this.setState({ inProgress: true });
    this.settings.save({
      url: 'http://localhost:3000/axelor-erp',
      username: 'admin',
      password: 'admin',
    })
    .then(() => this.getAllData())
    .then(() => this.getTeamData())
    .then(() => this.getCompanyData())
    .then(() => this.getLanguage())
    .then(() => this.getCategory())
    .then(() => this.getAddress())
  }

  checkFormField(key, value) {
    let {errorMessage} = this.state;
    switch (key) {
      case 'name':
        let nameValid = value.match(/^[a-zA-Z]+$/);
        errorMessage.name = !value || !nameValid || value.length < 2 ? 'Please enter valid name' : ''
        break;
      case 'full_name':
        let fullNameValid = value.match(/^[a-zA-Z]+$/);
        errorMessage.full_name = !value || !fullNameValid || value.length < 2 ? 'Please enter valid fullname' : ''
        break;
      case 'fixedPhone':
        let fixedPhoneValid = value.match(/^[0-9].+$/);
        errorMessage.fixedPhone = !value || !fixedPhoneValid || value.length > 9 || value.length > 14 ? 'Please enter valid phone number' : ''
        break;
      case 'emailAddress':
        let emailValid = (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(value);
        errorMessage.emailAddress = !value || !emailValid ? 'Please enter valid email' : ''
        break;
      default:
        break;
    }
    this.setState({errorMessage});
    return errorMessage;
  }

  formIsValid() {
    let {contact, errorMessage} = this.state;
    errorMessage = this.checkFormField('name', contact.name);
    errorMessage = this.checkFormField('full_name', contact.full_name);
    errorMessage = this.checkFormField('fixedPhone', contact.fixedPhone);
    errorMessage = this.checkFormField('emailAddress', contact.emailAddress);
    this.setState({ errorMessage });
    return Object.keys(errorMessage).every(x => !errorMessage[x]);
  }

  onChange(key, value) {
    const { contact } = this.state;
    contact[key] = value;
    console.log(contact)
    this.setState({ contact }, ()=>this.checkFormField(key, value));
  }

  onSearchChange(value) {
    this.setState({ searchValue: value, offset: 0}, () => this.delayGetAllData())
  }

  handlePrevPage() {
    const {offset, limit } = this.state;
    const newOffset = Math.floor(offset - limit);
    this.setState({ offset: newOffset}, () => this.getAllData());
  }

  handleNextPage() {
    const { offset, limit } = this.state;
    const newOffset = Math.floor(offset + limit);
    this.setState({ offset: newOffset}, () => this.getAllData());
  }

  findIndex(id) {
    const { contactList } = this.state;
    return contactList.findIndex(i => i.id === id );
  }

  saveRecord(e) {
    e.preventDefault();
    const { contact, contactList, total } = this.state;
    const { add, update } = this.props.contact;
    this.setState({inProgress: true});
    const formIndex = this.findIndex(contact.id);
    contactList[formIndex] = contact;
    if(contact.id){
      update(contact, contact.id).then((result) => {
        this.setState({ contactList: [...contactList], contact: {...defaultData}, message: 'Record updated successfully!!', inProgress: false });
      })
    }
    else{
      add(contact)
      .then((result) => {
          this.setState({ contactList: [result.data[0], ...contactList], contact: {...defaultData}, total: total+1,
                          message: 'Record submitted successfully!!', inProgress: false });
        });
    }
  }

  editRecord(id) {
    const { contactList } = this.state;
    const findIndex = this.findIndex(id);
    const contact = contactList[findIndex];

    const { fetch } = this.props.contact;
    fetch(contact, {
      partnerAddressList: ['address']
    })
    .then((res) => {
      console.log('rx', res);
      this.setState({ contact: {...contact} });
    })
  }

  removeRecord(contact) {
    const { contactList, total } = this.state;
    const { remove } = this.props.contact;
    this.setState({inProgress: true});
    const formIndex = this.findIndex(contact.id);
    remove(contact).then((result) => {
      contactList.splice(formIndex, 1);
      this.setState({ contactList: [...contactList], total: total-1, message: 'Record deleted successfully!!', inProgress: false});
    });
  }

  resetForm () {
    this.setState({ contact: defaultData });
  }

  sortData(key) {
    debugger
    let {sortBy} = this.state;
    if(sortBy === key){
      console.log('sort===', key, sortBy, this.state.sortDir)
      this.setState({sortDir: 'DESC', sortBy: '-'+key}, ()=> this.getAllData());
    }
    else {
      console.log('sort===', key, sortBy, this.state.sortDir)
      this.setState({sortDir: 'ASC', sortBy: key}, ()=> this.getAllData())
    }
  }

  render() {
    // console.log('contact==', this.props);

    const { contact, contactList, searchValue, message, offset, total, sortBy, sortDir, inProgress, errorMessage, teamArray,
            companyArray, languageArray, categoryArray, addressArray } = this.state;

    return (
      <div>
        <PartnerForm
            contact = { contact }
            onChange = { (key, value) => this.onChange(key, value) }
            saveRecord = { (e) => this.saveRecord(e) }
            resetForm = { () => this.resetForm() }
            errorMessage = { errorMessage }
            teamArray = { teamArray }
            companyArray = { companyArray }
            languageArray = { languageArray }
            categoryArray = { categoryArray }
            addressArray = { addressArray }
            contactFetch= { this.props.contact}
        />
        <PartnerTable
          contactList = { contactList }
          searchValue = { searchValue }
          message = { message }
          offset = { offset }
          total = { total }
          sortBy = { sortBy }
          sortDir = { sortDir }
          inProgress = { inProgress }
          onSearchChange = { (value) => this.onSearchChange(value) }
          editRecord = { (id) => this.editRecord(id) }
          removeRecord = { (id) => this.removeRecord(id) }
          handlePrevPage = { ()=>this.handlePrevPage() }
          handleNextPage = { ()=>this.handleNextPage() }
          sortData = { (key)=>this.sortData(key) }
        />
      </div>
    )
  }
}

const mapConnectToProps = (props) => {
  const {...contact } = props;
  return { contact };
}

const mapConnectConfig = {
  name: 'Contact',
  refs: [
    { model: 'Company', field: 'company' },
    { model: 'Team', field: 'team' },
    { model: 'Language', field: 'language' },
    { model: 'Category', field: 'category' },
    { model: 'PartnerAddress', field: 'partnerAddress' },
  ],
};

export default connect(mapConnectToProps)(App, mapConnectConfig);
