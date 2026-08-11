import { NavLink } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

export default function SellerSidebar() {

    const handleLogout = () => {

        localStorage.removeItem("user");

        window.location.href = "/login";

    };

    return (

        <div className="seller-sidebar">

            <div className="seller-logo">

                <h2>Kharido</h2>

            </div>

            <div className="seller-menu">

                <NavLink
                    to="/seller/dashboard"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    <DashboardIcon />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/seller/products"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    <Inventory2Icon />
                    <span>My Products</span>
                </NavLink>

                <NavLink
                    to="/seller/add-product"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    <AddCircleIcon />
                    <span>Add Product</span>
                </NavLink>

                <NavLink
                    to="/seller/orders"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    <ShoppingBagIcon />
                    <span>Orders</span>
                </NavLink>

                <NavLink
                    to="/seller/profile"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    <PersonIcon />
                    <span>Profile</span>
                </NavLink>

                <br />

                <button
                    className="btn btn-danger w-100 mt-4"
                    onClick={handleLogout}
                >
                    <LogoutIcon />
                    {" "}
                    Logout
                </button>

            </div>

        </div>

    );

}