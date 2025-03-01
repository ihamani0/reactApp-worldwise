
import SideBar from '../components/SideBar'
import Map from '../components/Map'
import style from './AppLayout.module.css'
import User from '../components/User'

function AppLayout() {
    
  return (
    <div className={style.app}>
        
        <SideBar />

        <Map />

<User />
    </div>
  )
}

export default AppLayout