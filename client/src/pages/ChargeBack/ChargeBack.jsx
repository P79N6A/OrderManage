import React, { Component } from 'react';
import PageHead from '../../components/PageHead';
import ChargeBackTable from './components/ChargeBackTable';

export default class ChargeBack extends Component {
  render() {
    return (
      <div>
        <PageHead title="分类管理" />
        <ChargeBackTable />
      </div>
    );
  }
}
