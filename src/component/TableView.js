import React from 'react'
import { Table, Tag, Space, Button } from 'antd';
import 'antd/dist/antd.css';
import { getData } from '../redux/actions'
import { connect } from "react-redux";
function TableView({ fetchcoins, data }) {
    React.useEffect(() => {
        fetchcoins()
    }, [])
    const [coinDataIndex, setCoinDataIndex] = React.useState(50)
    function convertToInternationalCurrencySystem(num) {

        let number = parseInt(num);
        let digits = new Number(number.toFixed(0)).toString().length;
        let prettyNumber;
        if (digits > 19) {
            number /= Math.pow(10, 19);
            prettyNumber = number.toFixed(2) + 'QT';
        }
        else if (digits > 16) {
            number /= Math.pow(10, 16);
            prettyNumber = number.toFixed(2) + 'Q';
        }
        else if (digits > 13) {
            number /= Math.pow(10, 13);
            prettyNumber = number.toFixed(2) + 'T';
        }
        else if (digits > 10) {
            number /= Math.pow(10, 10);
            prettyNumber = number.toFixed(2) + 'B';
        } else if (digits > 6) {
            number /= Math.pow(10, 6);
            prettyNumber = number.toFixed(2) + 'M';
        } else {
            prettyNumber = new Number(number).toString();
        }
        return prettyNumber
    }
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
            render: (text, record) => <div style={{ 'display': 'flex' }} ><img height="40px" style={{
                'padding-right': '10px'
            }} src={'https://assets.coincap.io/assets/icons/' + record.symbol.toLowerCase() + '@2x.png'} /><div><div>{text}</div><div>{record.symbol}</div></div></div>,
        },
        {
            title: 'Price',
            dataIndex: 'priceUsd',
            key: 'priceUsd',
            render: text => <div>{new Intl.NumberFormat('en-In', { style: 'currency', currency: 'USD' }).format(text)}</div>
        },
        {
            title: 'Market Cap',
            dataIndex: 'marketCapUsd',
            key: 'marketCapUsd',
            render: text => <div>{'$' + convertToInternationalCurrencySystem(text)}</div>

        },
        {
            title: 'VWAP (24Hr)',
            dataIndex: 'vwap24Hr',
            key: 'vwap24Hr',
            render: text => <div>{new Intl.NumberFormat('en-In', { style: 'currency', currency: 'USD' }).format(text)}</div>

        },
        {
            title: 'Supply',
            dataIndex: 'supply',
            key: 'supply',
            render: text => <div>{'$' + convertToInternationalCurrencySystem(text)}</div>
        },
        {
            title: 'Volume(24Hr)',
            dataIndex: 'volumeUsd24Hr',
            key: 'volumeUsd24Hr',
            render: text => <div>{'$' + convertToInternationalCurrencySystem(text)}</div>
        },
        {
            title: 'Change (24Hr)',
            dataIndex: 'changePercent24Hr',
            key: 'changePercent24Hr',
            render: text => <div>{text > 0 ? <div style={{ color: 'green' }} >{Number(text).toFixed(2)}</div> : <div style={{ color: 'red' }} >{Number(text).toFixed(2)}</div>}</div>
        },



    ];
    function updateTable() {
        setCoinDataIndex(coinDataIndex + 50)
    }
    return (
        <div>
            <div className="App">
                {data?.errorMessage
                    ? <h2>Please Try again</h2>
                    : <Table columns={columns} dataSource={data?.data?.slice(0, coinDataIndex)} loading={data?.loading} pagination={false}
                    />

                }
                {coinDataIndex < data?.data?.length && <Button type="primary" block onClick={updateTable} >Load More</Button>}
            </div>
        </div>
    )
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
export default connect(mapStateToProps, mapDispatchToProps)(TableView);
