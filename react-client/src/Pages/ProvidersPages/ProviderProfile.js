import React from 'react'
import ProviderNavigationBar from '../../Components/ProvidersComponents/ProviderNavigationBar'
import EditProviderProfile from './EditProviderProfile'
import './ProviderProfileStyles.css'

export default function ProviderProfile({ }) {


  return (
    <div>
      <ProviderNavigationBar />

      <div className="provider-profile-container">
        <EditProviderProfile />
      </div>

    </div>
  )
}
