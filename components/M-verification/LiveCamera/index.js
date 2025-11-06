import { useRouter } from 'next/router'

const Lobby = ({ onClose, property, setData }) => {
  const router = useRouter()
  return (
    <div className="fixed inset-0 flex items-center justify-center mt-[10vh] mb-[6vh] z-50"></div>
  )
}

export default Lobby
