// import { Link, Outlet } from "react-router-dom";

// export default function SellerDashboard() {
//   return (
    
//     <div className="container-fluid">
//       <div className="row">

//         {/* Sidebar */}
//         <div className="col-md-3 col-lg-2 bg-dark text-white min-vh-100 p-3">

//           <h3 className="text-center mb-4">
//             Seller Panel
//           </h3>

//           <div className="d-flex flex-column">

//             <Link
//               to="add-product"
//               className="btn btn-outline-light mb-2"
//             >
//               Add Product
//             </Link>

//             <Link
//               to="products"
//               className="btn btn-outline-light mb-2"
//             >
//               My Products
//             </Link>

//             <Link
//               to="orders"
//               className="btn btn-outline-light mb-2"
//             >
//               Orders
//             </Link>

//             <Link
//               to="profile"
//               className="btn btn-outline-light mb-2"
//             >
//               Profile
//             </Link>

//             <Link
//               to="logout"
//               className="btn btn-danger"
//             >
//               Logout
//             </Link>

//           </div>
//         </div>

//         {/* Content */}
//         <div className="col-md-9 col-lg-10 p-4">
//           <h2>Seller Dashboard</h2>
//           <hr />

//           <Outlet />
//         </div>

//       </div>
//     </div>
//   );
// }
import { Outlet } from "react-router-dom";

import SellerSidebar from "../seller/sellerSidebar";
import SellerHeader from "../seller/sellerHeader";

export default function SellerDashboard() {
  return (
    <div className="seller-layout">

      <SellerSidebar />

      <div className="seller-content">

        <SellerHeader />

        <div className="container-fluid p-4">
          <Outlet />
        </div>

      </div>

    </div>
  );
}