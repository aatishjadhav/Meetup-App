import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header>
        <div className="container">
          <Link to="/">
            <img
              src="https://tse2.mm.bing.net/th?id=OIP.fDQfifUfToxZkRwl0cWzHQHaCp&pid=Api&P=0&h=180"
              alt="Meetup Logo"
              className="img-fluid mt-3"
              style={{ height: "50px" }}
            />
          </Link>
          <div className="float-end mt-4">
            <form action="" className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="⌕ Search by title and t..."
              />
            </form>
          </div>
        </div>
      </header>
      <hr />
    </>
  );
};

export default Header;
