import './App.css';
import { Table, Tag, Space, Button } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { getData } from './redux/actions'
import { connect } from "react-redux";
import TableView from './component/TableView';
function App() {

  return (
    <div>
      <TableView />
    </div>
  );
}

export default App;

