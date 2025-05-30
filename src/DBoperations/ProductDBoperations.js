export async function CreateProductInDB(product) {
  const token = sessionStorage.getItem('token');
  if (!token) {
    alert('Authorization token missing');
    return;
  }

  try {
    const res = await fetch("http://localhost:3015/products/create", {
      method: 'POST',
      headers: {
        'authorization': token // ✅ don't set Content-Type manually
      },
      body: product // ✅ send FormData directly
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Server responded with ${res.status}: ${errorText}`);
    }

    alert("Product created successfully");
  } catch (error) {
    console.error("Error creating product:", error);
    alert("Failed to create product: " + error.message);
  }
}

