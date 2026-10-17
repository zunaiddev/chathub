import {RouterProvider} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import {router} from "./app/router.tsx";

function App() {
    return (<>
        <RouterProvider router={router}/>
        <Toaster position="top-right" toastOptions={{
            style: {
                borderRadius: '10px',
                background: '#181818',
                color: '#fff',
            }
        }}/>
    </>);
}

export default App;