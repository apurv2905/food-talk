import { useEffect, useState } from "react";
import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
    const [availableMeals, setAvailableMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    const fetchingMeals = async () => {
        const response = await fetch(
            "https://learn-react-7c90b-default-rtdb.firebaseio.com/meals.json"
        );
        
        if (!response.ok) {
            throw new Error("Failed to Fetch!");
        }

        const data = await response.json();

        const loadedMeals = [];

        for (const mealKey in data) {
            loadedMeals.push({
                id: mealKey,
                name: data[mealKey].name,
                description: data[mealKey].description,
                price: data[mealKey].price,
            });
        }

        setAvailableMeals(loadedMeals);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchingMeals().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    if (isLoading) {
        return (
            <section className={styles["meals-loading"]}>
                <p>Loading...</p>
            </section>
        );
    }

    if (httpError) {
        return (
            <section className={styles["meals-error"]}>
                <p>{httpError}</p>
            </section>
        );
    }

    const mealsList = availableMeals.map((meal) => (
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));
    
    return (
        <section className={styles.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
