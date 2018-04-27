import React from 'react';
import { Page, Button} from 'react-onsenui';

class HelloWorld extends React.Component{

   handleClick() {
    alert('Hello world!');
  }

  render(){
    return(
      <div>
        <Page>
          <Button onClick={this.handleClick}>Tap me!</Button>
        </Page>
      </div>
    )
  }
}

export default HelloWorld;
