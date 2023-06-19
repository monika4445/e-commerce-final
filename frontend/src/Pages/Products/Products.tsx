import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProducts, fetchProducts } from "../../features/products-slice";
import { createCart } from "../../features/cart-slice";
import useLocalStorage from "../../hooks/useLocalStorage";
import { AppDispatch, RootState } from "../../app/store";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../../style.scss";


function Products() {
  const dispatch: AppDispatch = useDispatch();
  const { decoded, userInStorage } = useLocalStorage();
  const [searchTerm, setSearchTerm] = useState("");
  const products = useSelector(allProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = useSelector((state:RootState)=> state.products.totalPages)
  console.log(products,'prod');
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [dispatch, currentPage]);

  function addToCart(id: number) {
    if (userInStorage && decoded?.id) {
      dispatch(createCart({ productId: id, userId: +decoded.id }));
    }else{
      navigate('/login')
    }
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function paginate(i:number){
    setCurrentPage(i)
  }

  return (
    <div className="products-container">
      <div className="img-box"></div>
      <h1 style={{ marginTop: "50px", fontSize: "40px", fontWeight: "400" }}>
        NEW ARRIVALS
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "20px 10px",
        }}
      >
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: "250px", height: "45px", padding: "10px" }}
        />
      </div>
      <div
        className="grid"
      >
        {filteredProducts ? (
          filteredProducts.map((product) => (
            <article key={product.id} className="card">
              <Link to={`/product/${product.id}`}>
                <div className="image-box">
                  <img
                    src={`http://localhost:5000/images/${product?.Images[0]?.fileName}`}
                    alt="Sample photo"
                  />
                </div>
              </Link>
              <div className="text">
                <h3>{product.name}</h3>
                <p>{product.price}AMD</p>
                <button onClick={() => addToCart(product.id)}>
                  Add to Cart
                </button>
              </div>
            </article>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div>
          {Array.from(Array(pages).keys()).map((el)=><button onClick={()=>paginate(el+1)}>{el+1}</button>)}
        </div>
    </div>
  );
}

export default Products;
