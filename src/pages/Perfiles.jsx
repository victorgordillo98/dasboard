import MaterialTable from 'material-table'

import React, { useState, useEffect } from 'react';

import StatusCard from '../components/status-card/StatusCard';

import { forwardRef } from 'react';

import axios from 'axios';

import {Modal, TextField, Button} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import statusCards from '../assets/JsonData/status-card-data.json'


import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const columnas = [
    { title: 'Identificación', field: 'id', type:"numeric"},
    { title: 'Código', field: 'codigo', type:"numeric"},
    { title: 'Nombre', field: 'nombre'},
    { title: 'Apellido', field: 'apellido'},
    { title: 'Correo', field: 'correo'},
    { title: 'Tipo', field: 'tipo'}
]

const baseUrl="http://localhost:3001/perfiles";

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    iconos: {
        cursor: 'pointer'
    },
    inputMaterial: {
        width: '100%'
    }
}));

const Home = () => {

    const styles= useStyles();
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [perfilSeleccionado, setPerfilSeleccionado] = useState({
        apellido: "",
        codigo: "",
        correo: "",
        id: "",
        nombre: "",
        tipo: ""
    });

    const handleChange=e=>{
        const {name, value}=e.target;
        setPerfilSeleccionado(prevState=>({
            ...prevState,
            [name]: value
        }));
    }
        
    const peticionGet=async()=>{
        await axios.get(baseUrl)
        .then(response=>{
            setData(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionPost=async()=>{
        await axios.post(baseUrl, perfilSeleccionado)
        .then(response=>{
            setData(data.concat(response.data));
            abrirCerrarModalInsertar();
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionPut=async()=>{
        await axios.put(baseUrl+"/"+perfilSeleccionado.id, perfilSeleccionado)
        .then(response=>{
            var dataNueva=data;
            dataNueva.map(id=>{
                if(id.id===perfilSeleccionado.id){
                    id.codigo=perfilSeleccionado.codigo;
                    id.nombre=perfilSeleccionado.nombre;
                    id.apellido=perfilSeleccionado.apellido;
                    id.correo=perfilSeleccionado.correo;
                    id.tipo=perfilSeleccionado.tipo;
                }
            });
            setData(dataNueva);
            abrirCerrarModalEditar();
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionDelete=async()=>{
        await axios.delete(baseUrl+"/"+perfilSeleccionado.id)
        .then(response=>{
            setData(data.filter(id=>id.id!==perfilSeleccionado.id));
            abrirCerrarModalEliminar();
            }).catch(error=>{
            console.log(error);
        })
    }
    
    
    const seleccionarPerfil=(id, caso)=>{
        setPerfilSeleccionado(id);
        (caso==='Editar')?abrirCerrarModalEditar()
        :
        abrirCerrarModalEliminar()
    }

    const abrirCerrarModalInsertar=()=>{
        setModalInsertar(!modalInsertar);
    }

    const abrirCerrarModalEditar=()=>{
        setModalEditar(!modalEditar);
    }

    const abrirCerrarModalEliminar=()=>{
        setModalEliminar(!modalEliminar);
    }

    useEffect(()=>{
        peticionGet();
    }, [])

    /* Creación de los modals */
 
    const bodyInsertar=(
        <div className={styles.modal}>
          <h3>Agregar Nuevo Perfil</h3>
          <TextField className={styles.inputMaterial} label="Identificacion" name="id" onChange={handleChange}/>
          <br />
          <TextField className={styles.inputMaterial} label="Código" name="codigo" onChange={handleChange}/>          
          <br />
          <TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChange}/>
          <br />
          <TextField className={styles.inputMaterial} label="Apellido" name="apellido" onChange={handleChange}/>
          <br />
          <TextField className={styles.inputMaterial} label="Correo" name="correo" onChange={handleChange}/>
          <br />
          <TextField className={styles.inputMaterial} label="Tipo" name="tipo" onChange={handleChange}/>
          <br /><br />
          <div align="right">
            <Button color="primary" onClick={()=>peticionPost()}>Crear</Button>
            <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
          </div>
        </div>
      )
    
      const bodyEditar=(
        <div className={styles.modal}>
          <h3>Editar perfil</h3>
          <TextField className={styles.inputMaterial} label="Identificacion" name="id" onChange={handleChange} value={perfilSeleccionado&&perfilSeleccionado.id}/>
          <br />
          <TextField className={styles.inputMaterial} label="Código" name="codigo" onChange={handleChange} value={perfilSeleccionado&&perfilSeleccionado.codigo}/>          
            <br />
          <TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChange} value={perfilSeleccionado&&perfilSeleccionado.nombre}/>
          <br />
          <TextField className={styles.inputMaterial} label="Apellido" name="apellido" onChange={handleChange} value={perfilSeleccionado&&perfilSeleccionado.apellido}/>
          <br />
          <TextField className={styles.inputMaterial} label="Correo" name="correo" onChange={handleChange} value={perfilSeleccionado&&perfilSeleccionado.correo}/>
          <br />
          <TextField className={styles.inputMaterial} label="Tipo" name="tipo" onChange={handleChange} value={perfilSeleccionado&&perfilSeleccionado.tipo}/>
          <br /><br />
          <div align="right">
            <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
            <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
          </div>
        </div>
      )
    
      const bodyEliminar=(
        <div className={styles.modal}>
          <p>Estás seguro que deseas eliminar el perfil <b> {perfilSeleccionado && perfilSeleccionado.nombre}</b>? </p>
          <div align="right">
            <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
            <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
    
          </div>
    
        </div>
      )

    return (
        <div>
            <div className="row">
                
                <div className="col-12">
                    <br />
                    <Button onClick={()=>abrirCerrarModalInsertar()}>Crear Perfil</Button>
                    <MaterialTable
                        icons={tableIcons}
                        columns={columnas}
                        data={data}
                        title="Perfiles"
                        actions={[
                            {
                                icon: tableIcons.Edit,
                                tooltip: 'Editar Perfil',
                                onClick: (event, rowData)=>seleccionarPerfil(rowData, "Editar")
                            },
                            {
                                icon: tableIcons.Delete,
                                tooltip: 'Eliminar Perfil',
                                onClick: (event, rowData)=>seleccionarPerfil(rowData, "Eliminar")
                            }
                        ]}
                        options={{
                            actionsColumnIndex: -1
                        }}
                        localization={{
                            header:{
                                actions: 'Acciones'
                            }
                        }}
                        
                    />
                    
                    <Modal
                    open={modalInsertar}
                    onClose={abrirCerrarModalInsertar}>
                        {bodyInsertar}
                    </Modal>

                    <Modal
                    open={modalEditar}
                    onClose={abrirCerrarModalEditar}>
                        {bodyEditar}
                    </Modal>

                    <Modal
                    open={modalEliminar}
                    onClose={abrirCerrarModalEliminar}>
                        {bodyEliminar}
                    </Modal>
                </div>
                
            </div>
        </div>
    )
}


export default Home