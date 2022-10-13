import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const HomePage = () => {

    let navigate = useNavigate()

    let {user,authToken} = useContext(AuthContext)

    let [data,setData] = useState([])
    useEffect(
        ()=>{
            if (!user) {
                return navigate("/login");
            }
            getData()
        },
        [user]
    )
    
    let getData = async ()=>{
        let url = 'http://127.0.0.1:8000/api/data/'
        let response = await fetch(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authToken.access)
            },
        })
        let data = await response.json()
        setData(data)
    }

    return (
        <div>
            
            {data.map(shop=>
                <div key={shop.name}>
                    <h2>{shop.name}</h2>
                    <p>Отчеты</p>
                    <table className='table'>
                        <thead>
                        <tr>
                            <th>Месяц</th>
                            <th>План ТО</th>
                            <th>План трафик</th>
                            <th>План штук</th>
                            <th>Факт ТО</th>
                            <th>Факт трафик</th>
                            <th>Факт штук</th>
                            <th>Выполнено ТО</th>
                            <th>Выполнено трафик</th>
                            <th>Выполнено штук</th>

                        </tr>
                        </thead>
                        <tbody>
                        {shop.reports.map(report=>
                            <tr key={report.month}>
                                <td>{report.month}</td>
                                <td>{report.planTo}</td>
                                <td>{report.planTraffic}</td>
                                <td>{report.planNum}</td>
                                <td>{report.factTo}</td>
                                <td>{report.factTraffic}</td>
                                <td>{report.factNum}</td>
                                <td>{(report.factTO/report.planTO*100).toFixed(2)}%</td>
                                <td>{(report.factTraffic/report.planTraffic*100).toFixed(2)}%</td>
                                <td>{(report.factNum/report.planNum*100).toFixed(2)}%</td>


                            </tr>
                            
                            
                            )}
                        </tbody>
                    </table>
                </div>
                )}

        </div>
    )
}

export default HomePage

