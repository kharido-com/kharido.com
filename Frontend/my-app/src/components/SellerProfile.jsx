// import { useEffect, useState } from "react";

// export default function SellerProfile() {

//   const [profile, setProfile] = useState({
//     username: "",
//     shopName: "",
//     gstNumber: "",
//     phone: "",
//     approvalStatus: "",
//   });

//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {

//     try {

//       const response = await fetch(
//         "http://localhost:8082/api/seller/my-profile",
//         {
//           method: "GET",
//           credentials: "include",
//         }
//       );

//       console.log("GET Status :", response.status);

//       const text = await response.text();

//       console.log("GET Response :", text);

//       if (!response.ok) {
//         setMessage("Unable to load profile");
//         return;
//       }

//       const data = JSON.parse(text);

//       setProfile(data);

//     } catch (error) {

//       console.error(error);
//       setMessage(error.message);

//     }
//   };

//   const handleChange = (e) => {

//     setProfile({
//       ...profile,
//       [e.target.name]: e.target.value,
//     });

//   };

//   const updateProfile = async () => {

//     try {

//       const response = await fetch(
//         "http://localhost:8082/api/seller/my-profile",
//         {
//           method: "PUT",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             shopName: profile.shopName,
//             gstNumber: profile.gstNumber,
//             phone: profile.phone,
//           }),
//         }
//       );
//       console.log("PUT Status :", response.status);

//       const text = await response.text();

//       console.log("PUT Response :", text);

//       if (!response.ok) {

//         setMessage("Update Failed");
//         return;

//       }

//       const data = JSON.parse(text);

//       setProfile(data);

//       setMessage("Profile Updated Successfully");

//     } catch (error) {

//       console.error(error);
//       setMessage(error.message);

//     }

//   };
// const deleteProfile = async () => {

//     const confirmDelete = window.confirm(
//         "Are you sure you want to delete your account?"
//     );

//     if (!confirmDelete) return;

//     try {

//         const response = await fetch(
//             "http://localhost:8082/api/seller/my-profile",
//             {
//                 method: "DELETE",
//                 credentials: "include"
//             }
//         );

//         if (response.ok) {

//             await fetch(
//                 "http://localhost:8081/api/auth/logout",
//                 {
//                     method: "POST",
//                     credentials: "include"
//                 }
//             );

//             localStorage.clear();

//             alert("Account deleted successfully");

//             window.location.href = "/";

//         } else {

//             alert("Delete failed");

//         }

//     } catch (err) {

//         console.log(err);

//         alert("Something went wrong");

//     }

// };
//   return (

// <div className="container-fluid px-4 py-4">
  
//       <h2>Seller Profile</h2>

//       <hr />

//       <div className="mb-3">

//         <label className="form-label">
//           Username
//         </label>

//         <input
//           className="form-control"
//           value={profile.username || ""}
//           readOnly
//         />

//       </div>

//       <div className="mb-3">

//         <label className="form-label">
//           Shop Name
//         </label>

//         <input
//           className="form-control"
//           name="shopName"
//           value={profile.shopName || ""}
//           onChange={handleChange}
//         />

//       </div>

//       <div className="mb-3">

//         <label className="form-label">
//           GST Number
//         </label>

//         <input
//           className="form-control"
//           name="gstNumber"
//           value={profile.gstNumber || ""}
//           onChange={handleChange}
//         />

//       </div>

//       <div className="mb-3">

//         <label className="form-label">
//           Phone
//         </label>

//         <input
//           className="form-control"
//           name="phone"
//           value={profile.phone || ""}
//           onChange={handleChange}
//         />

//       </div>

//       <div className="mb-3">

//         <label className="form-label">
//           Approval Status
//         </label>

//         <input
//           className="form-control"
//           value={profile.approvalStatus || ""}
//           readOnly
//         />

//       </div>

//       <button
//         className="btn btn-primary"
//         onClick={updateProfile}
//       >
//         Update Profile
//       </button>
// <button
//     className="btn btn-danger ms-3"
//     onClick={deleteProfile}
// >
//     Delete Account
// </button>
//       <div className="mt-3">

//         <h5>{message}</h5>

//       </div>

//     </div>

//   );
// }
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export default function SellerProfile() {

  const [profile, setProfile] = useState({
    username: "",
    shopName: "",
    gstNumber: "",
    phone: "",
    approvalStatus: "",
  });

  const [message, setMessage] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const response = await fetch(
        "http://localhost:8082/api/seller/my-profile",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        setMessage("Unable to load profile");
        return;
      }

      const data = await response.json();

      setProfile(data);

    } catch (error) {

      console.error(error);

      setMessage(error.message);

    }

  };

  const handleChange = (e) => {

    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });

  };

  const updateProfile = async () => {

    try {

      const response = await fetch(
        "http://localhost:8082/api/seller/my-profile",
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            shopName: profile.shopName,
            gstNumber: profile.gstNumber,
            phone: profile.phone,
          }),
        }
      );

      if (!response.ok) {

        setMessage("Update Failed");

        return;

      }

      const data = await response.json();

      setProfile(data);

      setMessage("Profile Updated Successfully");

    } catch (error) {

      console.error(error);

      setMessage(error.message);

    }

  };

  const deleteProfile = async () => {

    try {

      const response = await fetch(
        "http://localhost:8082/api/seller/my-profile",
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {

        const msg = await response.text();

        alert(msg);

        return;

      }

      // Logout Auth Service

      await fetch(
        "http://localhost:8081/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      localStorage.clear();

      alert("Seller Account Deleted Successfully");

      window.location.href = "/";

    } catch (err) {

      console.error(err);

      alert("Something went wrong");

    }

  };

  return (

    <div className="container-fluid px-4 py-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">

          <h3 className="mb-0">
            Seller Profile
          </h3>

        </div>

        <div className="card-body">

          <div className="mb-3">

            <label className="form-label">
              Username
            </label>

            <input
              className="form-control"
              value={profile.username || ""}
              readOnly
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Shop Name
            </label>

            <input
              className="form-control"
              name="shopName"
              value={profile.shopName || ""}
              onChange={handleChange}
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              GST Number
            </label>

            <input
              className="form-control"
              name="gstNumber"
              value={profile.gstNumber || ""}
              onChange={handleChange}
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Phone
            </label>

            <input
              className="form-control"
              name="phone"
              value={profile.phone || ""}
              onChange={handleChange}
            />

          </div>

          <div className="mb-4">

            <label className="form-label">
              Approval Status
            </label>

            <input
              className="form-control"
              value={profile.approvalStatus || ""}
              readOnly
            />

          </div>

          <Button
            variant="contained"
            color="primary"
            onClick={updateProfile}
          >
            Update Profile
          </Button>

          <Button
            variant="contained"
            color="error"
            sx={{ ml: 2 }}
            onClick={() => setOpenDeleteDialog(true)}
          >
            Delete Account
          </Button>

          {

            message &&

            <div className="alert alert-success mt-4">

              {message}

            </div>

          }

        </div>

      </div>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >

        <DialogTitle>

          Delete Seller Account

        </DialogTitle>

        <DialogContent>

          <DialogContentText>

            Are you sure you want to permanently delete your seller account?

            <br /><br />

            This action cannot be undone.

          </DialogContentText>

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() => setOpenDeleteDialog(false)}
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={() => {

              setOpenDeleteDialog(false);

              deleteProfile();

            }}
          >
            Delete
          </Button>

        </DialogActions>

      </Dialog>

    </div>

  );

}