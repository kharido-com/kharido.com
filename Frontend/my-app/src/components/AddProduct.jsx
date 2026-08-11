import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateProductDescription } from "../services/aiService";

export default function AddProduct() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [product, setProduct] = useState({
    productName: "",
    categoryId: "",
    subCategoryId: "",
    brandId: "",
    price: "",
    stockQuantity: 10,
    description: "",
    image: null
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ─── AI State (additive — does not touch existing state above) ────────────
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiResult, setAiResult] = useState(null);
  const [aiSnapshot, setAiSnapshot] = useState(null); // field values at time of generation
  const [staleWarning, setStaleWarning] = useState(false);
  // ──────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    fetchBrands();
  }, []);

  // ─── Stale-content detection ──────────────────────────────────────────────
  // Watch key fields — if they change after AI generation, show a warning.
  // Does NOT regenerate automatically.
  useEffect(() => {
    if (!aiSnapshot) return;
    const changed =
      product.productName !== aiSnapshot.productName ||
      product.brandId !== aiSnapshot.brandId ||
      product.categoryId !== aiSnapshot.categoryId;
    setStaleWarning(changed);
  }, [product.productName, product.brandId, product.categoryId, aiSnapshot]);
  // ──────────────────────────────────────────────────────────────────────────

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/categories`, {
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/subcategories`, {
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        setAllSubcategories(list);
        setSubcategories(list);
      }
    } catch (err) {
      console.error("Failed to fetch subcategories:", err);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/brands`, {
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        setBrands(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch brands:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryId") {
      const catId = value ? parseInt(value) : "";
      setProduct((prev) => ({
        ...prev,
        categoryId: catId,
        subCategoryId: ""
      }));

      if (catId) {
        fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/subcategories/${catId}`, {
          credentials: "include"
        })
          .then((res) => (res.ok ? res.json() : []))
          .then((data) => {
            setSubcategories(Array.isArray(data) && data.length > 0 ? data : allSubcategories.filter((s) => s.categoryId === catId));
          })
          .catch(() => {
            setSubcategories(allSubcategories.filter((s) => s.categoryId === catId));
          });
      } else {
        setSubcategories(allSubcategories);
      }
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProduct((prev) => ({
        ...prev,
        image: e.target.files[0]
      }));
    }
  };

  // ─── AI Generation Handler ────────────────────────────────────────────────
  const handleGenerateAI = async () => {
    setAiError("");
    setAiResult(null);
    setStaleWarning(false);
    setAiLoading(true);

    // Resolve human-readable brand and category names for the AI prompt
    const brandObj = brands.find((b) => b.brandId === parseInt(product.brandId));
    const categoryObj = categories.find((c) => c.categoryId === parseInt(product.categoryId));

    const payload = {
      productName: product.productName.trim(),
      brand: brandObj ? brandObj.brandName : "",
      category: categoryObj ? categoryObj.categoryName : "",
      price: product.price ? `₹${product.price}` : "",
      specifications: "",   // no dedicated spec field in AddProduct — seller fills description
      additionalDetails: ""
    };

    try {
      const result = await generateProductDescription(payload);
      setAiResult(result);

      // Auto-populate the description textarea with generated content
      setProduct((prev) => ({
        ...prev,
        description: result.description || prev.description
      }));

      // Snapshot the fields used for generation (for stale detection)
      setAiSnapshot({
        productName: product.productName,
        brandId: product.brandId,
        categoryId: product.categoryId
      });

    } catch (err) {
      console.error("AI generation failed:", err);
      setAiError(err.message || "AI generation failed. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };
  // ──────────────────────────────────────────────────────────────────────────

  // ─── EXISTING SUBMIT — COMPLETELY UNCHANGED ───────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!product.productName || !product.price) {
      setError("Please enter Product Name and Price");
      return;
    }

    if (Number(product.price) <= 0) {
      setError("Price must be greater than 0");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("productName", product.productName);
      formData.append("categoryId", product.categoryId || 1);
      formData.append("subCategoryId", product.subCategoryId || 1);
      formData.append("brandId", product.brandId || 1);
      formData.append("price", product.price);
      formData.append("stockQuantity", product.stockQuantity || 10);
      formData.append("description", product.description || "");

      if (product.image) {
        formData.append("image", product.image);
      }

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/products`, {
        method: "POST",
        credentials: "include",
        body: formData
      });

      if (res.ok) {
        setMessage("Product added successfully!");
        setTimeout(() => {
          navigate("/seller/products");
        }, 1200);
      } else {
        const errorText = await res.text();
        setError(errorText || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
      setError("Error adding product: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  // ──────────────────────────────────────────────────────────────────────────

  return (
    <div style={{ padding: "20px 40px", maxWidth: "900px" }}>
      <h2 style={{ fontWeight: 700, color: "#0F172A", marginBottom: "30px" }}>
        Add Product
      </h2>

      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="form-label" style={{ fontWeight: 500, color: "#334155" }}>
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            className="form-control"
            value={product.productName}
            onChange={handleChange}
            placeholder="e.g. Wireless Headphones"
            style={{ borderRadius: "8px", padding: "10px 14px" }}
            required
          />
        </div>

        <div className="row">
          <div className="col-md-4 mb-4">
            <label className="form-label" style={{ fontWeight: 500, color: "#334155" }}>
              Product Category
            </label>
            <select
              name="categoryId"
              className="form-select"
              value={product.categoryId}
              onChange={handleChange}
              style={{ borderRadius: "8px", padding: "10px 14px" }}
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 mb-4">
            <label className="form-label" style={{ fontWeight: 500, color: "#334155" }}>
              Product Subcategory
            </label>
            <select
              name="subCategoryId"
              className="form-select"
              value={product.subCategoryId}
              onChange={handleChange}
              style={{ borderRadius: "8px", padding: "10px 14px" }}
            >
              <option value="">-- Select Subcategory --</option>
              {subcategories.map((sub) => (
                <option key={sub.subCategoryId} value={sub.subCategoryId}>
                  {sub.subCategoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 mb-4">
            <label className="form-label" style={{ fontWeight: 500, color: "#334155" }}>
              Brand
            </label>
            <select
              name="brandId"
              className="form-select"
              value={product.brandId}
              onChange={handleChange}
              style={{ borderRadius: "8px", padding: "10px 14px" }}
            >
              <option value="">-- Select Brand --</option>
              {brands.map((b) => (
                <option key={b.brandId} value={b.brandId}>
                  {b.brandName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4">
            <label className="form-label" style={{ fontWeight: 500, color: "#334155" }}>
              Product Price (₹)
            </label>
            <input
              type="number"
              name="price"
              min="0.01"
              step="any"
              className="form-control"
              value={product.price}
              onChange={handleChange}
              placeholder="e.g. 1999"
              style={{ borderRadius: "8px", padding: "10px 14px" }}
              required
            />
          </div>

          <div className="col-md-6 mb-4">
            <label className="form-label" style={{ fontWeight: 500, color: "#334155" }}>
              Stock Quantity
            </label>
            <input
              type="number"
              name="stockQuantity"
              className="form-control"
              value={product.stockQuantity}
              onChange={handleChange}
              placeholder="e.g. 10"
              style={{ borderRadius: "8px", padding: "10px 14px" }}
            />
          </div>
        </div>

        {/* ─── AI GENERATE BUTTON + STALE WARNING (ADDITIVE) ─────────────────── */}
        <div className="mb-3">
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <button
              id="ai-generate-btn"
              type="button"
              onClick={handleGenerateAI}
              disabled={aiLoading || !product.productName.trim()}
              style={{
                backgroundColor: aiLoading ? "#94a3b8" : "#7C3AED",
                color: "#FFFFFF",
                fontWeight: 600,
                padding: "9px 20px",
                borderRadius: "8px",
                border: "none",
                cursor: aiLoading || !product.productName.trim() ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                transition: "background-color 0.2s ease"
              }}
            >
              {aiLoading ? (
                <>
                  {/* Bootstrap spinner */}
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Generating…
                </>
              ) : (
                <>✨ Generate AI Description</>
              )}
            </button>

            {aiResult && !aiLoading && (
              <span style={{ fontSize: "13px", color: "#16a34a", fontWeight: 500 }}>
                ✓ Description generated — you can edit it below
              </span>
            )}
          </div>

          {/* Stale-content warning */}
          {staleWarning && (
            <div
              style={{
                marginTop: "10px",
                padding: "8px 14px",
                backgroundColor: "#fffbeb",
                border: "1px solid #fbbf24",
                borderRadius: "6px",
                fontSize: "13px",
                color: "#92400e",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              ⚠️ Product details changed. Consider regenerating the AI description.
            </div>
          )}

          {/* AI error message */}
          {aiError && (
            <div
              style={{
                marginTop: "10px",
                padding: "8px 14px",
                backgroundColor: "#fef2f2",
                border: "1px solid #fca5a5",
                borderRadius: "6px",
                fontSize: "13px",
                color: "#991b1b",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              ❌ {aiError}
            </div>
          )}
        </div>
        {/* ─────────────────────────────────────────────────────────────────── */}

        <div className="mb-4">
          <label className="form-label" style={{ fontWeight: 500, color: "#334155" }}>
            Product Description
          </label>
          <textarea
            name="description"
            className="form-control"
            rows="4"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter detailed description, or click ✨ Generate AI Description above"
            style={{ borderRadius: "8px", padding: "10px 14px" }}
          />
        </div>

        {/* ─── AI RESULTS PANEL (ADDITIVE) ────────────────────────────────────── */}
        {aiResult && (
          <div
            style={{
              marginBottom: "24px",
              border: "1px solid #e0e7ff",
              borderRadius: "10px",
              backgroundColor: "#f5f3ff",
              padding: "18px 20px"
            }}
          >
            <div style={{ fontWeight: 600, color: "#4c1d95", marginBottom: "14px", fontSize: "15px" }}>
              ✨ AI Generated Content Preview
              <span style={{ fontWeight: 400, fontSize: "12px", color: "#6d28d9", marginLeft: "10px" }}>
                (Edit description above before saving)
              </span>
            </div>

            {/* Key Features */}
            {Array.isArray(aiResult.keyFeatures) && aiResult.keyFeatures.length > 0 && (
              <div style={{ marginBottom: "14px" }}>
                <div style={{ fontWeight: 600, color: "#1e1b4b", fontSize: "13px", marginBottom: "6px" }}>
                  Key Features
                </div>
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                  {aiResult.keyFeatures.map((feature, idx) => (
                    <li key={idx} style={{ color: "#374151", fontSize: "13px", marginBottom: "3px" }}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technical Specifications */}
            {aiResult.technicalSpecifications &&
              Object.keys(aiResult.technicalSpecifications).length > 0 && (
                <div style={{ marginBottom: "14px" }}>
                  <div style={{ fontWeight: 600, color: "#1e1b4b", fontSize: "13px", marginBottom: "6px" }}>
                    Technical Specifications
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {Object.entries(aiResult.technicalSpecifications).map(([key, value]) => (
                      <span
                        key={key}
                        style={{
                          backgroundColor: "#ede9fe",
                          color: "#4c1d95",
                          padding: "3px 10px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: 500
                        }}
                      >
                        {key}: {value}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {/* SEO Title */}
            {aiResult.seoTitle && (
              <div style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600, color: "#1e1b4b", fontSize: "13px" }}>
                  SEO Title:{" "}
                </span>
                <span style={{ color: "#374151", fontSize: "13px" }}>{aiResult.seoTitle}</span>
              </div>
            )}

            {/* SEO Keywords */}
            {Array.isArray(aiResult.seoKeywords) && aiResult.seoKeywords.length > 0 && (
              <div>
                <div style={{ fontWeight: 600, color: "#1e1b4b", fontSize: "13px", marginBottom: "6px" }}>
                  SEO Keywords
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {aiResult.seoKeywords.map((kw, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: "#ddd6fe",
                        color: "#5b21b6",
                        padding: "2px 10px",
                        borderRadius: "20px",
                        fontSize: "12px"
                      }}
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {/* ─────────────────────────────────────────────────────────────────── */}

        <div className="mb-4">
          <label className="form-label" style={{ fontWeight: 500, color: "#334155" }}>
            Product Image
          </label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
            style={{ borderRadius: "8px", padding: "10px 14px" }}
          />
        </div>

        <button
          type="submit"
          className="btn"
          disabled={loading}
          style={{
            backgroundColor: "#00838F",
            color: "#FFFFFF",
            fontWeight: 600,
            padding: "10px 24px",
            borderRadius: "8px",
            border: "none"
          }}
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}