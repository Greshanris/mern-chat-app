import { useAuthStore } from "../store/useAuthStore"

const settings = () => {

  const {authUser} = useAuthStore();

  return (
    <div>settings</div>
  )
}

export default settings