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

export async function getAllProductsFromDB() {
  try {
    const res = await fetch("http://localhost:3015/products/getAllProducts");
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function UpdateProductInDB(productId, formData) {
  try {
    const res = await fetch(`http://localhost:3015/products/update/${productId}`, {
      method: 'PUT',
      body: formData,
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Update failed", err);
    throw err;
  }
}

// DELETE /products/delete/:productId
export async function DeleteProductFromDB(productId) {
  try {
    const res = await fetch(`http://localhost:3015/products/delete/${productId}`, {
      method: 'DELETE',
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to delete product:", err);
    throw err;
  }
}

// POST /cart/create
export async function AddToCart(username, productId) {
  const res = await fetch("http://localhost:3015/cart/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, productId }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Server responded with ${res.status}: ${errorBody}`);
  }

  return await res.json();
}


// DELETE /cart/delete
export async function RemoveFromCart(username, productId) {
  try {
    const res = await fetch("http://localhost:3015/cart/delete", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, productId })
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Server responded with ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to remove from cart:", err);
    throw err;
  }
}

// GET /cart/usercart/:username
export const getUserCart = async (username) => {
  try {
    const response = await fetch(`http://localhost:3015/cart/usercart/${username}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user cart");
    }

    const cartData = await response.json();
    return cartData;
  } catch (error) {
    console.error("Error in getUserCart:", error);
    return [];
  }
};







