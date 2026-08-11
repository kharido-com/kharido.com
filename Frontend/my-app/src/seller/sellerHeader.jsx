import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function SellerHeader() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <div className="seller-header">

            <div className="d-flex align-items-center">

                <MenuIcon
                    sx={{
                        fontSize: 35,
                        cursor: "pointer"
                    }}
                />

            </div>

            <div
                className="d-flex align-items-center"
                style={{ gap: "25px" }}
            >

                <NotificationsNoneIcon
                    sx={{
                        fontSize: 30,
                        cursor: "pointer"
                    }}
                />

                <div
                    className="d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                >

                    <AccountCircleIcon
                        sx={{
                            fontSize: 42,
                            color: "#0f8b8d"
                        }}
                    />

                    <span
                        style={{
                            marginLeft: 10,
                            fontWeight: 600
                        }}
                    >
                        {user?.username}
                    </span>

                    <KeyboardArrowDownIcon />

                </div>

            </div>

        </div>

    );

}