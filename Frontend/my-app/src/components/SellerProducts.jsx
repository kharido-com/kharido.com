import { useEffect, useState } from "react";

export default function SellerProducts() {

    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState("");

    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {

        try {

            const response = await fetch(
                "http://localhost:8082/api/products/my-products",
                {
                    credentials: "include"
                }
            );

            const data = await response.json();

            console.log("Products :", data);

            if (response.ok) {

                setProducts(data);

            } else {

                setMessage(data.message);

            }

        } catch (err) {

            console.log(err);
            setMessage("Unable to load products");

        }

    };

   const editProduct = (product) => {

    console.log("Edit Clicked", product);

    setEditingProduct({
        productId: product.productId,
        categoryId: product.categoryId,
        subCategoryId: product.subCategoryId,
        brandId: product.brandId,
        productName: product.productName,
        description: product.description,
        price: product.price,
        stockQuantity: product.stockQuantity
    });

};

    const deleteProduct = async (productId) => {

        if (!window.confirm("Delete this product?")) {
            return;
        }

        try {

            const response = await fetch(

                `http://localhost:8082/api/products/${productId}`,

                {
                    method: "DELETE",
                    credentials: "include"
                }

            );

            const data = await response.text();

            if (response.ok) {

                alert(data);

                fetchProducts();

            } else {

                alert(data);

            }

        } catch (err) {

            console.log(err);

            alert("Delete Failed");

        }

    };
const updateProduct = async () => {

    try {

        const formData = new FormData();

        formData.append("categoryId", editingProduct.categoryId);
        formData.append("subCategoryId", editingProduct.subCategoryId);
        formData.append("brandId", editingProduct.brandId);
        formData.append("productName", editingProduct.productName);
        formData.append("description", editingProduct.description);
        formData.append("price", editingProduct.price);
        formData.append("stockQuantity", editingProduct.stockQuantity);

        const response = await fetch(
            `http://localhost:8082/api/products/${editingProduct.productId}`,
            {
                method: "PUT",
                credentials: "include",
                body: formData
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Product Updated Successfully");

            setEditingProduct(null);

            fetchProducts();

        } else {

            alert(data.message || "Update Failed");

        }

    } catch (err) {

        console.log(err);

        alert("Update Failed");

    }

};
    return (

        <div className="container mt-4">

            <h2>My Products</h2>

            <br />

            {
                message &&
                <div className="alert alert-danger">
                    {message}
                </div>
            }

            <table className="table table-bordered table-hover">

                <thead className="table-dark">
    <tr>
        <th>ID</th>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Status</th>
        <th>Approval</th>
        <th>Action</th>
    </tr>
</thead>
                <tbody>

                    {

                        products.length === 0 ?

                            <tr>

                                <td
                                    colSpan="8"
                                    className="text-center"
                                >

                                    No Products

                                </td>

                            </tr>

                            :

                            products.map(product => (

                                <tr key={product.productId}>

                                   <td>{product.productId}</td>

<td>
    <img
        src={`http://localhost:8082/api/products/${product.productId}/image`}
        alt={product.productName}
        width="70"
        height="70"
        style={{
            objectFit: "cover",
            borderRadius: "8px"
        }}
    />
</td>

<td>{product.productName}</td>

                                    <td>₹ {product.price}</td>

                                    <td>{product.stockQuantity}</td>

                                    <td>{product.status}</td>

                                    <td>{product.approvalStatus}</td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => editProduct(product)}
                                        >

                                            Edit

                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteProduct(product.productId)}
                                        >

                                            Delete

                                        </button>

                                    </td>

                                </tr>

                            ))

                    }

                </tbody>

            </table>

{
editingProduct && (

<div className="card mt-4">

<div className="card-header bg-warning">

<h4>Edit Product</h4>

</div>

<div className="card-body">

<div className="mb-3">

<label>Product Name</label>

<input
className="form-control"
value={editingProduct.productName}
onChange={(e)=>
setEditingProduct({
...editingProduct,
productName:e.target.value
})
}
/>

</div>

<div className="mb-3">

<label>Description</label>

<textarea
className="form-control"
rows="3"
value={editingProduct.description}
onChange={(e)=>
setEditingProduct({
...editingProduct,
description:e.target.value
})
}
/>

</div>

<div className="row">

<div className="col-md-6">

<label>Price</label>

<input
type="number"
className="form-control"
value={editingProduct.price}
onChange={(e)=>
setEditingProduct({
...editingProduct,
price:e.target.value
})
}
/>

</div>

<div className="col-md-6">

<label>Stock</label>

<input
type="number"
className="form-control"
value={editingProduct.stockQuantity}
onChange={(e)=>
setEditingProduct({
...editingProduct,
stockQuantity:e.target.value
})
}
/>

</div>

</div>

<br/>

<button
className="btn btn-success me-2"
onClick={updateProduct}
>

Update Product

</button>

<button
className="btn btn-secondary"
onClick={() => setEditingProduct(null)}
>

Cancel

</button>

</div>

</div>

)
}
        </div>

    );

}