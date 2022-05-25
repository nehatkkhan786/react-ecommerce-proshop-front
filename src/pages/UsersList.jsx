import {useState, useEffect, useContext} from 'react'
import ProductContext from '../ContextAndReducer/ProductContext';
import { Table,Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';


const UsersList = ()=>{

    const {UserDetail, usersList, loading, getUsers} = useContext(ProductContext)
    const navigate = useNavigate();
    useEffect(()=>{
        if(UserDetail && UserDetail.isAdmin){
            getUsers(UserDetail.token);
        }else{
            navigate('/login')
        }
    })
    return loading ? (<Loader/>) : (
        <>
        <h1 className='text-center'>Users</h1>
        <Table responsive hover striped>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>Admin</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>

                {usersList?.map((user, index)=>(
                    <tr key={index}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? (
                        <i className='fas fa-check' style={{color:'green'}}></i>
                    ):(<i className='fas fa-check' style={{color:'red'}}></i>)}</td>
                    <td>
                        <LinkContainer to={`/admin/user/${user._id}`}>
                        <Button variant='light' className='btn-smm'>
                        <i className='fas fa-edit'></i>
                        </Button>
                        </LinkContainer>
                    </td>
                </tr>
                ))}
                
            </tbody>

        </Table>
        </>
    ) 
}

export default UsersList;