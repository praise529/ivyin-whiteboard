import { useParams } from 'react-router'

const WhiteboardScreen = () => {
    const { id } = useParams();
  return (
    <div>WhiteboardScreenID: {id}</div>
  )
}

export default WhiteboardScreen