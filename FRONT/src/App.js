import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaPrincipal from './Paginas/Alumno01/PaginaPrincipal';
import ResultadoBusqueda from './Paginas/Alumno01/ResultadoBusqueda';
import DetalleProducto from './Paginas/Alumno01/DetalleProducto';
import Dashboard from './Paginas/Alumno05/Dashboard';
import AdminProducto from './Paginas/Alumno05/AdminProducto';
import AgregarProducto from './Paginas/Alumno05/AgregarProducto';
import ListaUsuariosAdmin from './Paginas/Alumno06/ListaUsuariosAdmin';
import ListaOrdenesAdmin from './Paginas/Alumno06/ListaOrdenesAdmin';
import DetalleUsuarioAdmin from './Paginas/Alumno06/DetalleUsuarioAdmin';
import DetalleOrdenAdmin from './Paginas/Alumno06/DetalleOrdenAdmin';
import CreateSerie from './Paginas/Alumno04/AdminCrearSeries';
import SeriesDetail from './Paginas/Alumno04/AdminActualizarSerie';
import DetalleOrden from './Paginas/Alumno04/DetalleOrdenUsuario';
import DetalleUsuario from './Paginas/Alumno04/ConfigDRU';
import CambiarContraseña from './Paginas/Alumno04/cambiarcontraof';
import ThankYouPage from './Paginas/Alumno02/graciascompra';
import CartPage from './Paginas/Alumno02/PaginaCarrito';
import CheckoutPage from './Paginas/Alumno02/checkout';
import Registrar from './Paginas/Alumno03/Registrar';
import Iniciarsesion from './Paginas/Alumno03/IniciarSesion';
import RecuperarPassword from './Paginas/Alumno03/RecuperarPassword';
import ListadoSeries from './Paginas/Alumno04/LSA';

import DashboardUsuario from './Paginas/Alumno03/DashboardUsuario';

import ProtectedRoute from './Componentes/protectedroute';
import AcercaDeNosotros from './Componentes/AcercadeNosotros';
import PoliticaDeEnvio from './Componentes/Politicaenvio';
import FAQ from './Componentes/FAQ';
import Ayuda from './Componentes/ayuda';
function App (){
  return (
     <Router>
          <Routes>
              <Route path='' element={<PaginaPrincipal/>}/>
              <Route path='/resultado' element={<ResultadoBusqueda/>}/>
              <Route path='/detalle/:id' element={<DetalleProducto/>}/>  
              <Route path='/Dashboard' element={<Dashboard/>}/>
              <Route path='/AgregarProducto' element={<AgregarProducto/>}/>
              <Route path='/AdminProducto' element={<AdminProducto/>}/>
              <Route path='/ListaUsuariosAdmin' element={<ListaUsuariosAdmin/>}/>
              <Route path="/usuarios/:id" element={<DetalleUsuarioAdmin/>}/>
              <Route path='/ListaOrdenesAdmin' element={<ListaOrdenesAdmin/>}/> 
              <Route path='/DetalleUsuarioAdmin' element={<DetalleUsuarioAdmin/>}/> 
              <Route path='/DetalleOrdenAdmin' element={<DetalleOrdenAdmin/>}/>
              <Route path='/ListaSeries' element={<ListadoSeries/>}/>
              <Route path='/ver/serie/:id' element={<SeriesDetail/>}/>
              <Route path='/crear-serie' element={<CreateSerie/>}/>
              <Route path='/detalleorden/:id' element={<DetalleOrden/>}/>
              <Route path='/detalleusuario' element={<DetalleUsuario/>}/>
              <Route path='/cambiarcontra' element={<CambiarContraseña/>}/>
              <Route path='/carrito' element={<CartPage/>}/>
              <Route path='/graciascompra' element={<ThankYouPage/>}/>
              <Route path='/carritocompra' element={<CartPage/>}/>
              <Route 
              path='/checkout' 
              element={
              <ProtectedRoute>
              <CheckoutPage/>
              </ProtectedRoute>
              }
              />
              <Route path='/registrar'element={<Registrar/>}/>
              <Route path='/iniciarsesion'element={<Iniciarsesion/>}/>
              <Route path='/RecuperarPassword'element={<RecuperarPassword/>}/>
              <Route path='/DashboardUsuario' element={<DashboardUsuario/>}/>



              <Route path='/acercadenosotros'element={<AcercaDeNosotros/>}/>
              <Route path='/politicaenvio'element={<PoliticaDeEnvio/>}/>
              <Route path='/faq'element={<FAQ/>}/>
              <Route path='/ayuda' element={<Ayuda/>}/>
          </Routes>
     </Router>
  );

}


export default App;
