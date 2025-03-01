
import styles from './CityList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import CityItem from './CityItem'
import { useCities } from '../contexts/CitiesProvider'



function CityList() {

  const {isLoding,cities} = useCities();

  if(isLoding) return <Spinner  />

  if(!cities.length) return <Message message='Ther Is no Data ' />

  return (
    <ul className={styles.cityList}>
      {cities.map( city => (
        <CityItem key={city.id} city={city}   />
      ) )}
    </ul>
  )
}

export default CityList