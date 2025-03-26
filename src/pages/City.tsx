import { useParams } from "react-router";
import cities from '../data.json'

const City = () => {

    const params = useParams();

    const city = cities.find(city => city.key == params.key);

    return <>
        <h2>Cities</h2>
        {
            city ?
                <>
                    <p>Name : {city.name}</p>
                    <p>Country : {city.country}</p>
                    <p>Population : {city.population}</p>
                </>
                :
                <p>No city found with parameter</p>
        }

    </>;
}

export default City;