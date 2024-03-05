import { useParams } from "react-router-dom"

const TableList = () => {
    const { username } = useParams()
  return (
    <>
        <h1>{username}</h1>
    </>
  )
}

export default TableList
