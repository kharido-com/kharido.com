import React from "react";

function AdminNavbar() {

    const username = localStorage.getItem("username") || "Admin";

    return (

        <nav className="admin-navbar">

            <div className="navbar-title">

                <h2>Kharido Admin Panel</h2>

            </div>

            <div className="navbar-right">

              

                <div className="admin-profile">

                    <div className="admin-avatar">
                        {username.charAt(0).toUpperCase()}
                    </div>

                    <div className="admin-info">

                        <h4>
                            Hello, {username} 👋
                        </h4>

                        <span>
                            Administrator
                        </span>

                    </div>

                </div>

            </div>

        </nav>

    );

}

export default AdminNavbar;