import React from 'react'

import { Eventos } from "../components/eventos/Eventos"

import { useEffect, useState } from 'react';

import '../components/eventos/eventos.css'

import Card from "../components/eventos/Card";



const Lineas = () => {

    const [data,setData] = useState([]);
    const [collection,setCollection] = useState([]);

    useEffect(()=>{
        setData(Eventos);
        setCollection([... new Set(Eventos.map((item)=> item.linea))])
      },[]) 
    
      const gallery_filter = (itemData) =>{
        const filterData = Eventos.filter((item)=> item.linea === itemData);
        setData(filterData);
      }
    
    return (
        <div>
            <div className="col-12">
                <div className="filterItem">
                    <ul>
                        <li><button onClick={()=> setData(Eventos)}>All</button></li>
                        {
                            collection.map((item)=> <li><button onClick={()=>{gallery_filter(item)}}>{item}</button></li>)
                        }
                    </ul> 
                </div>
                <div className='row'>
                    {data.map(({linea, titulo, desc, fechaIni, fechaFin, estado, image, id}) => (
                    <div className="col-3" key={id}>
                        <Card imageSource={image} title={titulo} text={desc} fechaIni={fechaIni} fechaFin={fechaFin} url={desc} />
                    </div>
                    ))}
                </div>
                
        
                
                    
            </div>
        </div>
    )
}

export default Lineas
