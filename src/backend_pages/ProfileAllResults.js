import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';

const ProfileAllResults = () => {
    const {proxy, userData} = useContext(AuthContext);
    const [result, setResult] = useState({})

    useEffect(() => {
        getAllResults()
    }, [])

    const getAllResults = async() => {
        let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
        console.log('datas', datas)
        const resp2 = await fetch(`${proxy}/backend/get_months_results/${datas.id}/`, {
            method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
        })
        const data2 = await resp2.json()
        if(data2.status === 200){
          setResult(data2)
        }
    }

    console.log('all_hours', result.all_hours)
    console.log('all_minutes', result.all_minutes)

  return (
    <div>
      
    </div>
  )
}

export default ProfileAllResults
