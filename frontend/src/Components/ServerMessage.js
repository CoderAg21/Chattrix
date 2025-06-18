export default function ClientMessage(props) {
  // const msg = useSelector((state) => state.message.value)
  return (
     <div className="mb-3"style={{maxWidth:"50%"}}>
              <div className="fw-semibold"></div>
              <div className="bg-white border rounded p-2 shadow-sm d-inline-block">
                {props.message}
              </div>
              </div>
  )
}
