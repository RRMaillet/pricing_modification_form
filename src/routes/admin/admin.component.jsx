
import { Outlet } from "react-router-dom";


function Admin(isAdmin){
    return(
        <div>
            <Outlet />
            <h1>{isAdmin ? 'Found it!' : 'Nope'}</h1>
        </div>
    );
}



export default Admin;