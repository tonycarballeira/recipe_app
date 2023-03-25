import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserID";
import { SavedRecipes } from './saved-recipes';
import {useCookies, usecookies} from 'react-cookie';

export const Home = () => {

    const [savedRecipes, setSavedRecipes] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [cookies, _] = useCookies(["access_token"]);
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

        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.log(err);
            }
        };

        fetchRecipe();
        fetchSavedRecipe();
    }, [])

    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put("http://localhost:3001/recipes", {userID, recipeID}, 
            {headers: {authorization: cookies.access_token}});           
            setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
            console.log(err);
        }
    };

    const isRecipeSaved = (id) => savedRecipes.includes(id);

    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes.map((recipe) =>(
                    <li key={recipe._id}>
                        <div>
                            <h2>{recipe.name}</h2>
                            <button onClick={() => saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}> 
                                {isRecipeSaved(recipe._id) ? "Saved" : "Save"} 
                            </button>
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