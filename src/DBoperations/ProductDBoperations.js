export async function CreateProductInDB(product) {
    const res = await fetch("http://localhost:3015/products/create", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
    
    //   const data = await res.text();
    //   alert(data);
}
  