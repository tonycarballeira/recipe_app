import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserID";

export const Home = () => {

    const [recipes, setRecipes] = useState([]);
    const userID = useGetUserId();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get("http://localhost:3001/recipes");
                setRecipes(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        
        fetchRecipe();
    }, [])

    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put("http://localhost:3001/recipes", {recipeID, userID});
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h2>Recipes</h2>
            <ul>
                {recipes.map((recipe) =>(
                    <li key={recipe._id}>
                        <div>
                            <h2>{recipe.name}</h2>
                            <button onClick={() => saveRecipe(recipe._id)}> Save </button>
                        </div>
                        <div className="instructions">
                            <p>{recipe.instructions}</p>
                        </div>
                        <img src={recipe.imageUrl} alt={recipe.name} />
                        <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};