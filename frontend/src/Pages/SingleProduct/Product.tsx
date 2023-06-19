import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, singleProduct } from "../../features/products-slice";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../app/store";
import "./Product.scss";
// import Counter from "../../components/Counter";

function Product() {
  const { id } = useParams<{ id?: string }>();
  const dispatch: AppDispatch = useDispatch();
  const product = useSelector(singleProduct);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product  && product?.Images?.length > 0) {
      setCurrentImage(product?.Images[0].fileName); 
    }
  }, [product]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleImageClick = (fileName: string) => {
    setCurrentImage(fileName); 
  };

  return (
    <div className="product-box">
   
      <div>
        <div className="slideshow">
          <div className="big-image">
            <img
              src={`http://localhost:5000/images/${currentImage}`}
              alt={currentImage}
              style={{ width: "450px", height:"400px" }}
            />
          </div>
          <div className="small-images">
            {product?.Images?.map((image) => (
              <img
                key={image?.fileName}
                src={`http://localhost:5000/images/${image.fileName}`}
                alt={image.fileName}
                style={{ width: "70px", cursor: "pointer" }}
                onClick={() => handleImageClick(image.fileName)}
                className={image?.fileName === currentImage ? "selected" : ""}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="txt-box">

      <h2>{product?.name}</h2>
      <p>{product?.description}</p>
      <p>Price: ${product?.price}</p>
      {/* <Counter /> */}
      </div>
    </div>
  );
}

export default Product;

