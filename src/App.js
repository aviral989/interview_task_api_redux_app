import logo from './logo.svg';
import './App.css';
import { Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React from 'react';
import { getData } from './redux/actions'
import { connect } from "react-redux";

function App({ fetchcoins,data }) {


  React.useEffect(()=>{
  fetchcoins() 
  },[])
  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text,record) => <div style={{'display':'flex'}} ><img height="40px" style={{ 'padding-right': '10px'
        }} src={'https://assets.coincap.io/assets/icons/'+record.symbol.toLowerCase()+'@2x.png'} /><div><div>{text}</div><div>{record.symbol}</div></div></div>,
    },
    {
      title: 'Price',
      dataIndex: 'priceUsd',
      key: 'priceUsd',
      render : text => <div>{text.slice(0,3)}</div>
    },
    {
      title: 'Market Cap',
      dataIndex: 'marketCapUsd',
      key: 'marketCapUsd',
    },
    {
      title: 'VWAP (24Hr)',
      dataIndex: 'vwap24Hr',
      key: 'vwap24Hr',
    },
    {
      title: 'Supply',
      dataIndex: 'supply',
      key: 'supply',
    },
    {
      title: 'Volume(24Hr)',
      dataIndex: 'volumeUsd24Hr',
      key: 'volumeUsd24Hr',
    },
    {
      title: 'Change (24Hr)',
      dataIndex: 'changePercent24Hr',
      key: 'changePercent24Hr',
    },
    

    
  ];
  

  return (
    <div className="App">
      {console.log("data",data)}
      {data?.loading ?
        <h2>loading</h2>  
:
data?.errorMessage
?<h2>Please Try again</h2>
:<Table columns={columns} dataSource={data?.data} />

}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    data: state
  };
}
const mapDispatchToProps = dispatch => {
  return {
   fetchcoins: () => dispatch(getData()) 
  }
} 
export default connect(mapStateToProps,mapDispatchToProps)(App);

