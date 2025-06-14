
function AuthenticateWelcome() {
    const welcome = {
        display:'flex',
        justifyContent:"center",
        marginTop:"28vh",
        fontWeight:"bold",
        width:"100%",
        
    }
  return (
    <h1 style={welcome}>Welcome to &nbsp;<span style={{color:"blue"}}>Chattrix</span></h1>
  );
}

export default AuthenticateWelcome;
