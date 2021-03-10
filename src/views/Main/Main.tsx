/* eslint-disable @typescript-eslint/no-empty-interface */
import { Button } from '@material-ui/core';
import React, { Component } from 'react';

interface MainState {}
interface MainProps {}

class Main extends Component<MainProps, MainState, any> {
  constructor(props: MainProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Button>测试</Button>
      </div>
    );
  }
}

export default Main;
