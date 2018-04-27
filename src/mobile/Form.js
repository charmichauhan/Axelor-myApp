import React from 'react';
import { ListItem, Toolbar, Checkbox, Page, List, Button, Input, select, Icon} from 'react-onsenui';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Form extends React.Component{

  constructor(props){
    super(props)
      this.state = {
        vegetables: [
          'Tomato',
          'Cucumber',
          'Onion',
        ],
        username: '',
        password: ''
      }
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className='center'>Form</div>
      </Toolbar>
    );
  }

  handleClick() {
    if (this.state.username === 'bob' && this.state.password === 'secret') {
      alert('You are now signed in!');
    }
    else {
      alert('Username or password incorrect!');
    }
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  renderCheckboxRow(row) {
    return (
      <ListItem key={row} tappable>
        <label className='left'>
          <Checkbox
            inputId={`checkbox-${row}`}
          />
        </label>
        <label htmlFor={`checkbox-${row}`} className='center'>
          {row}
        </label>
      </ListItem>
    )
  }

  editSelects(event) {
    console.log('edit==')
    document.getElementById('choose-sel').removeAttribute('modifier');
    if (event.target.value === 'material' || event.target.value === 'underbar') {
      document.getElementById('choose-sel').setAttribute('modifier', event.target.value);
    }
  }

  addOption(event) {
    const option = document.createElement('option');
    var text = document.getElementById('optionLabel').value;
    option.innerText = text;
    text = '';
    document.getElementById('dynamic-sel').appendChild(option);
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar}>
        <List
          dataSource={this.state.vegetables}
          renderRow={this.renderCheckboxRow}
        />

        {/* <list>
          <list-item tappable>
            <label class="left">
              <radio name="color" input-id="radio-1" checked></radio>
            </label>
            <label for="radio-1" class="center">
              Red
            </label>
          </list-item>
          <list-item tappable>
            <label class="left">
              <radio name="color" input-id="radio-2"></radio>
            </label>
            <label for="radio-2" class="center">
              Blue
            </label>
          </list-item>
        </list> */}

        <h3>Choose a type of select with different modifiers:</h3>
        <select id="choose-sel" onchange={(event)=>this.editSelects(event)}
                // multiple="true"
        >
          <option value="basic">Basic</option>
          <option value="material">Material</option>
          <option value="underbar">Underbar</option>
        </select>

        {/* <row> */}
          {/* <col width="50px"><icon icon="fa-twitter"></icon></col> */}
          {/*/ <col>Text</col> */}
        {/* </row> */}

         <section style={{textAlign: 'center'}}>
          <p>
            <Input
              value={this.state.username}
              onChange={(e)=>this.handleUsernameChange(e)}
              modifier='underbar'
              float
              placeholder='Username' />
          </p>
          <p>
            <Input
              value={this.state.password}
              onChange={(e)=>this.handlePasswordChange(e)}
              modifier='underbar'
              type='password'
              float
              placeholder='Password' />
          </p>
          <p>
            <Button onClick={()=>this.handleClick()}>Sign in</Button>
          </p>
        </section>

      </Page>
    );
  }

};

export default Form;
