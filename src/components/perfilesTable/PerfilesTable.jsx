/* Acá se debe consultar una api para buscar las tablas de usuarios */
import React, {useState} from "react";

import './perfilesTable.css'

import Badge from '../badge/Badge'

import Table from '../table/Table'

import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'

/*  Latest Orders Card */
const latestOrders = {
    header: [
        "id",
        "codigo",
        "correo",
        "nombre",
        "estado",
        "foto"
    ],
    body: [
        {
            id: "#OD1711",
            codigo: "john doe",
            correo: "17 Jun 2021",
            nombre: "$900",
            estado: "shipping",
            foto: "shipping"
        },
        {
            id: "#OD1711",
            codigo: "john doe",
            correo: "17 Jun 2021",
            nombre: "$900",
            estado: "shipping",
            foto: "shipping"
        },
        {
            id: "#OD1711",
            codigo: "john doe",
            correo: "17 Jun 2021",
            nombre: "$900",
            estado: "shipping",
            foto: "shipping"
        },
        {
            id: "#OD1711",
            codigo: "john doe",
            correo: "17 Jun 2021",
            nombre: "$900",
            estado: "shipping",
            foto: "shipping"
        },
        {
            id: "#OD1711",
            codigo: "john doe",
            correo: "17 Jun 2021",
            nombre: "$900",
            estado: "shipping",
            foto: "shipping"
        }
    ]
}

const listperfiles = [
    {
        "nombre" : "Estudiantes",
    },
    {
        "nombre" : "Profesores"
    },
    {
        "nombre" : "Colaboradores"
    },
    {
        "nombre" : "Administradores"
    }

] 
/* Colores de los estados */
const orderStatus = {
    "shipping": "primary",
    "pending": "warning",
    "paid": "success",
    "refund": "danger"
}

const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderOrderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.codigo}</td>
        <td>{item.correo}</td>
        <td>{item.nombre}</td>
        <td>
            <Badge type={orderStatus[item.estado]} content={item.estado}/>
        </td>
        <td>{item.foto}</td>
    </tr>
)

function PerfilesTable () {

    const themeReducer = useSelector(state => state.ThemeReducer.mode)

    const [idDatos, setiddatos] = useState(-1);


    const handlerCargarPerfiles = function (e) {
        const opcion = e.target.value;
         console.log(opcion);
         setiddatos(opcion);
    }

    return (
        
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <select className="select__perfil" name="listperfiles" id="sellistperfiles" onClick={handlerCargarPerfiles}>
                        <option value={-1}> Selecciona el tipo de usuario que desea consultar: </option>
                        {
                            listperfiles.map((item, i)=>(
                                <option key={"listperfiles"+i} value={i}>{item.nombre}</option>
                            ) )
                        }
                    </select>
                    <br />
                    <br />
                    <div className="col-6">
                        <div className='topnav__search'>
                            <input type="text" placeholder='Search here...'/>
                            <i className='bx bx-search'></i>
                        </div>
                    </div>
                </div>  
            
            </div>
            
            <div className="col-12">
                    {
                    idDatos === 0 ? (
                        <div className="card">
                            <div className="card__header">
                                <h3>Estudiantes</h3>
                                idDatos
                            </div>
                            <div className="card__body">
                                <Table 
                                    headData={latestOrders.header}
                                    renderHead={(item, index) => renderOrderHead(item, index)}
                                    bodyData={latestOrders.body}
                                    renderBody={(item, index) => renderOrderBody(item, index)}
                                        
                                />
                            </div>
                        </div>
                    ) : idDatos === 1 ? (
                        <div className="card">
                            <div className="card__header">
                                <h3>Docentes</h3>
                            </div>
                            <div className="card__body">
                                <Table 
                                    headData={latestOrders.header}
                                    renderHead={(item, index) => renderOrderHead(item, index)}
                                    bodyData={latestOrders.body}
                                    renderBody={(item, index) => renderOrderBody(item, index)}      
                                />
                            </div>
                        </div>
                    ) : idDatos === 2 ? (
                        <div className="card">
                            <div className="card__header">
                                <h3>Administrador</h3>
                            </div>
                            <div className="card__body">
                                <Table 
                                    headData={latestOrders.header}
                                    renderHead={(item, index) => renderOrderHead(item, index)}
                                    bodyData={latestOrders.body}
                                    renderBody={(item, index) => renderOrderBody(item, index)}      
                                />
                            </div>                        
                        </div>
                    ): null }
            </div>
        </div>
    )
}

export default PerfilesTable;