import { Link } from "react-router-dom";


function EventTile(props) {
return(
    <Link to="" className="col-sm-3 tile">
                  {props.game_name}
    </Link>
);
}
export default EventTile;





 