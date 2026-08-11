import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SellerHome() {

  const [dashboard, setDashboard] = useState({
    username: "",
    shopName: "",
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadDashboard() {

      try {

        const response = await fetch(
          "http://localhost:8082/api/seller/dashboard",
          {
            credentials: "include"
          }
        );

        console.log("Status :", response.status);

        if (response.ok) {

          const data = await response.json();

          console.log(data);

          setDashboard(data);

        } else {

          console.log(await response.text());

        }

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    }

    loadDashboard();

  }, []);

  return (

    <div className="container mt-4">

      <h2 className="mb-3">
        Seller Dashboard
      </h2>

      <div className="alert alert-success">
        Welcome <strong>{dashboard.username || "Seller"}</strong> 👋
      </div>

      <h5 className="mb-4">
        {dashboard.shopName}
      </h5>

      {loading &&

        <div className="alert alert-warning">
          Loading Dashboard...
        </div>

      }

      <div className="row g-4">

        <div className="col-md-3">
          <div className="card shadow-sm text-center p-3">
            <h5>Total Products</h5>
            <h2>{dashboard.totalProducts}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm text-center p-3">
            <h5>Total Orders</h5>
            <h2>{dashboard.totalOrders}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm text-center p-3">
            <h5>Pending Orders</h5>
            <h2>{dashboard.pendingOrders}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm text-center p-3">
            <h5>Total Revenue</h5>
            <h2>₹ {dashboard.totalRevenue}</h2>
          </div>
        </div>

      </div>

      <div className="row mt-5">

        <div className="col-md-4 mb-3">
          <Link
            to="/seller/add-product"
            className="btn btn-primary w-100">
            Add Product
          </Link>
        </div>

        <div className="col-md-4 mb-3">
          <Link
            to="/seller/products"
            className="btn btn-success w-100">
            My Products
          </Link>
        </div>

        <div className="col-md-4 mb-3">
          <Link
            to="/seller/orders"
            className="btn btn-warning w-100">
            View Orders
          </Link>
        </div>

      </div>

    </div>

  );

}