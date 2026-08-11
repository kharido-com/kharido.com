import { useEffect, useState } from "react";
import addressService from "../services/addressService";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HomeIcon from "@mui/icons-material/Home";

export default function Address() {

    const emptyAddress = {
        addressName: "",
        street: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        isDefault: false
    };

    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const [editing, setEditing] = useState(false);

    const [currentAddress, setCurrentAddress] =
        useState(emptyAddress);

    const [message, setMessage] = useState("");

    useEffect(() => {

        loadAddresses();

    }, []);

    async function loadAddresses() {

        try {

            const data =
                await addressService.getAllAddresses();

            setAddresses(data);

        } catch {

            setMessage("Unable to load addresses.");

        } finally {

            setLoading(false);
        }
    }

    function handleChange(e) {

        const { name, value } = e.target;

        setCurrentAddress(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSave() {

        try {

            if (editing) {

                await addressService.updateAddress(
                    currentAddress.addressId,
                    currentAddress
                );

                setMessage("Address updated successfully.");

            } else {

                await addressService.addAddress(currentAddress);

                setMessage("Address added successfully.");
            }

            setOpen(false);

            setCurrentAddress(emptyAddress);

            setEditing(false);

            loadAddresses();

        } catch {

            setMessage("Operation failed.");
        }
    }

    async function handleDelete(id) {

        if (!window.confirm("Delete this address?")) {
            return;
        }

        try {

            await addressService.deleteAddress(id);

            setMessage("Address deleted.");

            loadAddresses();

        } catch {

            setMessage("Unable to delete address.");
        }
    }

    async function handleDefault(id) {

        try {

            await addressService.setDefaultAddress(id);

            setMessage("Default address updated.");

            loadAddresses();

        } catch {

            setMessage("Unable to update default address.");
        }
    }

    if (loading) {

        return (

            <Box
                display="flex"
                justifyContent="center"
                mt={5}
            >
                <CircularProgress />
            </Box>

        );
    }

    return (

        <Card sx={{ m: 3 }}>

            <CardContent>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    mb={3}
                >

                    <Typography variant="h4">

                        My Addresses

                    </Typography>

                    <Button
                        variant="contained"
                        onClick={() => {

                            setEditing(false);

                            setCurrentAddress(emptyAddress);

                            setOpen(true);
                        }}
                    >
                        Add Address
                    </Button>

                </Box>

                {message && (

                    <Alert sx={{ mb: 2 }}>

                        {message}

                    </Alert>

                )}

                <TableContainer component={Paper}>

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>Name</TableCell>

                                <TableCell>Street</TableCell>

                                <TableCell>City</TableCell>

                                <TableCell>State</TableCell>

                                <TableCell>Country</TableCell>

                                <TableCell>Pincode</TableCell>

                                <TableCell>Default</TableCell>

                                <TableCell align="center">

                                    Actions

                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {addresses.map(address => (

                                <TableRow key={address.addressId}>

                                    <TableCell>

                                        {address.addressName}

                                    </TableCell>

                                    <TableCell>

                                        {address.street}

                                    </TableCell>

                                    <TableCell>

                                        {address.city}

                                    </TableCell>

                                    <TableCell>

                                        {address.state}

                                    </TableCell>

                                    <TableCell>

                                        {address.country}

                                    </TableCell>

                                    <TableCell>

                                        {address.pincode}

                                    </TableCell>

                                    <TableCell>

                                        {address.isDefault ?

                                            <Chip
                                                icon={<HomeIcon />}
                                                label="Default"
                                                color="success"
                                            />

                                            :

                                            "-"

                                        }

                                    </TableCell>

                                    <TableCell>

                                        <IconButton

                                            onClick={() => {

                                                setEditing(true);

                                                setCurrentAddress(address);

                                                setOpen(true);
                                            }}

                                        >

                                            <EditIcon />

                                        </IconButton>

                                        <IconButton

                                            color="error"

                                            onClick={() =>
                                                handleDelete(
                                                    address.addressId
                                                )
                                            }

                                        >

                                            <DeleteIcon />

                                        </IconButton>

                                        {!address.isDefault && (

                                            <Button

                                                size="small"

                                                onClick={() =>
                                                    handleDefault(
                                                        address.addressId
                                                    )
                                                }

                                            >

                                                Set Default

                                            </Button>

                                        )}

                                    </TableCell>

                                </TableRow>

                            ))}

                        </TableBody>

                    </Table>

                </TableContainer>

            </CardContent>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="md"
                fullWidth
            >

                <DialogTitle>

                    {editing ?

                        "Edit Address"

                        :

                        "Add Address"}

                </DialogTitle>

                <DialogContent>

                    <Grid
                        container
                        spacing={2}
                        mt={1}
                    >

                        <Grid item xs={6}>

                            <TextField
                                fullWidth
                                label="Address Name"
                                name="addressName"
                                value={currentAddress.addressName}
                                onChange={handleChange}
                            />

                        </Grid>

                        <Grid item xs={6}>

                            <TextField
                                fullWidth
                                label="Street"
                                name="street"
                                value={currentAddress.street}
                                onChange={handleChange}
                            />

                        </Grid>

                        <Grid item xs={6}>

                            <TextField
                                fullWidth
                                label="City"
                                name="city"
                                value={currentAddress.city}
                                onChange={handleChange}
                            />

                        </Grid>

                        <Grid item xs={6}>

                            <TextField
                                fullWidth
                                label="State"
                                name="state"
                                value={currentAddress.state}
                                onChange={handleChange}
                            />

                        </Grid>

                        <Grid item xs={6}>

                            <TextField
                                fullWidth
                                label="Country"
                                name="country"
                                value={currentAddress.country}
                                onChange={handleChange}
                            />

                        </Grid>

                        <Grid item xs={6}>

                            <TextField
                                fullWidth
                                label="Pincode"
                                name="pincode"
                                value={currentAddress.pincode}
                                onChange={handleChange}
                            />

                        </Grid>

                    </Grid>

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSave}
                    >
                        Save
                    </Button>

                </DialogActions>

            </Dialog>

        </Card>

    );

}