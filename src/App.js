import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { listen } from './redux/listener';
import { AppRoutes } from './routes';

// function useQuery() {
//   const { search } = useLocation();

//   return React.useMemo(() => new URLSearchParams(search), [search]);
// }

// function Home() {
//   return <h1>Home</h1>;
// }
// function Categories() {
//   const query = useQuery();
//   console.log("query");
//   console.log(query.get("page"));
//   return (
//     <>
//       <h1>Categories</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Id</th>
//             <th>Categories</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>1</td>
//             <td>
//               <Link to="/categories/523453462423452">Seminar</Link>
//             </td>
//           </tr>
//           <tr>
//             <td>2</td>
//             <td>
//               <Link to="/categories/234253462426246">Musik</Link>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </>
//   );
// }
// function CategoriesDetail() {
//   let { id } = useParams();
//   return <h1>Categories Detail : {id}</h1>;
// }
// function About() {
//   return <h1>About</h1>;
// }
// function Login() {
//   const navigate = useNavigate();
//   return (
//     <>
//       <h1>Login</h1>
//       <button onClick={() => navigate("/")}>Submit</button>
//     </>
//   );
// }

function App() {
  useEffect(() => {
    listen();
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
