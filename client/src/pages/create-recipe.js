import {useState} from "react";
import axios from 'axios';
import { useGetUserId } from "../hooks/useGetUserID";
import { useNavigate } from 'react-router-dom';
import {useCookies, usecookies} from 'react-cookie';


export const CreateRecipe = () => {
    
    const userID = useGetUserId();
    const navigate = useNavigate();
    const [cookies, _] = useCookies(["access_token"]);

    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID
    }); 

    const handleChange = (event) => {
        const {name, value} = event.target;
        setRecipe({...recipe, [name]: value})
    };

    const handleIngredientChange = (event, idx) => {
        const {value} = event.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value;
        setRecipe({...recipe, ingredients});
    };

    const addIngredient = () => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]});
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/recipes", recipe, {
                headers: {authorization: cookies.access_token}
            });
            alert("Recipe Created");
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }

    return <div className="create-recipe">
        <h2>Create Recipe</h2>
        <form onSubmit={onSubmit}>
            <label htmlFor="name"></label>
            <input type="text" id="name" name="name" onChange={handleChange}/>
            <label htmlFor="description">Descritpion</label>
            <textarea id="description" name="description" onChange={handleChange}></textarea>
            <label htmlFor="ingredients">Ingredients</label>
            {recipe.ingredients.map((ingredient, idx) => (
                <input key={idx} type="text" name="ingredients" value={ingredient} onChange={(event) => handleIngredientChange(event, idx)}></input>
            ))}
            <button type="button"onClick={addIngredient}>Add ingredient</button>
            <label htmlFor="instructions">Instructions</label>
            <textarea id="instructions" name="instructions" onChange={handleChange}></textarea>
            <label htmlFor="imageUrl">Image URL</label>
            <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange}/>
            <label htmlFor="cookingTime">Cooking time (minutes)</label>
            <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange}/>
            <button type="submit">Create Recipe</button>
        </form>
    </div>
};