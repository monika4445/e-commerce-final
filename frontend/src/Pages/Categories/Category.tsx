import { useDispatch, useSelector } from "react-redux";
import { fetchCategory, getCategory } from "../../features/categories-slice";
import { AppDispatch } from "../../app/store";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import '../../style.scss'
import './Category.scss'


function Category() {
  const data = useSelector(getCategory);
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<{ id?: string }>();
  console.log(data, "categor");

  useEffect(() => {
    if (id) {
      dispatch(fetchCategory(id));
    }
  }, [dispatch, id]);

  return (
    <div>
      <div className={data?.name === 'For Women' ? 'back-w-c' : data?.name === 'For Men' ? 'back-m-c' : data?.name === 'Retro' ? 'back-r-c' : ''}></div>

      <h2> {data?.name}</h2>
      <div className="grid">
        {data?.Products?.map((pr) => (
          <article key={pr.id} className="card">
            <Link to={`/product/${pr.id}`}>
              <div className="image-box">
                <img
                  src={`http://localhost:5000/images/${pr?.Images[0]?.fileName}`}
                  alt="Sample photo"
                />
              </div>
            </Link>
            <div className="text">
              <h3>{pr.name}</h3>
              <p>{pr.price}AMD</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Category;
