
import Button from './Button'
import { useNavigate } from 'react-router-dom'

function ButtonBack() {

    const navigate = useNavigate();

  return (
    <Button
          type="back"
          onClickEvent={()=>navigate(-1)}
        >
          &larr; Back
    </Button>
  )
}

export default ButtonBack