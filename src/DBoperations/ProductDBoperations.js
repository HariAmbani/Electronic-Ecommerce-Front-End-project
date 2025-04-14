export async function CreateProductInDB(product) {
    const token = localStorage.getItem('token')
    const res = await fetch("http://localhost:3015/products/create", {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'authorization':token
        },
        body: JSON.stringify(product)
      });
      alert("product created successfully")
}
  