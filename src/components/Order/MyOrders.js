import React, { Fragment, useEffect } from 'react'
import './MyOrders.css'
import {DataGrid} from '@material-ui/data-grid'
import MetaData from '../layout/MetaData'
import Loader from '../loader/Loader'
import { Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors, myOrders } from '../../actions/orderActions'
import { MdLaunch } from 'react-icons/md'
import { Link } from 'react-router-dom'

const MyOrders = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const {loading,error,orders} = useSelector((state)=>state.myOrders)
    const {user} = useSelector(state=>state.user)
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 150,
          flex: 0.5,
          cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered"
              ? "greenColor"
              : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 150,
          flex: 0.3,
        },
    
        {
          field: "amount",
          headerName: "Amount",
          type: "number",
          minWidth: 270,
          flex: 0.5,
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Link to={`/order/${params.getValue(params.id, "id")}`}>
                <MdLaunch />
              </Link>
            );
          },
        },
      ];
    const rows = []
    orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(myOrders())
    },[error,alert,dispatch])
  return (
    <Fragment>
        <MetaData title={`${user.name} - Orders`} />
        {
            loading ? <Loader/> : (
                <div className='myOrdersPage'>
                    <DataGrid 
                        rows={rows}
                        columns={columns} 
                        pageSize={10} 
                        disableSelectionOnClick
                        className='myOrdersTable'
                        autoHeight
                    />
                    <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
                </div>
            )
        }
    </Fragment>
  )
}

export default MyOrders