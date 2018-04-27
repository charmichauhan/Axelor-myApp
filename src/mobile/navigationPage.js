import React from 'react';
import { BackButton, Toolbar, Button, Page, Navigator } from 'react-onsenui';
import ons from 'onsenui';
var index = 0;

class NavigationPage extends React.Component{

    renderToolbar(route, navigator) {
      const backButton = route.hasBackButton
        ? <BackButton onClick={()=> this.handleClick(navigator)}>Back</BackButton>
        : null;

      return (
        <Toolbar>
          <div className='left'>{backButton}</div>
          <div className='center'>{route.title}</div>
        </Toolbar>
      );
    }

    handleClick(navigator) {
      ons.notification.confirm('Do you really want to go back?')
        .then((response) => {
          if (response === 1) {
            navigator.popPage();
          }
        });
    }

    pushPage(navigator) {
      navigator.pushPage({
        title: `Another page ${index}`,
        hasBackButton: true
      });
      index++;
    }

    renderPage(route, navigator) {
      console.log('route', route);
      return (
        <Page key={route.title} renderToolbar={()=>this.renderToolbar(route, navigator)}>
          <section style={{margin: '16px', textAlign: 'center'}}>
            <Button onClick={()=>this.pushPage(navigator)}>
              Push Page
            </Button>
          </section>
        </Page>
      );
    }

    render() {
      return (
        <Navigator
          swipeable
          renderPage={(route, navigator)=>this.renderPage(route, navigator)}
          initialRoute={{
            title: 'First page',
            hasBackButton: false
          }}
          animation="lift"
        />
      );
    }

  }

export default NavigationPage;
